import { StyleSheet, Platform, Dimensions } from 'react-native'
import { Metrics, Colors, Fonts } from '../../Themes'
var { height, width } = Dimensions.get('window');
export default StyleSheet.create({
  container: {
    alignItems: 'center',

    width: width -20,
    // alignSelf: 'center',
    borderRadius: 6,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#B3B3B3',
    marginVertical: 10,
    marginHorizontal: 5
  },
  productImage: {
    height: 130,
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'stretch',
    overflow: 'hidden'
  },
  image: {
    width: width / 2,
    height: 130,
    alignSelf: 'stretch',
    borderTopLeftRadius: Platform.OS == 'android' ? 6 : 0,
    borderTopRightRadius: Platform.OS == 'android' ? 6 : 0,
  },
  ownerView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'stretch',
    alignItems: 'center',
    minHeight: 30,
    paddingLeft: 10,
    paddingRight: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#B3B3B3',
  },
  ownerImageView: {
    position: 'absolute',
    top: 110,
    left: 5,
    zIndex: 200,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'white',
    elevation: 2
  },
  ownerImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  nameText: {
    flex: 1,
    fontFamily: 'Arial',
    ...Fonts.style.tiny,
    fontSize: 11,
    textAlign: 'left',
    color: 'black'
  },
  priceText: {
    flex: 1,
    color: 'red',
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
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignSelf: 'stretch',
    alignItems: 'center',
    
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6,
  },
  funcView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignSelf: 'stretch',
    height:100,
    alignItems: 'flex-start',
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6,
  },
  likeText: {
    color: '#076FD4',
    textAlign: 'center',
    fontSize: 14
  },
  submit:{
    marginRight:40,
    marginLeft:40,
    marginBottom: 10,
    marginTop: 10,
    padding:5,
    backgroundColor:'transparent',
    borderRadius:10,
    borderWidth: 1,
  },
  submitText:{
      color:'#fff',
      textAlign:'center',
  },
  textInput: {
    alignSelf: 'stretch',
    width: Metrics.screenWidth,
    paddingHorizontal: 15,
    paddingBottom: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#979797'

  },
  titleInputText: {
    fontFamily: 'Arial',
    fontSize: 17,
    color: 'black',
    fontWeight: '100'
  },

})
