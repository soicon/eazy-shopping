import '../Config'
import '../I18n/I18n'
import React, { Component } from 'react'
import { AsyncStorage, View, NetInfo, Platform ,AppState,Alert} from 'react-native'
import { Provider } from 'react-redux'
import createStore from '../Redux'
import Snackbar from 'react-native-snackbar'
// import I18n from 'react-native-i18n'
import { Colors } from '../Themes'
import FCM, {
  FCMEvent,
  RemoteNotificationResult,
  WillPresentNotificationResult,
  NotificationType
} from 'react-native-fcm'
import { Actions } from 'react-native-router-flux'
import firebase from 'react-native-firebase';
import  { Notification } from 'react-native-firebase';
import BaseModel from '../Models/BaseModel'
import UserModel from '../Models/User'
import I18n from 'react-native-i18n'
import { registerKilledListener, registerAppListener } from "./Listeners";
// create our store
const store = createStore()

/**
 * Provides an entry point into our application.  Both index.ios.js and index.android.js
 * call this component first.
 *
 * We create our Redux store here, put it into a provider and then bring in our
 * RootContainer.
 *
 * We separate like this to play nice with React Native's hot reloading.
 */
class App extends Component {
  constructor() {
    super()

    this.state = {
      loaded: false
    }
  }

  constant = {
    'RETAILER_ACCEPT_ORDER':'Đơn hàng của bạn đã có người nhận.',
    'RETAILER_SHIP_ORDER':'Cửa hàng đang chuyển hàng cho bạn.',
    'RETAILER_DELIVERED_ORDER':'Cửa hàng đã chuyển hàng.Vui lòng xác nhận',
    'NOT_FOUND_RETAILER':'Hiện tại không có cửa hàng nào nhận đơn hàng của bạn',

  }
  async componentWillMount() {
    let b = new BaseModel()
    // let url = await b.simpleApiRequest(Constants.GET_URL)
    // global.baseUrl = url
    // console.log('BASE URL SCHEMA => ', global.baseUrl)
    AsyncStorage.getItem('locale')
      .then((locale) => {
        if (locale) {
          global.locale = locale;
        } else {
          global.locale = 'en';
        }
        this.setState({
          loaded: true,
        });
      });
  }

  async componentDidMount() {
    NetInfo.isConnected.addEventListener('change', this.handleConnectionChange)

    NetInfo.isConnected.fetch().done(isConnected => {
      this.setState({ status: isConnected })
    })
    //AppState.addEventListener('change',this.handleAppStateChange)
    await this.getToken()
  }

  handleConnectionChange = isConnected => {
    const I18n = require('react-native-i18n')
    this.setState({ status: isConnected })
    if (!this.state.status) {
      Snackbar.show({
        title: I18n.locale == 'vi' ? 'Kết nối mạng để sử dụng' : 'Please Make Sure Of Your Internet Connection',
        length: 15000,
        backgroundColor: Colors.mainColor
      })
    }
  }



  getToken = async () => {
    FCM.requestPermissions() // for iOS
    return FCM.getFCMToken()
      .then(token => {
        // console.log(token)
        console.log('FCM TOKEN => ', token)
        // store fcm token in your  console.log('FCM TOKEN => ', token)server
        global.token = token
        UserModel.deviceId = token
        return token
      })
      .then(token => {
        this.notificationListener = FCM.on(
          FCMEvent.Notification,
          async notif => {
            // there are two parts of notif. notif.notification contains the notification payload, notif.data contains data payload
            //Alert.alert(notif.body)
            FCM.presentLocalNotification({
              id: "UNIQ_ID_STRING",                               // (optional for instant notification)
              title: "EAZY SHOPPING",                     // as FCM payload
              body: this.constant[notif.body],                    // as FCM payload (required)
              sound: "default",                                   // as FCM payload
              priority: "high",                                   // as FCM payload
              click_action: "ACTION",                             // as FCM payload
              badge: 10,                                          // as FCM payload IOS only, set 0 to clear badges
              icon: "ic_launcher", 
              show_in_foreground: true,                               // as FCM payload, you can relace this with custom icon you put in mipmap
              my_custom_data: 'my_custom_field_value',             // extra data you want to throw
                                // notification when app is in foreground (local & remote)
            });
            if (notif.local_notification) {
              Actions.OrderHistoryList({processing:true})
            }

            // await someAsyncCall()

            // if (Platform.OS === 'ios') {
            //   // optional
            //   // iOS requires developers to call completionHandler to end notification process. If you do not call it your background remote notifications could be throttled, to read more about it see the above documentation link.
            //   // This library handles it for you automatically with default behavior (for remote notification, finish with NoData; for WillPresent, finish depend on "show_in_foreground"). However if you want to return different result, follow the following code to override
            //   // notif._notificationType is available for iOS platfrom
            //   switch (notif._notificationType) {
            //     case NotificationType.Remote:
            //       notif.finish(RemoteNotificationResult.NewData) // other types available: RemoteNotificationResult.NewData, RemoteNotificationResult.ResultFailed
            //       break
            //     case NotificationType.NotificationResponse:
            //       notif.finish()
            //       break
            //     case NotificationType.WillPresent:
            //       notif.finish(WillPresentNotificationResult.All) // other types available: WillPresentNotificationResult.None
            //       break
            //   }
            // }
          }
        )
        this.refreshTokenListener = FCM.on(FCMEvent.RefreshToken, token => {
          console.log(token)
          global.token
          // fcm token may not be available on first load, catch it here
        })
      })
    // console.log('FCM TOKEN => ', token)
    // store fcm token in your server
  }

  componentWillUnmount() {
    // stop listening for events
    NetInfo.isConnected.removeEventListener(
      'change',
      this.handleConnectionChange
    )
    this.notificationListener.remove()
    this.refreshTokenListener.remove()
  }

  render() {
    if (this.state.loaded) {
      const localization = require('../I18n/I18n').default;
      localization();
      const RootContainer = require('./RootContainer').default
      return (
        <Provider store={store}>
          <RootContainer />
        </Provider>
      )
    }
    return <View />
  }
}

export default App