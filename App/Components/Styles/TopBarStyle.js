import { StyleSheet, Platform } from 'react-native'
import { Metrics, Fonts,Colors } from '../../Themes'
import I18n from 'react-native-i18n'

export default StyleSheet.create({
  container: {
    height: Platform.OS === 'ios' ? 60 : 50,
    paddingTop: Platform.OS === 'ios' ? 15 : 5,
    // paddingTop:10
  },
  backImageView: { 
    height: 40, 
    width: 70,
    flexDirection: I18n.t('direction'),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
  },
  imageStyle: {
    marginLeft:5,
  },
  imageRight: {
    marginRight: I18n.locale == 'en' ? 10 : 0,
    marginLeft: I18n.locale == 'vi' ? 10 : 0,
  },
  linearGradientSearch: {
    position: 'absolute',
    top: 0,
    zIndex: 1,
    right: 0,
    height: Platform.OS == 'android' ? 50 : 60,
    width: Metrics.screenWidth ,
    backgroundColor: Colors.transparent,
    elevation: 6
  },
})
