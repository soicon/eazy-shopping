import React from 'react'
import { ScrollView, Text, KeyboardAvoidingView, View, TouchableOpacity, Platform, NativeModules, StatusBar, Alert } from 'react-native'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import Background from '../../Components/BackgroundImage'
import LogoImage from '../../Components/LogoImage'
import Button from '../../Components/FullButton'
import OrLine from '../../Components/OrLine'
// Styles
import styles from './MainLoginStyle'
import { Images, Colors } from '../../Themes'
import { observer } from 'mobx-react/native'
import MainLoginScreenStore from './MainLoginStore'
import { Actions } from 'react-native-router-flux'
const { FBLoginManager } = require('react-native-facebook-login')
import vm from './MainLoginStore'
import Snackbar from 'react-native-snackbar'
import I18n from 'react-native-i18n'
import axios from 'axios'

@observer
export default class MainLoginScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hidden: true, animated: true }
  }

  onLoginNowPress = () => Actions.LoginWithPhoneScreen();
  onCreateNewAccountPress = () => Actions.SignUpScreen();

  loginWithSocial(provider, authData, email, fullname) {
    console.log('login with social', provider, authData, email, fullname)

    vm.loginWithSocial(provider, authData, email, fullname)
  }

  loginWithFacebook = () => {
    let userData = {}
    FBLoginManager.logout((e, data) => {
      console.log('data -> ', data)
    })
    FBLoginManager.loginWithPermissions(["email", "public_profile"], (error, data) => {
      console.log('fb authData', data)
      console.log('fb authError', error)
      if (!data) {
        // Alert.alert(
        //   'error',
        //   'error getting data from facebook',
        //   [
        //     { text: 'OK', onPress: () => console.log('OK Pressed') }
        //   ],
        //   { cancelable: false }
        // )
        Snackbar.show({
          title: 'error getting data from facebook',
          length: 3000,
          backgroundColor: Colors.mainColor
        })
        return
      }
      var userData;
      var api = 'https://graph.facebook.com/v2.8/' + data.credentials.userId +
               '?fields=name,email&access_token=' + data.credentials.token;
      axios.get(api)
      .then(response => {
        userData = response.data;
        //userData = JSON.parse(data.profile)
        //console.log('dataaaaaaaaa', userData)
        if (!error) {
          this.loginWithSocial('facebook', {
            access_token: data.credentials.token,
            id: data.credentials.userId,
            email: userData.email,
            fullname: userData.name
          },
            userData.email,
            userData.name
          )
          console.log('=======================', userData.email)
        } else {
          console.log('Error: ', error)
        }
        })

    })
  }



  render() {
    return (
      <View style={{ flex: 1 }}>
        <StatusBar hidden={this.state.hidden} animated={this.state.animated} />
        <Background image={Images.mainLogin}  style={{backgroundColor:Colors.mainColor}} />
        <ScrollView style={{ flex: 1 }}>
          <View style={[styles.splitView, { marginTop: 20, paddingTop: 45, paddingBottom: 25 }]}>
            <LogoImage />
          </View>
          <View style={styles.splitView}>
            <Button text={I18n.t('loginWithFacebook')} style={styles.loginFb} onPress={this.loginWithFacebook} />
            {/* <Button text={I18n.t('loginWithGoogle')} style={[styles.loginFb, { marginTop: 10 }]} onPress={this.loginWithGoogle} /> */}
          </View>
          <View style={[styles.splitView, { marginTop: 30 }]}>
            <OrLine />
          </View>
          <View style={[styles.splitView, { marginTop: 40, alignItems: 'flex-end' }]}>
            <Button
              onPress={this.onLoginNowPress}
              text={I18n.t('login')}
              style={[styles.loginFb, { backgroundColor: 'white' }]}
              styleText={{ color: '#2A2722' }} />
            {/* <TouchableOpacity onPress={Actions.ForgetPasswordScreen} style={{ marginHorizontal: 60, marginBottom: 10, alignSelf: 'stretch', }}>
              <Text style={styles.textPassword}>{I18n.t('forgetPass')}</Text>
            </TouchableOpacity> */}
          </View>
          {/* <TouchableOpacity style={styles.newView} onPress={this.onCreateNewAccountPress}>
            <Text style={styles.textCreat}>{I18n.t('create')}</Text>
            <Text style={styles.textNew}>{I18n.t('newAccount')}</Text>
          </TouchableOpacity> */}
        </ScrollView>
      </View>

    )
  }

}
