import BaseModel from './BaseModel'
import { AsyncStorage } from 'react-native'
const {
  LOGIN,
  GET_NOTIFICATION,
  UPDATE_DEVICEID,
  UPDATE_ADDRESS,
  DELETE_ADDRESS,
  ADD_ADDRESS,
  ADD_FEEDBACK,
  CANCEL_ORDER,
  RECEIVED_ORDER,
  RESEND_CODE,
  LOGOUT,
  MAKE_ORDER,
  GETCODE
} = BaseModel.constants
import Snackbar from 'react-native-snackbar'
import { Colors } from '../Themes'
import { Alert } from 'react-native'
import RNRestart from 'react-native-restart' // Import package from node modules
import DeviceInfo from 'react-native-device-info'
// Immediately reload the React Native Bundle
const types = BaseModel.constants

export class UserModel extends BaseModel {

  baseUrl = 'http://eazy-user.us-east-1.elasticbeanstalk.com/api/buyers/'
  OrderbaseUrl = 'http://eazy-order.us-east-2.elasticbeanstalk.com/api/orders/'
  FeedbackbaseUrl = 'http://eazy-order.us-east-2.elasticbeanstalk.com/api/feedbacks/'
  NotibaseUrl = 'http://eazy-notification.us-east-1.elasticbeanstalk.com/api/notifications/'

  email = '';
  buyerId= '';
  username= '';
  name = '';
  addresses =  [];
  defaultAddress = '';
  deviceId = '';
  first_name = '';
  last_name = '';
  address = '';
  locationObj = {};
  adressObj = {};
  adressList = []
  mobile = '';
  notification = [];
  userToken = '';



  constructor (data) {
    super()
    this.setTokens({ device: this.deviceId })

    if (data) {
      Object.keys(data).map(key => {
        if (key == 'rate') {
          this.userRate = data[key]
        } else {
          this[key] = data[key]
        }
      })
    }
  }

  async getVerifyCode (userIdenity) {
    // let res = await this.apiReq(LOGIN, {options})
    // return this.getResult(res);
    let options = {
      
    }

    let optionalParams = {
      username: userIdenity,
    }
    let res = await this.apiReq(GETCODE, { options, optionalParams },this.baseUrl)
    console.log('from verify code'+res)
    return res.data
  }

  async login (userIdenity,verifyCode) {
    // let res = await this.apiReq(LOGIN, {options})
    // return this.getResult(res);
    let options = {
      username: userIdenity,
      verifyCode: verifyCode
    }
    let optionalParams = {
      
  }

    let res = await this.apiReq(LOGIN, { options, optionalParams },this.baseUrl)
    console.log('res'+res.data)
    let data = await this.getTokens(
      res
    )
    console.log(data)
    this.setTokens({ userToken: data })
    this.updateDeviceId()
    this.getBuyerProfile()
    return data
  }

  async addAdressWithMap (address) {
    // let res = await this.apiReq(LOGIN, {options})
    // return this.getResult(res);
      let options = {
        addressDetail: address.addressDetail,
        latitude: address.lat,
        longitude: address.long
      }
      let optionalParams = {
        username : this.mobile,
        default : 0
      }
      try {
      let res = await this.apiReq(ADD_ADDRESS, { options, optionalParams },this.baseUrl)
        
        console.log(res)
        this.getBuyerProfile()
        return res.data

    }catch (e) {
      console.log('ADD ADDRESS ERROR => ', e)
      
    }
  }

  async deleteAdress (id) {
    // let res = await this.apiReq(LOGIN, {options})
    // return this.getResult(res);

      let optionalParams = {
        username : this.mobile,
      }
      let options={
        addressId : id
      }

      try {
      let res = await this.apiReq(DELETE_ADDRESS, { options,optionalParams },this.baseUrl)
        
        console.log(res)
        this.getBuyerProfile()
        return res.data

    }catch (e) {
      console.log('ADD ADDRESS ERROR => ', e)
      
    }
  }

  async updateAdress (addressId) {
    // let res = await this.apiReq(LOGIN, {options})
    // return this.getResult(res);

      let optionalParams = {
        idCate : addressId,
      }
      try {
      let res = await this.apiReq(DELETE_ADDRESS, { optionalParams },this.baseUrl)
        
        console.log(res)
        this.getBuyerProfile()
        return res.data

    }catch (e) {
      console.log('ADD ADDRESS ERROR => ', e)
      
    }
  }
  async receivedOrder (orderId) {
    // let res = await this.apiReq(LOGIN, {options})
    // return this.getResult(res);

      let optionalParams = {
        idCate : orderId,
      }
      try {
      let res = await this.apiReq(RECEIVED_ORDER, {optionalParams },this.OrderbaseUrl)
        
        console.log(res)
        //this.getBuyerProfile()
        return res.data

    }catch (e) {
      console.log('ADD ADDRESS ERROR => ', e)
      
    }
  }

