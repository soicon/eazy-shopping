import React from "react";
import { StyleSheet, Dimensions } from "react-native";
import { Colors, Images, Metrics, Fonts } from '../../Themes'
import  I18n from "react-native-i18n";
var deviceHeight = Dimensions.get("window").height;
var deviceWidth = Dimensions.get("window").width;

export default {
  container: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.3)'
  },
  bagTopContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 10,
    marginHorizontal: 5
  },
  textMuted: {
    fontSize: 15,
    color: "black",
    fontWeight: "500"
  },
  textMutedLight: {
    fontSize: 17,
    color: "black",
    fontWeight: "300"
  },
  discountedText: {
    fontSize: 13,
    fontWeight: "300",
    color: Colors.mainColor,
    marginLeft: 2
  },
  price: {
    fontSize: 17,
    fontWeight: "600",
    color: "red"
  },
  tabsView: {
    // flex: 1,

    paddingBottom: 0,
    // backgroundColor: 'red',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#C5C5C5'
  },
  pickLocationView: {
    width: 300,
    minHeight: 25,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#AAAAAA',
    marginTop: 24,
    paddingHorizontal: 2,
    flexDirection: I18n.t('direction')
  },
  pickLocationText: {
    minHeight: 20,
    color: 'black',
    backgroundColor: Colors.transparent,
    ...Fonts.style.input,
    maxWidth:280,
    textAlign:'left'
  },
    error: {
    ...Fonts.style.small,
    color: Colors.error,
    backgroundColor: Colors.transparent,
    textAlign:'left'
  },
  buy: {
    marginTop: 40,
    marginHorizontal: 60,
    borderWidth: 1,
    borderColor: 'white',
    backgroundColor: Colors.transparent,
    borderRadius: 6
  }
};