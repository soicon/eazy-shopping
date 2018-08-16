import React from 'react'
import {
  ScrollView,
  Text,
  StatusBar,
  View,
  Image,
  ActivityIndicator,
  AsyncStorage
} from 'react-native'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import { Images } from '../../Themes'
import Background from '../../Components/BackgroundImage'
import LogoImage from '../../Components/LogoImage'
import { Actions } from 'react-native-router-flux'
import Button from '../../Components/FullButton'
import vm from './SelectLanguageStore'
import I18n from 'react-native-i18n'
// Styles
import styles from './SelectLanguageStyle'
import RNRestart from 'react-native-restart'

class SelectLanguage extends React.Component {
  constructor (props) {
    super(props)
    this.state = { hidden: true, animated: true }
  }

  changeLanguage = () => {
    AsyncStorage.setItem('locale', I18n.locale == 'en' ? 'en' : 'vi')
      .then(() => {
        Actions.splash({ type: 'replace' })
        RNRestart.Restart()
      })
      .catch(console.log)
  }

  selectPress = () => {}

  render () {
    return (
      <View style={{ flex: 1 }}>
        <StatusBar hidden={this.state.hidden} animated={this.state.animated} />
        <Background image={Images.langBg} />
        <View style={styles.blurView}>
          <LogoImage style={{ marginVertical: 20 }} />
          <View style={styles.newView} onPress={this.onCreateNewAccountPress}>
            <Text style={styles.textCreat}>Chào Mừng Tới</Text>
            <Text style={styles.textNew}> Eazy</Text>
            
          </View>
          <Image source={Images.language} resizeMode='cover' />
          <Text style={[styles.textCreat, { marginTop: 10, marginBottom: 35 }]}>
           Chọn Ngôn Ngữ
          </Text>
          <View style={styles.twoButton}>
            <Button
              onPress={vm.onVietnamesePress}
              text='Tiếng Việt'
              style={[styles.langBt, { borderColor: 'white' }]}
              styleText={{ color: 'white' }}
            />
            <Button
              onPress={vm.onEnglishPress}
              text='Tiếng Anh'
              style={[styles.langBt, { backgroundColor: 'white' }]}
              styleText={{ color: '#3A3A3A' }}
            />
          </View>
        </View>
      </View>
    )
  }
}

export default SelectLanguage
