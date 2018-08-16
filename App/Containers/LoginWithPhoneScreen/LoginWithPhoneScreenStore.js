import { observable, action } from 'mobx'
import { Actions } from 'react-native-router-flux'
import UserModel from '../../Models/User'
import BaseViewModel from '../../Models/BaseViewModel'
import { Colors } from '../../Themes'
import Snackbar, {showSnackBar} from '@prince8verma/react-native-snackbar'

export class LoginWithPhoneScreenStore extends BaseViewModel {

  @observable phoneNumber = '';
  @observable isLoading = false;

  clearData () {
    this.phoneNumber = ''

  }

  @action
  getCode = async () => {
    this.isLoading = true
    var regex= /^(09|01[2|6|8|9]|849|841[2|6|8|9])+([0-9]{8})$/
    while(this.phoneNumber.charAt(0) === '+')

        this.phoneNumber = this.phoneNumber.replace('+84','0');
      
    console.log(this.phoneNumber)
    if(!regex.test(this.phoneNumber)){

      showSnackBar({
        message: "Sai định dạng số điện thoại",
        textColor: '#FFF',      // message text color
        position: 'top',  // enum(top/bottom).
        confirmText: 'OK', // button text.
        buttonColor: '#03a9f4', // default button text color
        duration: 4000,   // (in ms), duartion for which snackbar is visible.
        animationTime: 250, // time duration in which snackbar will complete its open/close animation.
        backgroundColor:Colors.facebook, //background color for snackbar
        })

      this.isLoading = false
    }else{
    UserModel.mobile=this.phoneNumber
    try {
      await UserModel.getVerifyCode(this.phoneNumber).then(
        res =>{
          this.isLoading = false
          setTimeout(
            () => {
              showSnackBar({
                message: "Kiểm tra tin nhắn để biết mã đăng nhập của bạn",
                textColor: '#FFF',      // message text color
                position: 'top',  // enum(top/bottom).
                confirmText: 'OK', // button text.
                buttonColor: '#03a9f4', // default button text color
                duration: 4000,   // (in ms), duartion for which snackbar is visible.
                animationTime: 250, // time duration in which snackbar will complete its open/close animation.
                backgroundColor:Colors.facebook, //background color for snackbar
                })
              Actions.ActivationCodeScreen({ code:res })
            }, 10
          )
        }
      )

    } catch (e) {
      this.isLoading = false
      if ((e._message && e._message === 'Đã có lỗi xảy ra.Vui lòng thử lại') ||
        (e.message && e.message === 'Đã có lỗi xảy ra.Vui lòng thử lại')) {
        // alert(e.message || e._message || ' error ')
        showSnackBar({
          message: e.message || e._message || ' error ',
          textColor: '#FFF',      // message text color
          position: 'top',  // enum(top/bottom).
          confirmText: 'OK', // button text.
          buttonColor: '#03a9f4', // default button text color
          duration: 4000,   // (in ms), duartion for which snackbar is visible.
          animationTime: 250, // time duration in which snackbar will complete its open/close animation.
          backgroundColor:Colors.facebook, //background color for snackbar
          })

        return
      }
      this.errors = e
    }
  }
  }

  onUserPhoneChanged = phoneNumber => {
    
    this.phoneNumber = phoneNumber

  }
  onPasswordChanged = password => {
    this.password = password
  }
}

export default new LoginWithPhoneScreenStore()
