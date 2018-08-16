import { observable } from 'mobx'
// import { Actions } from 'react-native-router-flux'
import { ItemModel } from '../../Models/Item'
import { Actions } from 'react-native-router-flux'
import UserModel from '../../Models/User'
import BaseViewModel from '../../Models/BaseViewModel'
import Items, { ItemsModel} from '../../Models/Items'
import { Colors } from '../../Themes'

import Constants from '../../Models/Constants'
import { stringify } from 'querystring';
import Snackbar, {showSnackBar} from '@prince8verma/react-native-snackbar'

export class ProductDetailsStore extends BaseViewModel {

  @observable productId= ''
  @observable productCode= ''
  @observable productVersion= ''
  @observable productName= ''
  @observable price= ''
  @observable type= ''
  @observable size= ''
  @observable description=  ''
  @observable imageUrl= ''
  @observable startDate= ''
  @observable endDate= null
  @observable brand= {}
  @observable category= {}
  @observable items= []
  @observable item= {quantity:1}

  loadItemData = async id => {
    console.log("comming")
    this.isLoading = true
    this.itemModel = new ItemModel(id)
    try {
      await this.itemModel.getItemDetails().then(async (res) =>{
        //res = JSON.parse(res)
       
        if(!res.message){
          this.productId = res.productId
          this.productCode = res.productCode
          this.iproductVersion = res.productVersion
          this.productName = res.productName
          this.type = res.type
          this.size = res.size
          this.price = res.price
          this.description = res.description
          this.imageUrl = res.imageUrl
          this.startDate = res.startDate
          this.endDate = res.endDate
          this.brand = res.brand
          this.category = res.category
          this.isLoading = false
          this.item = res
          console.log(JSON.stringify(this.item))
          return this.item
          }else{
           
            Actions.pop()
            showSnackBar({
              message: res.message,
              textColor: '#FFF',      // message text color
              position: 'top',  // enum(top/bottom).
              confirmText: 'OK', // button text.
              buttonColor: '#03a9f4', // default button text color
              duration: 4000,   // (in ms), duartion for which snackbar is visible.
              animationTime: 250, // time duration in which snackbar will complete its open/close animation.
              backgroundColor:Colors.facebook, //background color for snackbar
              })
          }
        }
      )

     
    } catch (e) {
      this.isLoading = false
        showSnackBar({
          message: "Có lỗi xảy ra khi tải dữ liệu",
          textColor: '#FFF',      // message text color
          position: 'top',  // enum(top/bottom).
          confirmText: 'OK', // button text.
          buttonColor: '#03a9f4', // default button text color
          duration: 4000,   // (in ms), duartion for which snackbar is visible.
          animationTime: 250, // time duration in which snackbar will complete its open/close animation.
          backgroundColor:Colors.facebook, //background color for snackbar
          })
      
      console.log(e)
    }
  }
  onStatusChanged = async item_status => {
    this.status = item_status
    let _imgs = {}
    this.images.slice &&
      this.images.slice().map((i, index) => {
        _imgs[`images_image_${index}`] = i.link
        _imgs[`images_name_${index}`] = i.link
        return index === 0 ? 1 : 0
      })
    try {
      let res = await Items.simpleApiRequest(Constants.SAVE_ITEM, {
        ...this.item,
        item_id: this.id,
        item_status: item_status.toLowerCase(),
        item_condition: this.item_condition.toLowerCase(),
        action_type: 'update',
        category: this.category_id,
        ..._imgs
      })
    } catch (error) {
      console.log('ERROR CHANGING ITEM STATUS => ', error)
    }
  }




  loadItemsWithCategory = async category => {
    

      // if (loadMore) {
      //   this.pagingLoad = true
      //   let _ItemsModel = new ItemsModel()
      //   let items = await _ItemsModel.loadAllItems({
      //     page: Items.allItemsPaging.next_page,
      //     cat,
      //     item_except: this.id
      //   })
      //   this.allItems = [...this.allItems, ...items]
      //   this.totalAllitems = Items.allItemsPaging.total
      //   this.pagingLoad = false
      // } else {

          
      
          

        
      

  }







  loadOtherSellerItemss = () => {
    this.otherSellerItems = []
    this.otherSellerItemsIsLoading = true
    let _ItemsModel = new ItemsModel()
    _ItemsModel.loadOtherSellerItems(this.ownerId, this.id)
      .then(res => {
        this.otherSellerItemsIsLoading = false
        this.otherSellerItems = res
      })
      .catch(e => {
        this.otherSellerItemsIsLoading = false
        console.log('RATE USER ERR => ', e)
      })
  }

  makeOffer = async offer => {
    this.isLoading = true
    try {
      let options = {
        item_id: this.id,
        price: offer
      }
      let res = await Items.simpleApiRequest(Constants.MAKE_OFFER, options)
      this.isLoading = false
      this.makingOffer = false
      console.log('resssss', res)
      if (res && res.message) {
        Snackbar.show({
          title: res.message,
          length: 3000,
          backgroundColor: Colors.mainColor
        })
      }
      return res
    } catch (e) {
      Snackbar.show({
        title: e._message,
        length: 3000,
        backgroundColor: Colors.mainColor
      })
      this.isLoading = false
      this.makingOffer = false
      console.log('MAKE OFFER ERROR => ', e)
    }
  }

  blockUser = async user_id => {
    try {
      let options = {
        user_id,
        action: 'block'
      }
      let res = await this.simpleApiRequest(Constants.BLOCK_USER, options)
      res.message &&
        Snackbar.show({
          title: res.message,
          length: 3000,
          backgroundColor: Colors.mainColor
        })
      return res
    } catch (e) {
      console.log('BLOCKING USER ERROR => ', e)
      Snackbar.show({
        title: e.message || e._message,
        length: 3000,
        backgroundColor: Colors.mainColor
      })
    } finally {
    }
  }
}

export default new ProductDetailsStore()
