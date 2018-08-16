import { observable, action } from 'mobx'
import { Actions } from 'react-native-router-flux'
import { AsyncStorage } from 'react-native'
import UserModel, { UserModel as userModel } from '../../Models/User'
import BaseViewModel from '../../Models/BaseViewModel'
import RNRestart from 'react-native-restart'
import I18n from 'react-native-i18n'
import vm from '../HomeScreen/HomeStore'
export class MainLoginScreenStore extends BaseViewModel {
  onStartUp = () => {
    this.isLoading = true
    return AsyncStorage.getItem('user')
      .then(data => JSON.parse(data))
      .then(this.checkUserExistance)
      .then(res => {
        this.isLoading = false

        if (res.userExist) {
          vm.loadHomeSubCategories(0)
          // UserModel.getBuyerProfile()
          //   .then(res => {
          //     if (productIdFromShare) {
          //       Actions.ProductDetails({productId: productIdFromShare, fromShare: true, type: 'replace'})
          //     } else {
                Actions.HomeScreen({ type: 'replace' })
                //Actions.AddressSelect()
            //   }
            // })
            // .catch(e => {
            //   Actions.mainlogin( { type: 'replace' })
            // })
        }
      })
      .catch(e => {
        this.isLoading = false
        console.log('INTERNAL ERROR => ', e)
        Actions.mainlogin({ type: 'replace' })
      })
    //Actions.ProductDetails({ type: 'replace' })
  }

  checkUserExistance = user => {
    if (user) {
      console.log('USER IS EXIST', user)
      UserModel.setUserData(user)
      return { userExist: true }
    } else {
      throw { userExist: false }
    }
  }

  onEnglishPress = async () => {
    // let locale = await AsyncStorage.getItem('locale')
    // locale === I18n.locale
    //   ? Actions.splash()
    //   : await AsyncStorage.setItem('locale', 'en')
    // RNRestart.Restart()
    if (I18n.locale === 'en') {
      Actions.splash()
    } else {
      await AsyncStorage.setItem('locale', 'en')
      RNRestart.Restart()
    }
  }
  onVietnamesePress = async () => {
    if (I18n.locale === 'vi') {
      Actions.splash()
    } else {
      await AsyncStorage.setItem('locale', 'vi')
      RNRestart.Restart()
    }
  }
}

export default new MainLoginScreenStore()
