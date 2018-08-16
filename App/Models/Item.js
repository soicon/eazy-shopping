import { AsyncStorage } from 'react-native'
import BaseModel from './BaseModel'
import UserModel from './User'
import ItemsModel from './Items'

const types = BaseModel.constants

export class ItemModel extends BaseModel {

  baseUrl =  'http://eazy-product.us-east-2.elasticbeanstalk.com/api/products/'

  productId= ''
  productCode= ''
  productVersion= ''
  productName= ''
  price= ''
  type= ''
  size= ''
  description=  ''
  imageUrl= ''
  startDate= ''
  endDate= null
  brand= {}
  category= {}
  quantity=0
   

  constructor(id) {
    super()
    this.setTokens({ device: types.ANDROID })
    this.id = id
    if (!this.userToken && UserModel.userToken) { this.setTokens({ userToken: UserModel.userToken }) }
  }

  async getItemDetails() {

    if (!this.userToken) this.setTokens({ userToken: UserModel.userToken })
    res = await this.apiReq(types.ONE_ITEM, {
      optionalParams: { productCode: this.id }
    },this.baseUrl)
    
      console.log('iteem res ------------', res)
      if(!res.message){
        res = await this.getResult(
          res,
          'productId',
          'productCode',
          'productVersion',
          'productName',
          'price',
          'type',
          'size',
          'description',
          'imageUrl',
          'startDate',
          'endDate',
          'brand',
          'category',
        )
        console.log('item'+JSON.stringify(res))
        this.setItemData(res)
        return res
      }
      return res


  }




  setItemData(data) {
    Object.keys(data).map(key => {
      this[key] = data[key]
    })
  }
}

// export default new ItemModel();
