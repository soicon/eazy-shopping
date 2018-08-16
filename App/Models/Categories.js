import {AsyncStorage} from 'react-native'
import BaseModel from './BaseModel'
import UserModel from './User'

const types = BaseModel.constants

export class CategoriesModel extends BaseModel {
  categories = [];
  baseUrl = 'http://eazy-product.us-east-2.elasticbeanstalk.com/api/categories'
  constructor () {
    super()
    this.setTokens({device: types.ANDROID})
  }

  async loadCategories (options = {},optionalParams={}) {
    if (!this.userToken) this.setTokens({userToken: UserModel.userToken})
    optionalParams = {
      idCate: optionalParams.parent_category,
    }
    let res = await this.apiReq(types.CATEGORIES, {options, optionalParams},this.baseUrl)
    this.categories = await this.getResult(res)
    console.log('data from model'+this.categories)
    return this.categories
  }

}

export default new CategoriesModel()
