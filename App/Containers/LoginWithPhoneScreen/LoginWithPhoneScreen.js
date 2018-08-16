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
import PhoneNumberInputField from '../../Components/PhoneNumberInputField'

import Topbar from '../../Components/TopBar'
import { Images } from '../../Themes';
import { observe } from 'mobx';
import { observer } from 'mobx-react/native';
import vm from './LoginWithPhoneScreenStore'
import { Actions } from 'react-native-router-flux'
import KeyboardAwareScrollView from 'react-native-keyboard-aware-scroll-view'
import I18n from 'react-native-i18n'
import PhoneInput from 'react-native-phone-input'

// Styles
import styles from './LoginWithPhoneScreenStyle'

@observer
export default class LoginWithPhoneScreen extends React.Component {

  constructor(props) {
    super(props)
    this.state = { 
      hidden: true, 
      animated: true,
      valid: "",
      type: "",
      //value: "" 
    }

    this.updateInfo = this.updateInfo.bind(this);
    this.renderInfo = this.renderInfo.bind(this);
  }

  componentWillMount() {
    vm.clearData();
    vm.errors = {};
    vm.isLoading = false
    console.log('loading'+vm.isLoading)
  }

  updateInfo() {
    this.setState({
      valid: this.phone.isValidNumber(),
      type: this.phone.getNumberType(),
      //value: this.phone.getValue()
    });
  }

  static getDerivedStateFromProps(nextProps, prevState){
    if(nextProps.isLoading!==prevState.path){
      
      
      vm.isLoading = nextProps.isLoading 
      return {isLoading : nextProps.isLoading};
    }
    else return null;

  }

  renderInfo() {
    if (this.state.value) {
      return (
        <View style={styles.info}>
          <Text>
            Is Valid:{" "}
            <Text style={{ fontWeight: "bold" }}>
              {this.state.valid.toString()}
            </Text>
          </Text>
          <Text>
            Type: <Text style={{ fontWeight: "bold" }}>{this.state.type}</Text>
          </Text>
          <Text>
            Value:{" "}
            <Text style={{ fontWeight: "bold" }}>{this.state.value}</Text>
          </Text>
        </View>
      );
    }
  }

  onLoginNowPress = () => {
       vm.getCode();
  };
  render() {
    return (
      <View style={{ flex: 1 }}>
        <StatusBar hidden={this.state.hidden} animated={this.state.animated} />
        <Background  image={Images.mainLogin}  style={{ alignSelf: 'center',backgroundColor: Colors.mainColor }} />
        <View >
          <ScrollView >
            <Topbar
              leftImage={I18n.locale === 'vi' ? Images.chevronLeft : Images.chevronLeft}
              leftText={I18n.t('Back')}
              backgroundColor={Colors.transparent}
            />
            <View style={styles.blurView}>
              <LogoImage style={{ marginTop: 20, width: 229, height: 129 }} />
              <View style={{ marginTop: 30, marginBottom: 20, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                <View style={{ flex: 1, height: 1, borderWidth: 1, borderColor: Colors.steel }}></View>
                <Text style={styles.loginText}>{I18n.t('login')}</Text>
                <View style={{ flex: 1, height: 1, borderWidth: 1, borderColor: Colors.steel }}></View>
              </View>
              <View behavior='position' style={{ alignSelf: 'center', height: 125, paddingHorizontal: 25 }}>
                <PhoneNumberInputField
                  //phone={value}
                  onChangePhoneNumber={vm.onUserPhoneChanged}
                  keyboardType='numeric'
                />

              </View>
              {this.state.valid}
              <Button
                onPress={this.onLoginNowPress}
                loading={vm.isLoading}
                text={I18n.t('SendCode')}
                style={[styles.loginFb, { backgroundColor: 'white' }]}
                styleText={{ color: '#2A2722' }} />

            </View>
          </ScrollView>
        </View>
      </View>
    )
  }

}
