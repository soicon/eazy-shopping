import { StyleSheet, Platform } from 'react-native'
import { ApplicationStyles, Metrics, Colors, Fonts } from '../../Themes'

export default StyleSheet.create({
  tabScrollView: {
    height: Platform.OS == 'android' ? 50 : 50,
    alignSelf: 'center',
    backgroundColor: Colors.mainColor,
    marginHorizontal: 40,
    // width: Metrics.screenWidth,
    // justifyContent: 'center',
    flex: 1
  },
  mainView: {
    justifyContent: 'center',
    flex :1
  },
  tab: {
    // width: 160,
    height: Platform.OS == 'android' ? 50 : 80,
    backgroundColor: Colors.mainColor,
    // marginHorizontal: 20,
    justifyContent: 'center'
  },
  tabText: {
    ...Fonts.style.h6
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
  linearGradient: {
    position: 'absolute',
    top: 0,
    zIndex: 1,
    left: 0,
    width: Metrics.screenWidth/3 ,
    height: Platform.OS == 'android' ? 50 : 80,
    backgroundColor: Colors.transparent,
    elevation: 6,
    // padding: 10,
    right: 0
  },
  image: {
    backgroundColor: Colors.mainColor
    // width: 30,
    // height: 50,
    // alignSelf: 'stretch'    // margin: 10
  },
  notifyImage: {
    paddingHorizontal: 0,
    paddingVertical: Platform.OS == 'android' ? 10 : 30,
    width: Metrics.screenWidth / 3,
    alignSelf: 'center',
    justifyContent: 'center'
    // marginBottom:15
  },
  searchImage: {
    paddingHorizontal: 20,
    paddingVertical: Platform.OS == 'android' ? 10 : 30,
    width: -Metrics.screenWidth ,
    alignSelf: 'stretch',
    justifyContent: 'center',
    alignItems: 'flex-end'
  },
  slideView: {
    backgroundColor: '#f2f2f2'
  },
  mainCategoryView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop:10,
    backgroundColor: '#f2f2f2'
  },
  productView: {
    marginBottom: 50,
    backgroundColor: 'white',
  },
  categoryNameView: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width:Metrics.screenWidth/4
  },
  categoryNameText: {
    ...Fonts.style.small,
    marginTop: 10,
    textAlign: 'center'
  },
  splitView: {
    // marginTop: 10, 
    // backgroundColor: 'red', 
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemContainer: {
    flex:1,
    justifyContent: 'center',

    borderRadius: 5,
    padding: 0,
    height: 150,
    backgroundColor:'white',
    marginBottom:10
    
  },
  itemName: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '600',
    ...Fonts.style.normal
  },
  itemCode: {
    fontWeight: '600',
    fontSize: 12,
    color: '#fff',
  },
})
