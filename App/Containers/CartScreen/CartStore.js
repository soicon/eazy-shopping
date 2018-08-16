import { observable, action,computed } from 'mobx'
import { Actions } from 'react-native-router-flux'
import User from '../../Models/User'
import CartItem from '../../Models/CartItem'
import {Images} from '../../Themes'
import BaseViewModel from '../../Models/BaseViewModel'
import { Colors } from '../../Themes'
import GeoCoder from 'react-native-geocoder'
import { add } from 'ramda';
import Snackbar, {showSnackBar} from '@prince8verma/react-native-snackbar'



export class CartStore extends BaseViewModel {
  @observable itemsInCart = []
  @observable city= ''
  @observable district= ''
  @observable local= ''
  @observable addressInfo= ''
  @observable addressDetail=''
  @observable addressId=''
  @observable user = User
  @observable cartItem = CartItem
  @observable newAddress = null
  @observable showPrompt = false
  @observable photo = null
  @observable isLoading=false
  @observable address = ''
  @observable location = ''
  @observable total = 0
  @observable cartList =[]
  @observable discount = 0
  @observable cart = []
  @observable lat= ''
  @observable long=''
  @observable disabled=true
  @observable note=''
  onStartUp = async () => {
    try {
      this.isLoading = true
      await this.user.getBuyerProfile()
      this.isLoading = false
    } catch (e) {
      console.log('ERROR LOADING USER PROFILE => ', e)
      this.errors = e
    }
  }


  onStartUp = async () => {
    try {
      this.isLoading = true
      await this.user.getBuyerProfile()
      this.isLoading = false
    } catch (e) {
      console.log('ERROR LOADING USER PROFILE => ', e)
      this.errors = e
    }
  }

  
  @action calculateTotal(){
    this.total = 0
    this.itemsInCart.forEach((entry) =>{
      console.log("as"+entry)
      console.log("as"+this.total)

      this.total += entry.price *entry.quantity
    });
  }
  
  updateData (index) {
    this.cartList.forEach((entry) =>{
      console.log("as"+entry)
      console.log("as"+this.total)

      this.total += entry
    });
  }

  clearEmailError = () => {
    if (this.emailMessage) {
      this.errors = false
    } else {
      this.errors = true
      this.emailMessage = null
    }
  };


  onCityChange = t => (this.user.first_name = t)
  onDistrictChange = t => (this.user.last_name = t)
  onLocalChange = t => {
    this.addressDetail = t
    console.log(this.addressDetail)
    if(this.addressDetail.length >0){
      this.disabled = false
    }else{
      this.disabled = true

    }
  }
  onNoteChange = t => (this.note= t)
  onLocationChange = locationObj => (this.user.locationObj = locationObj)
  onAddressChange = address => (this.user.address = address);

  onAboutChange = t => (this.user.about_seller = t)




  onShowPrompt = () => (this.showPrompt = !this.showPrompt)

  reset = () => {
    this.user.currentPassword = null
    this.user.new_password = null
    this.user.conf_password = null
    this.changePasswordErrors = {
      exist: false,
      oldPasswordErrorMessage: '',
      newPasswordErrorMessage: '',
      confirmPasswordErrorMessage: ''
    }
  }


