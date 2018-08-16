import axios from 'axios'
import CONSTANTS from './Constants'
import { stringify } from 'querystringify'
import { Alert } from 'react-native'
import API from './API'
import { Actions } from 'react-native-router-flux'
import Snackbar from 'react-native-snackbar'
import { Colors } from '../Themes'
import I18n from 'react-native-i18n'
export default class BaseModel {
  static constants = CONSTANTS
  //static defaultUrl = 'http://eazy-user.us-east-1.elasticbeanstalk.com/api'
  api = API

  

  deviceToken = ''
  userToken = ''
  reqResult = {}
  appToken = {
    android: '1e8176a792cc6bd4af6d39d3c523f5bc',
    ios: '6d4899fc7b1f2b25fee88fcab358bf11'
  }

  disconnected = false
  isLoggedIn = false
  request = {}
  def_lang = I18n.locale
  errors = {}
  /**
     *
     * @param {device_type___user_token} param0
     */
  setTokens({ device, userToken, def_lang }) {
    if (device) {
      this.deviceToken = this.appToken[device]
    }
    if (userToken) {
      this.userToken = userToken
      this.isLoggedIn = true
    }
    if (def_lang) {
      this.def_lang = def_lang
    }
  }
  /**
     *
     * @param {*String} type
     * @param {*Boolen} userToken
     */
  async apiReq(type, { optionalParams, options },baseUrl) {
    console.log('Type'+type)
    console.log('Params'+optionalParams)
    console.log('optison'+JSON.stringify(options))
    let api = this.api[type]
    let result = null
    this.request = {
      optionalParams,
      options,
      method: api.method
    }
    console.log(api.url)
    api.useUserToken ? (this.request.useUserToken = true) : null
    // if(api.method == 'post'){
    result = await this.createReqest(`${baseUrl}${api.url}`,type)
    console.log('result'+result)
    return result
    // }
  }

  

  async createReqest(url, type) {

    let fullUrl = url
    console.log(fullUrl)
    this.request.useUserToken && this.userToken
    ? (axios.defaults.headers.common['Authorization'] = this.userToken)
    : null

    //console.log(config.headers.Authorization)
    fullUrl += this.addOptionalParamsToUrl(this.request.optionalParams)
    let res = null
    console.log(`NEW REQUEST { ${this.request.method} } TO =>`, fullUrl)
    console.log(stringify(this.request.options))
    try {
      res = await  axios[this.request.method](
        fullUrl
        ,this.request.options
      ).catch((error)=>{
          if (!error.status) {
            //Alert.alert("Đã có lỗi xảy ra.Vui lòng thử lại")
            console.log(error)
            res = {
              message:"Không tim thấy dữ liệu"
            }
            console.log(JSON.stringify(res))
            return res
          }
      })
      //console.log('res ---- ' + type, res)
      return res

      
    } catch (e) {
      let data = JSON.stringify(e)
      data = JSON.parse(data)
      console.log('ERROR => ', data.response.data.meta)
      console.log(data)
      if (!data.response.data.meta) {
        // Alert.alert(
        //   'Ooops',
        //   'Internet Connection Error',
        //   [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
        //   { cancelable: false }
        // )
        Snackbar.show({
          title: 'Internet Connection Error please restart the application',
          length: 3000,
          backgroundColor: Colors.mainColor
        })
      }
      throw data.response.data.meta
    } finally {
      console.log(`RESULT OF REQUEST TYPE: => ${type}`, res.data)
      this.reqResult = res
      return res
    }
  }
  getResult =  (result, ...neededData) => {
    if (result &&  result.status != 200) {
      let errors = {}
      if (result.errors) {
        errors = result.errors
      }
      if (result.message) {
        errors._message = result.message
      }

      result.code = errors && errors._code ? errors._code : 'no code'
      console.log('this.errors', this.errors)
      throw errors
    } else if (Array.isArray(result.data)) {
      return result.data
    } else if (neededData.length > 0) {
      console.log('come here')
      let returnedObj = {}
      this.errors = false
      neededData.map( key => (returnedObj[key] = result.data[key]))
      console.log('get result'+JSON.stringify(returnedObj))
      return returnedObj
    } else {
      return result.data
    }
  }
  addOptionalParamsToUrl(optionalParams) {
    let params = ''
    optionalParams
      ? Object.keys(optionalParams).map(key => {
        console.log('OPTION PARAM KEY => ', key)
        console.log('OPTION PARAM VALUE => ', optionalParams[key])
        if(key ==='idCate'){
          params += `/${optionalParams[key]}`
        }else{
        params += `&${key}=${optionalParams[key]}`
        }
      })
      : null
      
    return params
  }

  getTokens = async (result) => {
    console.log('result'+result.status)
    if (result && (result.status  != 200)) {
      let errors = {}
      if (result.errors) {
        errors = result.errors
      }
      if (result.message) {
        errors._message = result.message
      }

      result.code = errors && errors._code ? errors._code : 'no code'
      console.log('this.errors', this.errors)
      throw errors
    } else {
      return result.headers.authorization
    }
  }

  async simpleApiRequest(type, options = {}, dontFilter, optionalParams) {
    try {
      let res = await this.apiReq(type, { options, optionalParams })
      !dontFilter ? (res = await this.getResult(res)) : null
      console.log('SIMPLE API REQ RESULT => ', res)
      return res
    } catch (e) {
      console.log('### SIMPLE API REQ ERROR => ', e)
      this.errors = e
      throw e
    }
  }

  isDisconnected = res => {
    if (!res) return
    let { status, code, message } = res
    if (!status || !code || !message) return
    if (
      status == 'error' &&
      code == 401 &&
      message ==
      'You do not have authrize to access Application, please login again or contact Admin'
    ) {
      // alert(message)
      Snackbar.show({
        title: message,
        length: 3000,
        backgroundColor: 'red'
      })
      Actions.launchScreen()
    }
  }
}
