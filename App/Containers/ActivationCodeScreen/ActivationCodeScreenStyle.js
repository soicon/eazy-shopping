import { StyleSheet } from 'react-native'
import { ApplicationStyles, Colors, Fonts } from '../../Themes'
import I18n from 'react-native-i18n'

export default StyleSheet.create({
  blurView: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  loginFb: {
    marginTop: 40,
    marginHorizontal: 60,
    borderWidth: 1,
    borderColor: 'white',
    backgroundColor: Colors.transparent,
    borderRadius: 6
  },

  resendCode: {
    marginTop: 80,
    marginHorizontal: 40,
    borderWidth: 1,
    borderColor: 'white',
    backgroundColor: Colors.transparent,
    borderRadius: 6
  },
  loginText: {
    color: '#FFFFFF',
    ...Fonts.style.normal,
    backgroundColor: Colors.transparent,
    width: 250,
    alignSelf: 'center',
    marginHorizontal: 5,
    textAlign: 'center'
  },

  activeCodeText: {
    color: '#FFFFFF',
    ...Fonts.style.normal,
    backgroundColor: Colors.transparent,
    width: 200,
    alignSelf: 'center',
    marginHorizontal: 5,
    textAlign: 'center'
  },
  forgotText: {
    color: 'white',
    ...Fonts.style.description,
    // alignSelf: 'flex-end',
    backgroundColor: Colors.transparent,
    textAlign: I18n.t('textAlignError'),
    flex: 1,
    alignSelf: 'stretch',
  },
  createText: {
    ...Fonts.style.normal,
    fontWeight: '100',
    color: Colors.frost,
    backgroundColor: Colors.transparent,
  },
  accountNowText: {
    ...Fonts.style.normal,
    color: 'white',
    fontWeight: '900',
    backgroundColor: Colors.transparent,
  }
})
