import React from 'react'
import { View, Text, Image, TouchableOpacity,Platform ,Animated} from 'react-native'
import I18n from 'react-native-i18n'
import { Actions } from 'react-native-router-flux'
import styles from './Styles/TopBarStyle'
import Icon from 'react-native-vector-icons/MaterialIcons'
import LinearGradient from 'react-native-linear-gradient'
import { Metrics, Fonts, Colors, Images } from '../Themes'


export default class TopBarWithoutBack extends React.Component {

  render() {
    return (
      <View style={[styles.container, this.props.style, { backgroundColor: this.props.backgroundColor ? this.props.backgroundColor : Colors.mainColor }]}>
        <View style={{ flex: 1, marginHorizontal: 5 }}>
          <View style={{ flexDirection: I18n.t('direction'), justifyContent: 'space-between', alignItems: 'center' }}>


            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', alignSelf: 'center' }}>
              <Text style={{ ...Fonts.style.h5, color: 'white', textAlign: 'center' ,marginTop: 10 }}>
                {this.props.title}
              </Text>
            </View>



          </View>

        </View>

      </View>
    )
  }
}


