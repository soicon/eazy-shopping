import React from 'react'
import { ScrollView, ActivityIndicator, Text, KeyboardAvoidingView, Image, View, TouchableOpacity, StyleSheet,ImageBackground } from 'react-native'
import { Images, Colors } from '../../Themes'
import TopBar from '../../Components/TopBar'
import TextInputField from '../../Components/TextInputField'
import Button from '../../Components/FullButton'
import { Actions } from 'react-native-router-flux'
import { photoSelector } from '../../Utils/photoSelector'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './EditProfileStyle'
import { observer } from 'mobx-react'
import vm from './EditProfileStore'
import I18n from 'react-native-i18n'
import BuyerProfile from '../BuyerProfile';
const textInputStyle = { color: '#7B7B7B' }

@observer
export default class EditProfile extends React.Component {
  constructor(props) {
    super(props)
  }
  componentWillMount() {
    vm.onStartUp()
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.reload) this.setState({})
  }

  renderTextInputsView = () => {
    //if (vm.isLoading) return <View style={{ flex: 1 }}><ActivityIndicator style={{ flex: 1 }} size='large' /></View>
    //console.log(vm.user.newAddress)
    return (
      <KeyboardAvoidingView behavior='position' style={{ alignItems: 'center', justifyContent: 'center', alignSelf: 'stretch' }}>
        <TextInputField
          onChangeText={vm.onFirstNameChange}
          styles={textInputStyle}
          title={I18n.t('firstName')}
          titleStyle={styles.titleInputText}
          containerStyle={styles.textInput}
          textInputStyle={{ borderBottomWidth: 0 }}
          defaultValue={vm.user.name}
        // onChangeText={vm.onFirstNameChange}
        // error={vm.errors}
        // errorMessage={vm.errors.errors ? vm.errors.errors.first_name : ''}
        />
        <TextInputField
          onChangeText={vm.onMobileChange}
          styles={[textInputStyle, { height: 20 }]}
          title={I18n.t('email')}
          titleStyle={styles.titleInputText}
          containerStyle={styles.textInput}
          textInputStyle={{ borderBottomWidth: 0, height: 28 }}
          defaultValue={vm.user.mobile}
          editable={false}
          // onChangeText={vm.onmMobileChange}
          // error={vm.errors}
          // errorMessage={vm.errors.errors ? vm.errors.errors.mobile : ''}
          keyboardType='numeric'
        />

      </KeyboardAvoidingView>
    )
  }

  openPhotoSelect = () => {
    photoSelector()
      .then((image) => {
        vm.photo = image
      })
  }

  render() {
    let pic = null
    if (vm.photo && vm.photo.uri) pic = { uri: vm.photo.uri }
    else if (vm.user.picture) pic = { uri: vm.user.picture }
    else pic = Images.addPhoto

    return (
      <View>
        <TopBar
          leftImage={Images.chevronLeft}
          leftText={I18n.t('Back')}
          title={I18n.t('editProfile')}
          rightText={I18n.t('save')}
          rightAction={() => vm.updateBuyerProfile()}
          leftAction={()=>Actions.pop()}
        />
        <ScrollView style={styles.container}>
          {/* Image profile */}
          <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 20, marginBottom: 150 }}>
            {/* Change Password */}

            <View style={styles.profileInfo}>
              <Text style={{ color: 'white', fontSize: 17 }}> {I18n.t('ProfileInfo')} </Text>
            </View>
            <View style={{ alignItems: 'center', justifyContent: 'center', alignSelf: 'stretch' }}>
              {this.renderTextInputsView()}
            </View>



          </View>
        </ScrollView>

      </View>
    )
  }

}

