import React from 'react'
import { View, ActivityIndicator } from 'react-native'
// import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import { Actions } from 'react-native-router-flux'
import TopBarWithoutBack from '../../Components/TopBarWithoutBack'
import Tabs from '../../Components/TabBar'
import NotificationList from '../../Components/SwipList'
import vm from './NotificationStore'
import { observer } from 'mobx-react'
import TabBar from '../../Components/TabBar'
import {

  PacmanIndicator,

} from 'react-native-indicators';
import { Colors } from '../../Themes';
// Styles
// import styles from './Styles/BlockedStyle'

@observer
export default class Notification extends React.Component {
  componentWillMount () {
    console.log('com here')
    vm.onStartUp()
  }

  render () {
    if (vm.isLoading) return         <View style={{ flex: 1 }}>
    <PacmanIndicator
       size={48}
       color={Colors.mainColor}
       style={{
         position: 'absolute',
         bottom: 270,
         alignSelf: 'center',
         minHeight: 60,
         minWidth: 60,
         borderRadius: 20,
       }}
       />
     <TabBar
       newTab = 'notification'
       showFilterModal={() => {
         Actions.popTo({ scene: 'HomeScreen' })
       }}
       goToHome={() => Actions.popTo({ scene: 'HomeScreen' })}
     />
   </View>

    return (
     
      <View style={{ flex: 1 }}>
      
        <TopBarWithoutBack title={'Thông Báo'} />
        
        <NotificationList
          notis={vm.notifications.slice()}
          buttonColor={{ backgroundColor: '#D0011B' }}
          onChatPress={() => null}
        />
       
        <TabBar
            newTab = 'notification'
        />
      </View>
    )
  }
}
