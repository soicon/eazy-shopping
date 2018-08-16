import React from 'react'
import {
  ScrollView,
  Text,
  AsyncStorage,
  View,
  TouchableOpacity,
  ActivityIndicator

} from 'react-native'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import TopBarWithoutBack from '../../Components/TopBarWithoutBack'
import Tabs from '../../Components/TabBar'
import { Switch } from '../../Components/Switch'
// Styles
import styles from './OtherStyle'
import { Colors, Images } from '../../Themes'
import { Actions } from 'react-native-router-flux'
import vm from './OtherStore'
import I18n from 'react-native-i18n'
import RNRestart from 'react-native-restart'
import {observer} from 'mobx-react'
import ConfirmationPopUp from '../../Components/ConfirmationPopUP'
import TabBar from '../../Components/TabBar'

@observer
class Other extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      showPopUp: false
    }
   // vm.onStartUp()
  }

  changeLanguage = () => {
    this.hidePopUp()
    AsyncStorage.setItem('locale', I18n.locale == 'en' ? 'vi' : 'en')
      .then(() => {
        RNRestart.Restart()
      })
      .catch(console.log)
  };

  showPopUp = () => {
    this.setState({
      showPopUp: true
    })
  }

  hidePopUp = () => {
    this.setState({
      showPopUp: false
    })
  }

  render () {
    if (vm.isLoading) return <ActivityIndicator style={{ flex: 1 }} size='large' />
    return (
      <View style={{ flex: 1,paddingBottom: 50}}>
        <ConfirmationPopUp
          
          showConfirmationModal={this.state.showPopUp}
          confirmationTitle={I18n.t('Hint')}
          confirmationMessage={I18n.t('RestartHint')}
          closeConfirmationModal={this.hidePopUp}
          confirmAction={() => {
            this.changeLanguage()
          }}
        />
        <TopBarWithoutBack
          title={I18n.t('Settings')}
        />
        <ScrollView style={styles.container}>

          <TouchableOpacity style={styles.rowView}>
            <Text style={styles.text}>
              {I18n.t('notifications')}
            </Text>
            <Switch
              value={vm.notif == true ? true : false}
              /* onValueChange={vm.setIsFeatured} */
              onValueChange={vm.onNotifChanged}
              disabled={false}
              activeText={''}
              inActiveText={''}
              backgroundActive={Colors.silver}
              backgroundInactive={Colors.silver}
              circleActiveColor={Colors.darkGray}
              circleInActiveColor={Colors.steel}
            />
          </TouchableOpacity>

          <TouchableOpacity onPress={Actions.Terms} style={styles.rowView}>
            <Text style={styles.text}>
              {I18n.t('termsCondition')}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={Actions.Privacy} style={styles.rowView}>
            <Text style={styles.text}>
              {I18n.t('privacy')}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={Actions.Help} style={styles.rowView}>
            <Text style={styles.text}>
              {I18n.t('Help')}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={Actions.ContactUs} style={styles.rowView}>
            <Text style={styles.text}>
              {I18n.t('ContactUs')}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.rowView}
            onPress={() => this.showPopUp()}
          >
            <Text style={styles.text}>
              {I18n.locale == 'vi' ? 'Tiếng Anh' : 'Vietnamese'}
            </Text>
          </TouchableOpacity>
        </ScrollView>
        <TabBar
            newTab = 'more'
        />
      </View>
    )
  }
}

const mapStateToProps = state => {
  return {}
}

const mapDispatchToProps = dispatch => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(Other)
