import { observable, action } from 'mobx'
import { Actions } from 'react-native-router-flux'
import BaseViewModel from '../../Models/BaseViewModel'
import UserModel from '../../Models/User'
import ItemModel from '../../Models/Item'
import Items from '../../Models/Items'
import Snackbar from 'react-native-snackbar'
import { Colors } from '../../Themes'
import fire from '../../Utils/firebase'
import map from '../../Utils/mapObject'
import moment from 'moment'
// import Items from '../../Models/Items'
import Constants from '../../Models/Constants'

export class ConversationStore extends BaseViewModel {
  @observable notifications = []
  constant = {
    'RETAILER_ACCEPT_ORDER':'Đơn hàng của bạn đã có người nhận.',
    'RETAILER_SHIP_ORDER':'Cửa hàng đang chuyển hàng cho bạn.',
    'RETAILER_DELIVERED_ORDER':'Cửa hàng đã chuyển hàng.Vui lòng xác nhận',
    'NOT_FOUND_RETAILER':'Hiện tại không có cửa hàng nào nhận đơn hàng của bạn',

  }
  onStartUp = async () => {
    this.isLoading = true

    try {
      this.notifications = []
      let notificationsArray = []
      await UserModel.getBuyerNoti().then(async (conversations)=>{
        console.log('data noti'+conversations)
        conversations.map(item => {
          let _d = new Date(0)
          _d.setUTCSeconds(item.time.epochSecond)
          notificationsArray.push({
            date: moment(_d).format('hh:mm:ss DD-MM-YYYY'),
            content: this.constant[item.message],
            id: item.notificationId
          })
        })
        notificationsArray = notificationsArray.reverse()
      this.notifications = notificationsArray
      console.log('THIS.NOTIF => ', this.notifications)
      this.isLoading = false
    })
    } catch (error) {
      console.log('GETTING NOTIFICATOIN ERROR => ', error)
      this.isLoading = false
    }
  }

  deleteChat = async notif_id => {
    let options = {
      notif_id
    }
    try {
      let res = await Items.simpleApiRequest(
        Constants.DELETE_NOTIFICATION,
        options
      )
    } catch (error) {
      console.log('DELETE CONVERSATION ERROR => ', error)
    }
  }
}

export default new ConversationStore()
