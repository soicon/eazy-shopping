import { observable, action } from 'mobx'
import { Actions } from 'react-native-router-flux'
import UserModel from '../../Models/User'
import BaseViewModel from '../../Models/BaseViewModel'
import { Colors } from '../../Themes'
import Snackbar, {showSnackBar} from '@prince8verma/react-native-snackbar'
import RNRestart from 'react-native-restart'


export class ActivationCodeScreenStore extends BaseViewModel {
  @observable userIdentity = '';
  @observable verifyCode = '';
  @observable token = '';
  @observable username = '';
  @observable isLoggedIn = false;

  clearData () {
    this.verifyCode = ''
    this.username = ''
  }

  @action
  login = async () => {
    this.isLoading = true
    this.errors = {}
    this.username = UserModel.mobile
    try {
      let res = await UserModel.login(this.username, this.verifyCode)
      console.log('input code'+res)
      if(res){
      setTimeout(
        () => {
          showSnackBar({
            message: "Đăng nhập thành công",
            textColor: '#FFF',      // message text color
            position: 'top',  // enum(top/bottom).
            confirmText: 'OK', // button text.
            buttonColor: '#03a9f4', // default button text color
            duration: 3000,   // (in ms), duartion for which snackbar is visible.
            animationTime: 250, // time duration in which snackbar will complete its open/close animation.
            backgroundColor:Colors.facebook, //background color for snackbar
              })
          this.isLoggedIn=true    
          Actions.HomeScreen({ type: 'replace' })
        }, 10
      )
    }else{
      showSnackBar({
        message: "Mã đăng nhập không đúng",
        textColor: '#FFF',      // message text color
        position: 'top',  // enum(top/bottom).
        confirmText: 'OK', // button text.
        buttonColor: '#03a9f4', // default button text color
        duration: 4000,   // (in ms), duartion for which snackbar is visible.
        animationTime: 250, // time duration in which snackbar will complete its open/close animation.
        backgroundColor:Colors.facebook, //background color for snackbar
        onConfirm: () => {},    //  perform some task here on snackbar button press.
      });
    }
    } catch (e) {
      this.isLoading = false

        // alert(e.message || e._message || ' error ')
        showSnackBar({
          message: "Mã đăng nhập không đúng",
          textColor: '#FFF',      // message text color
          position: 'top',  // enum(top/bottom).
          confirmText: 'OK', // button text.
          buttonColor: '#03a9f4', // default button text color
          duration: 4000,   // (in ms), duartion for which snackbar is visible.
          animationTime: 250, // time duration in which snackbar will complete its open/close animation.
          backgroundColor:Colors.facebook, //background color for snackbar
          onConfirm: () => {},    //  perform some task here on snackbar button press.
        });
        
        return
      
      this.errors = e
    }
  }

  onUserIdenityChanged = username => {
    this.username = username
  }
  onVerifyCodeChanged = verifyCode => {
    this.verifyCode = verifyCode
    console.log(this.verifyCode)
  }
}

export default new ActivationCodeScreenStore()
