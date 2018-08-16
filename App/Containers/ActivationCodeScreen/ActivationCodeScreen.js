import React from 'react'
import { ScrollView, Text, StatusBar, View, Alert } from 'react-native'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import { ApplicationStyles, Colors, Fonts } from '../../Themes'
import Background from '../../Components/BackgroundImage'
import LogoImage from '../../Components/LogoImage'
import Button from '../../Components/FullButton'
import OrLine from '../../Components/OrLine'
import TextInputField from '../../Components/TextInputField'
import Topbar from '../../Components/TopBar'
import { Images } from '../../Themes';
import { observe } from 'mobx';
import { observer } from 'mobx-react/native';
import vm from './ActivationCodeScreenStore'
import { Actions } from 'react-native-router-flux'
import KeyboardAwareScrollView from 'react-native-keyboard-aware-scroll-view'
import CodeInput from 'react-native-confirmation-code-input';
import I18n from 'react-native-i18n'
import Snackbar from 'react-native-snackbar'

// Styles
import styles from './ActivationCodeScreenStyle'
import { stringify } from 'querystring';

@observer
export default class ActivationCodeScreen extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
       hidden: true, 
       animated: true,
       verifyCode:'' }
  }

  componentWillMount() {
    vm.clearData();
    vm.errors = {}
  }

  _onFinishCheckingCode2(code) {
    this.setState({verifyCode:code})
    vm.onVerifyCodeChanged(code)
    console.log(code);
    // if (!isValid) {
    //   Snackbar.show({
    //     title: 'Mã kích hoạt không đúng',
    //     length: 3000,
    //     backgroundColor: Colors.mainColor
    //   })
    // } else {
    //   this.setState({ code });
      
    //   Snackbar.show({
    //     title: 'Đăng nhập thành công!',
    //     length: 3000,
    //     backgroundColor: Colors.mainColor
    //   })
       vm.login()
      
    // }

    this.refs.codeInputRef2.clear();
  }


  render() {
    
    return (
      <View style={{ flex: 1 }}>
        <StatusBar hidden={this.state.hidden} animated={this.state.animated} />
        <Background image={Images.mainLogin}  style={{ alignSelf: 'center' ,backgroundColor:Colors.mainColor}} />
        <View >
          <ScrollView >
            <Topbar
              leftImage={Images.chevronLeft}
              leftText={I18n.t('Back')}
              leftAction={()=> Actions.pop({isLoading:false})}
              backgroundColor={Colors.transparent}
            />
            <View style={styles.blurView}>
              {/* <LogoImage style={{ marginTop: 20, width: 229, height: 129 }} /> */}
              <View style={{ marginTop: 30, marginBottom: 20, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                <View style={{ flex: 1, height: 1, borderWidth: 1, borderColor: Colors.steel }}></View>
                <Text style={styles.activeCodeText}> {I18n.t('verifyCode')}</Text>
                <View style={{ flex: 1, height: 1, borderWidth: 1, borderColor: Colors.steel }}></View>
              </View>

    
              <CodeInput
                ref="codeInputRef2"
                keyboardType="numeric"
                codeLength={6}
                className='border-circle'
                autoFocus={false}
                codeInputStyle={{ fontWeight: '800',fontSize: 25 }}
                onFulfill={(code) => this._onFinishCheckingCode2(code)}
              />   

              <Button
                onPress={vm.login}
                loading={vm.isLoading}
                text={I18n.t('resendCode')}
                style={[styles.resendCode, { backgroundColor: 'white' }]}
                styleText={{ color: '#2A2722' }} />

            </View>
          </ScrollView>
        </View>
      </View>
    )
  }

}
