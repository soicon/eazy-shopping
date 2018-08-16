import { AsyncStorage } from 'react-native'
import BaseModel from './BaseModel'
import UserModel from './User'
const {
  LOGIN,
  ANDROID,
  IOS,
  REGISTER,
  FORGET_PASSWORD,
  ADD_ADDRESS,
  ITEMS_SEARCH,
  CHECK_PHONE,
  MOBILE_VERF,
  RESEND_CODE,
  LOGOUT,
  GETCODE
} = BaseModel.constants
const types = BaseModel.constants



export class ItemsModel extends BaseModel {

  baseUrl =  'http://eazy-product.us-east-2.elasticbeanstalk.com/api/products/'
  allItems = []
  featuredItems = []
  soldItems = []
  likedItems = []
  wishedItems = []
  otherSellerItems = []


  constructor () {
    super()
    this.setTokens({ device: types.ANDROID })
  }

  async loadAllItems (optionalParams = {}) {
    if (!this.userToken) 
    this.setTokens({ userToken: UserModel.userToken })
    console.log('CONTANTS TYPES'+types.ITEMS_SEARCH)
    try {
    await this.apiReq(types.ITEMS_SEARCH, {
      optionalParams: { ...optionalParams }
    },this.baseUrl).then(async(res) => {
      this.allItems = await this.getResult(res)
    })
    
    // console.log('items res ---- => ', res)
    // this.isDisconnected(res)

    //console.log('ALL ITEMS COUNT => ', total_data)

    return this.allItems
    }catch (e) {
      console.log('Search ITEMS ERROR => ', e)
      this.errors = e
    }
  }

  async loadCategoryItem (optionalParams={}) {
    if (!this.userToken) this.setTokens({ userToken: UserModel.userToken })
    try {
      optionalParams = {
        idCate: optionalParams.category,
      }
      if (!this.userToken) this.setTokens({ userToken: UserModel.userToken })
      let res = await this.apiReq(types.ITEMS, { optionalParams },this.baseUrl)
      
      this.allItems = await this.getResult(res)
      console.log('data from ITEMS => ', this.allItems)
      return this.allItems
    } catch (e) {
      console.log('CATEGORY ITEMS ERROR => ', e)
      this.errors = e
    }
  }






}

export default new ItemsModel()
