import React from 'react'
import { ScrollView, Text, Image, View, AsyncStorage, Linking } from 'react-native'
import { Images } from '../Themes'
import Background from '../Components/BackgroundImage'
import { Actions } from 'react-native-router-flux'
import SelectLanguageStore from './SelectLanguage/SelectLanguageStore'
// Styles
import styles from './Styles/LaunchScreenStyles'

export default class LaunchScreen extends React.Component {
  constructor () {
    super()
  }

  componentDidMount () {
    const url = Linking.getInitialURL().then(url => {
      
      this.redirectUser(url)

      
    })
  }

  redirectUser = async (url) => {
    if (url) {
      console.log("url is"+url)
      var productId = url.split("eazy://")[1]
      console.log('productId from deeplink =====================> ', productId)
      SelectLanguageStore.onStartUp(productId)
    } else {
      let ChangedLanguage = await AsyncStorage.getItem('locale')
      let isOpened = await AsyncStorage.getItem('isOpened')
      if (isOpened && ChangedLanguage) {
        SelectLanguageStore.onStartUp()
      } else if (ChangedLanguage) {
        Actions.splash({ type: 'replace' })
      } else if (isOpened === 'true') {
        SelectLanguageStore.onStartUp()
      } else {
        Actions.selectlanguage({ type: 'replace' })
      }
    }
  }

  render () {
    return (
      <View style={styles.container}>
        <Image
          style={styles.image}
          source={Images.blueLogo}
          resizeMode='contain'
        />
      </View>
    )
  }
}
