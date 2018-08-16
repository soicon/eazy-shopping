import { observable, action } from 'mobx'
import { Actions } from 'react-native-router-flux'
import BaseViewModel from '../../Models/BaseViewModel'
import GeoCoder from 'react-native-geocoder'
import User from '../../Models/User'
import { Colors } from '../../Themes'
import { stringify } from 'querystringify'
import Snackbar, {showSnackBar} from '@prince8verma/react-native-snackbar'

var base64 = require('base-64')



export class EditProfileStore extends BaseViewModel {
  @observable user = User
  @observable newAddress = null
  @observable showPrompt = false
  @observable photo = null
  @observable address = ''
  @observable location = ''
  @observable locationObj = {
    latitude: '',
    longitude: '',
    latitudeDelta: 0,
    longitudeDelta: 0
  };
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
  clearData () {
    this.first_name = ''
    this.last_name = ''
    this.email = ''
    this.address = ''
    this.locationObj = {
      latitude: '',
      longitude: ''
    }
    this.customErrors = ''
    this.emailMessage = ''
  }

  clearEmailError = () => {
    if (this.emailMessage) {
      this.errors = false
    } else {
      this.errors = true
      this.emailMessage = null
    }
  };
  onFirstNameChange = t => ( this.user.name = t)
  onLastNameChange = t => (this.user.last_name = t)
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






  updateBuyerProfile = async () => {

    this.showPrompt = false
    try {
      this.isLoading = true
      await this.user.updateProfile().then(async (res) => {
      res = this.user.getResult(res)
      //Actions.BuyerProfile()
      showSnackBar({
        message: 'Cập nhật thông tin thành công',
        textColor: '#FFF',      // message text color
        position: 'top',  // enum(top/bottom).
        confirmText: 'OK', // button text.
        buttonColor: '#03a9f4', // default button text color
        duration: 3000,   // (in ms), duartion for which snackbar is visible.
        animationTime: 250, // time duration in which snackbar will complete its open/close animation.
        backgroundColor:Colors.facebook, //background color for snackbar
        })
      this.isLoading = false
      Actions.BuyerProfile({type:'replace'})
      return res
    })
    } catch (e) {
      this.isLoading = false
      if (!e.code) {
        console.log(e)
        //Actions.BuyerProfile()
        showSnackBar({
          message: "Cập nhật thông tin thất bại",
          textColor: '#FFF',      // message text color
          position: 'top',  // enum(top/bottom).
          confirmText: 'OK', // button text.
          buttonColor: '#03a9f4', // default button text color
          duration: 3000,   // (in ms), duartion for which snackbar is visible.
          animationTime: 250, // time duration in which snackbar will complete its open/close animation.
          backgroundColor:'red', //background color for snackbar
          })
      }
      console.log('UPDATING USER PROFILE ERROR => ', e)
      this.errors = e
    }
  }
}

export default new EditProfileStore()