  async cancelOrder (orderId) {
    // let res = await this.apiReq(LOGIN, {options})
    // return this.getResult(res);

      let optionalParams = {
        idCate : orderId,
      }
      try {
      let res = await this.apiReq(CANCEL_ORDER, {optionalParams },this.OrderbaseUrl)
        
        console.log(res)
        //this.getBuyerProfile()
        return res.data

    }catch (e) {
      console.log('ADD ADDRESS ERROR => ', e)
      
    }
  }

  async addFeedback (data) {
    // let res = await this.apiReq(LOGIN, {options})
    // return this.getResult(res);

      let options = data
      try {
      let res = await this.apiReq(ADD_FEEDBACK, {options },this.FeedbackbaseUrl)
        
        console.log(res)
        //this.getBuyerProfile()
        return res.data

    }catch (e) {
      console.log('ADD ADDRESS ERROR => ', e)
      
    }
  }

  async makeOrder(orderData) {
    // let res = await this.apiReq(LOGIN, {options})
    // return this.getResult(res);
      let options = orderData

      try {
      let res = await this.apiReq(MAKE_ORDER, { options },this.OrderbaseUrl)
        
        console.log(res)
        this.getBuyerProfile()
        return res.data

    }catch (e) {
      console.log('ADD ADDRESS ERROR => ', e)
      
    }
  }
  
  setUserData (data, saveAtAsyncStorage) {
    Object.keys(data).map(key => {
      this[key] = data[key]
    })
    console.log(this.name)
    // this.userToken = data["user"];
    this.provider = data['reg_by']
    this.setTokens({ userToken: data['user'] })
    if (saveAtAsyncStorage) {
       AsyncStorage.setItem('user', JSON.stringify(this))
    }
    console.log(AsyncStorage.getItem('user'))
  }

  getNewUserToken () {
    // To referesh User Token
  }

  async logout () {
    try {
      // let options = { email }
      // let optionalParams = {
      //   device_token: global.token
      // }
      // await this.apiReq(LOGOUT, { options, optionalParams })
      await AsyncStorage.setItem('user', '')
      this.deviceId='',
      await this.updateDeviceId ()
      RNRestart.Restart()
      return 'user logged out'
    } catch (e) {
      console.log('LOGOUT ERROR => ', e)
      await AsyncStorage.setItem('user', '')
      RNRestart.Restart()
      return 'user logged out'
    }
    // this.emptyUserData
  }





  async resendCode () {
    let options = {
      mobile: this.mobile,
      email: this.email,
      activate_field: 'mobile'
    }
    let res = await this.apiReq(RESEND_CODE, { options })
    return this.getResult(res)
  }





  async getBuyerProfile () {
    let optionalParams = {
      username: this.mobile,
    }
    await this.apiReq(types.GET_PROFILE, { optionalParams },this.baseUrl).then(async (res) =>{
      let data = this.getResult(
        res,
        'buyerId',
        "buyerId",
        "username",
        "name",
        "addresses",
        "defaultAddress",
        "deviceId"

      )

      console.log('get buyer profile'+ JSON.stringify(data))
      this.setUserData(data, true)
    })

  }

  async getBuyerNoti () {
    let optionalParams = {
      idCate: this.buyerId,
    }

    this.notification=[]

    let res = await this.apiReq(types.GET_NOTIFICATION, { optionalParams },this.NotibaseUrl)
      this.notification = await this.getResult(res)
      this.isLoading = false
      console.log('iteem res ------------', this.notification)
      return  this.notification


  }


  async updateDeviceId () {
    try {
      console.log('update profile')
      options= {
        username: this.mobile,
        deviceId:this.deviceId,
      }
      let res = await this.apiReq(types.UPDATE_DEVICEID, {options},this.baseUrl)
      // res = this.getResult(res)
      console.log('updateprofile result => ', res)
      return res
    } catch (e) {
      this.errors = e
      throw e
    }
  }
  async updateProfile () {
    try {
      console.log('update profile')
      options= {
        username: this.mobile,
        name:this.name,
      }
      let res = await this.apiReq(types.UPDATE_PROFILE, {options},this.baseUrl)
      // res = this.getResult(res)
      console.log('updateprofile result => ', res)
      return res
    } catch (e) {
      this.errors = e
      throw e
    }
  }
}

export default new UserModel()