  @action
  async addAddress(){
    console.log(this.lat+this.long)
    let arg = {
      addressDetail:this.addressDetail,
      lat:this.lat,
      long:this.long
    }
    try{
       let res =  await this.user.addAdressWithMap(arg)
        console.log(res.addressId)
        this.addressId = res.addressId
        this.makeOrder()
    }catch(e){
      console.log(e)
      showSnackBar({
        message: 'Có lỗi không xác định.Hãy thử đăng nhập lại',
        textColor: '#FFF',      // message text color
        position: 'top',  // enum(top/bottom).
        confirmText: 'OK', // button text.
        buttonColor: '#03a9f4', // default button text color
        duration: 3000,   // (in ms), duartion for which snackbar is visible.
        animationTime: 250, // time duration in which snackbar will complete its open/close animation.
        backgroundColor:'red', //background color for snackbar
        })
    }
  }
  @action
  async makeOrder(){
    if(this.isLoading){
      if(this.addressDetail ==''){
      showSnackBar({
        message: 'Địa chỉ giao hàng chưa chính xác',
        textColor: '#FFF',      // message text color
        position: 'top',  // enum(top/bottom).
        confirmText: 'OK', // button text.
        buttonColor: '#03a9f4', // default button text color
        duration: 3000,   // (in ms), duartion for which snackbar is visible.
        animationTime: 250, // time duration in which snackbar will complete its open/close animation.
        backgroundColor:Colors.facebook, //background color for snackbar
        })
        this.isLoading=false
        return
    }
    else if  (this.addressId !=''){
      console.log("addressId exist"+this.addressId)
      let orderInfo=[

      ]
      this.itemsInCart.forEach((entry) =>{
  
        this.total += entry.price *entry.quantity
        let obj = {
          productId:entry.productId,
          amount:entry.quantity,
          discount:0
        }
        orderInfo.push(obj)
      });

      let data = {
        buyerId:this.user.buyerId,
        note:this.note,
        shippingAddress:this.addressId,
        orderLineRequestDto:orderInfo
      }

      await this.user.makeOrder(data).then(async (res)=> {
        console.log(JSON.stringify(data))
        showSnackBar({
          message: 'Đặt hàng thành công ',
          textColor: '#FFF',      // message text color
          position: 'top',  // enum(top/bottom).
          confirmText: 'OK', // button text.
          buttonColor: '#03a9f4', // default button text color
          duration: 3000,   // (in ms), duartion for which snackbar is visible.
          animationTime: 250, // time duration in which snackbar will complete its open/close animation.
          backgroundColor:'green', //background color for snackbar
          })
          this.isLoading=false
          Actions.OrderHistoryList({processing:true})
      })

    }else{
      console.log("addressId not exist")
      await this.addAddress().then(async (res)=>{
        if(this.addressId !=''){
          console.log("addressId exist"+this.addressId)
          let orderInfo=[
    
          ]
          this.itemsInCart.forEach((entry) =>{
      
            this.total += entry.price *entry.quantity
            let obj = {
              productId:entry.productId,
              amount:entry.quantity,
              discount:0
            }
            orderInfo.push(obj)
          });
    
          let data = {
            buyerId:this.user.buyerId,
            note:this.note,
            shippingAddress:this.addressId,
            orderLineRequestDto:orderInfo
          }
    
          await this.user.makeOrder(data).then(async (res)=> {
            console.log(JSON.stringify(data))
            showSnackBar({
              message: 'Đặt hàng thành công ',
              textColor: '#FFF',      // message text color
              position: 'top',  // enum(top/bottom).
              confirmText: 'OK', // button text.
              buttonColor: '#03a9f4', // default button text color
              duration: 3000,   // (in ms), duartion for which snackbar is visible.
              animationTime: 250, // time duration in which snackbar will complete its open/close animation.
              backgroundColor:'green', //background color for snackbar
              })
              this.isLoading=false
              Actions.OrderHistoryList({processing:true})
          })
        }
      })
    }
  }else{
    return
  }

  }







  @action addToCart(item) {
    this.exist= false
    this.itemsInCart.forEach((entry) =>{
      if(entry.productId == item.productId){
        entry.quantity +=1
        this.exist = true
      }
    });
      if(!this.exist)
      this.itemsInCart.push(item)
      // console.log('itemincert'+JSON.stringify(this.itemsInCart))

  }
  @action changeQuantity(index,quantity) {
    console.log(index)
    console.log(quantity)
    this.itemsInCart[index].quantity=quantity    
    console.log('itemincert'+JSON.stringify(this.itemsInCart))
  }


  @computed get cartCount() {
    return this.itemsInCart.length
  }
  @action removeItem (id) {
    var filteredItem = this.itemsInCart.filter(item => item.id !== id);
    this.itemsInCart.replace(filteredItem);
  }
  // @action
  // login = async () => {
  //   this.isLoading = true
  //   this.errors = {}

  //   try {
  //     //let res = await UserModel.login(this.userIdentity, this.password)
  //     setTimeout(
  //       () => {
  //         Actions.HomeScreen({ type: 'replace' })
  //       }, 10
  //     )
  //   } catch (e) {
  //     this.isLoading = false
  //     if ((e._message && e._message === 'Số điện thoại này chưa kích hoạt') ||
  //       (e.message && e.message === 'Số điện thoại này chưa kích hoạt')) {
  //       // alert(e.message || e._message || ' error ')
  //       Snackbar.show({
  //         title: e.message || e._message || ' error ',
  //         length: 3000,
  //         backgroundColor: Colors.mainColor
  //       })
  //       Actions.enableverification()
  //       return
  //     }
  //     this.errors = e
  //   }
  // }

  onUserIdenityChanged = userIdentity => {
    this.userIdentity = userIdentity
  }
  onPasswordChanged = password => {
    this.password = password
  }
}

export default new CartStore()
