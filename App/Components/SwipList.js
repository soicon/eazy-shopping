import React from 'react'
import {
  AppRegistry,
  ListView,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  TouchableHighlight,
  View
} from 'react-native'
import styles from './Styles/SwipListStyle'
import { SwipeListView, SwipeRow } from 'react-native-swipe-list-view'
import { Actions } from 'react-native-router-flux'
import { Images } from '../Themes'
var moment = require('moment')
import Snackbar from 'react-native-snackbar'
import { Colors } from '../Themes'
import BackgroundImage from './BackgroundImage'
import Fonts from '../Themes/Fonts'

export default class SwipList extends React.Component {
  constructor (props) {
    super(props)
    this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
    this.state = {
      basic: true,
      listViewData: []
    }
  }
  componentWillMount = () => {
    this.setState({ listViewData: this.props.notis })
    console.log(' setting notis ', this.props.notis)
  }

  componentWillReceiveProps (nextProps) {
    this.setState({ listViewData: nextProps.notis })
    console.log(' setting notis ', nextProps.notis)
  }





  getDate = date => {
    if (this.props.date) {
      return 'Joined ' + moment(date).format('DD-MM-YYYY')
    }


    let _d = new Date(date)
    let joined = moment(_d * 1000).format('DD-MM-YYYY')
    return joined
  }

  render () {
    return (
      <View style={styles.container}>
        <SwipeListView
          dataSource={this.ds.cloneWithRows(this.state.listViewData)}
          enableEmptySections
          renderRow={noti => (
            <TouchableHighlight
              onPress={() => {

                  Actions.OrderHistoryList({processing:true})
                
              }}
            >
              <View style={styles.rowFront} underlayColor={'#AAA'}>
                <View style={styles.profileImageView}>
                  <Image
                    source={
                     
                           Images.notificationIconDark
                         
                    }
                    resizeMode={this.props.notification ? 'contain' : 'cover'}
                    style={

                        [styles.profileImage, { borderRadius: 0 }]
                    }
                  />
                </View>
                <View style={{ flex: 1 }}>
                  <Text
                    numberOfLines={2}
                    style={[
                      styles.followName,
                      { marginTop:7 }
                    ]}
                  >
                    {noti.content}
                  </Text>
                  <Text
                    style={[
                      styles.followName,

                        Fonts.style.normal,

                      { color: Colors.mainColor, marginTop: 5 }
                    ]}
                  >
                    {noti.date}
                  </Text>
                </View>

              </View>
            </TouchableHighlight>
          )}
          renderHiddenRow={(data, secId, rowId, rowMap) => (
            <View style={styles.rowBack}>

            </View>
          )}
          // leftOpenValue={75}
          disableRightSwipe
          rightOpenValue={-170}
        />

      </View>
    )
  }
}
