import { StyleSheet, Platform, Dimensions } from 'react-native'
import { Metrics, Colors, Fonts } from '../../Themes'
var { height, width } = Dimensions.get('window');
export default StyleSheet.create({
  container: {
    alignItems: 'center',
    height: 65,
    width: width-20,
    // alignSelf: 'center',
    borderRadius: 6,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#B3B3B3',
    marginVertical: 5,
    marginHorizontal: 5
  },

  nameText: {
    flex: 1,
    fontFamily: 'Helvetica-Light',
    ...Fonts.style.tiny,
    fontSize: 17,
    textAlign: 'left',
    color: 'black'
  },
  ownerView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'stretch',
    alignItems: 'center',
    minHeight: 30,
    paddingLeft: 20,
    paddingRight: 10,
    paddingTop: 10,
    // borderBottomWidth: StyleSheet.hairlineWidth,
    // borderBottomColor: '#B3B3B3',
  },
  priceText: {
    flex: 1,
    color: 'black',
    fontFamily: 'Arial',
    ...Fonts.style.small,
    textAlign: 'center'
  },
  tilteView: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignSelf: 'stretch',
    alignItems: 'center',
    height: 33,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#B3B3B3'
  },
  titleText: {
    flex: 1,
    color: 'black',
    fontFamily: 'Arial',
    fontSize: 12,
    textAlign: 'center'
  },
  likesView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignSelf: 'stretch',
    alignItems: 'center',
    height: 30,
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6,
  },
  likeText: {
    color: '#076FD4',
    textAlign: 'center',
    fontSize: 14
  }

})
