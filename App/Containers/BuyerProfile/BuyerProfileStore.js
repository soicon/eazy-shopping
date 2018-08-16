// import { Actions } from 'react-native-router-flux'
import UserModel, { UserModel as _User } from '../../Models/User'
import BaseViewModel from '../../Models/BaseViewModel'
import ItemsModel from '../../Models/Items'
import  OrdersModel  from '../../Models/Orders'
import Snackbar from 'react-native-snackbar'
import { Colors } from '../../Themes'
import { Actions } from 'react-native-router-flux'
import { observable, action,computed } from 'mobx'


export class BuyerProfileStore extends BaseViewModel {
  @observable user = UserModel
  @observable items = []
  @observable orders = []
  @observable ordersCompleted = []
  @observable soldItems = []
  @observable wishList = []
  @observable itemsIsLoading = false





  editProfile = () => {
    Actions.editProfile()
  };
  // loadUserItems = async (userId) => {
  //   let items
  //   items = await ItemsModel.loadOtherSellerItems(userId)
  //   this.items = items
  // }

  loadItemsWithCategory = async category => {
    
      this.isLoading = true
      this.items = []
      return ItemsModel.loadCategoryItem({ category }).then(cats => {
        this.isLoading = false
        cats.map((val, index) => {
          this.items.push({ ...val, parent: true })
        })
        //Actions.ProductList({items:this.items})

      })
  }

  async loadCompletedOrder(){
    this.isLoading = true
    this.ordersCompleted = []
    await OrdersModel.getCompleteOrder().then(res=>{
      this.isLoading = false
      res.map((val, index) => {
        this.ordersCompleted.push({ ...val, parent: true })
      })
      console.log(JSON.stringify(this.ordersCompleted))
      //Actions.ProductList({items:this.items})
    })
  }

  async loadProcessingOrder(){
    this.orders = []
      await OrdersModel.getProcessingOrder().then(async (res) => { 
      res.map((val, index) => {
        this.orders.push({ ...val, parent: true })
      })
      this.isLoading = false
      //Actions.ProductList({items:this.items})
      console.log(this.orders)
      return this.orders
      //Actions.OrderHistoryList({items:this.orders})
    })
    
  }


  loadBuyerProfile = async userId => {
    this.isLoading = true
    this.itemsIsLoading = true
    try {
      // this.user = new _User()
      let userData = await UserModel.getBuyerProfile(userId)
      this.user = new _User(userData)
      // await this.user.getBuyerProfile()
      this.isFollowing = this.user.following != '0' ? true : false
      let items = []
      let soldItems = []
      items = await ItemsModel.loadOtherSellerItems(userId)
      // wishList = await ItemsModel.loadAllWishedItems()
      soldItems = await ItemsModel.loadAllSoldItems(userId)

      this.items = items
      this.soldItems = soldItems
      this.soldCount = (soldItems && soldItems.length) || 0
      this.allCount = items.length || 0

      this.numOfFollowings = UserModel.followingList.length
      this.numOfBlockers = UserModel.blockingList.length

      this.isLoading = false
      this.itemsIsLoading = false

      return this.items
    } catch (e) {
      this.user.isDisconnected(e)
      this.isLoading = false
      this.itemsIsLoading = false
      this.wishListIsLoading = false
      console.log('ERROR LOADING USER PROFILE => ', e)
    }
  }


}

export default new BuyerProfileStore()
