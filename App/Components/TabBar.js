/**
 * Created by Devsteam.mobi on 11/21/16.
 */
import React from 'react'
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Platform,
  Alert
} from 'react-native'
import PropTypes from 'prop-types';
import { Actions } from 'react-native-router-flux'
import Icon from 'react-native-vector-icons/FontAwesome'
import { Colors, Fonts, Images } from '../Themes'
import I18n from 'react-native-i18n'
import BottomNavigation,{
  IconTab
} from 'react-native-material-bottom-navigation'

class TabBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activeTab: this.props.newTab
    };
  }

  static propTypes = {
    goToPage: PropTypes.func,
    activeTab: PropTypes.number,
    tabs: PropTypes.array
  }
  tabs = [
    {
      key: 'home',
      icon: 'home',
      label: I18n.t('Home'),
      barColor: '#FFFFFF',
      pressColor: Colors.mainColor
    },
    {
      key: 'cart',
      icon: 'cart-arrow-down',
      label: I18n.t('Cart'),
      barColor: '#FFFFFF',
      pressColor: Colors.mainColor
    },
    {
      key: 'notification',
      icon: 'bell',
      label: I18n.t('notification'),
      barColor: '#FFFFFF',
      pressColor: Colors.mainColor
    },
    {
      key: 'profile',
      icon: 'user-circle',
      label: I18n.t('Profile'),
      barColor: '#FFFFFF',
      pressColor: Colors.mainColor
    },
    {
      key: 'history',
      icon: 'history',
      label: I18n.t('history'),
      barColor: '#FFFFFF',
      pressColor: Colors.mainColor
    }
  ]


  getIcon(index) {
    switch (index) {
      case 0:
        return this.props.activeTab == 0 ? Images.home : Images.home
      case 1:
        return this.props.activeTab == 1 ? Images.filtter : Images.filtter
      case 2:
        return this.props.activeTab == 2 ? Images.centerMenu : Images.centerMenu
      case 3:
        return this.props.activeTab == 3
          ? Images.conversation
          : Images.conversation
      case 4:
        return this.props.activeTab == 4
          ? Images.profileIcon
          : Images.profileIcon
    }
  }
  renderIcon = icon => ({ isActive }) => (
    <Icon size={24} 
    color={isActive ? Colors.mainColor:'gray'} 
    name={icon} />
  )

  handleTabPress = (newTab, oldTab) => {
    if (newTab.key == "home"){
      Actions.HomeScreen({ type: 'replace'})
      

    }
    else if (newTab.key == "cart"){

      Actions.CartScreen({ type: 'replace' })
     

    }
    else if (newTab.key == "notification"){

      Actions.NotificationScreen({ type: 'replace' })
    }
    else if (newTab.key == "profile"){

      Actions.BuyerProfile({ type: 'replace' })
      

    }
    else if (newTab.key == "history"){

      Actions.OrderHistoryList({ type: 'replace',completed:true })
    }
  }

  renderTab = ({ tab, isActive }) => (
    <IconTab
      isActive={isActive}
      key={tab.key}
      label={tab.label}
      labelStyle={{color:isActive ? Colors.mainColor:'gray',fontSize: 10 }}
      renderIcon={this.renderIcon(tab.icon)}
     
    />
  )
  // todo this.props.goToPage(0)
  render() {
    return (
      
      <View style={{ position: 'absolute', bottom: 0, left: 0, right: 0 }}>
        <BottomNavigation
          onTabPress={this.handleTabPress}
          renderTab={this.renderTab}
          activeTab={this.state.activeTab}
          tabs={this.tabs}
          useLayoutAnimation
          />
          {/* <TouchableOpacity onPress={() => Actions.AddPost()}>
            <Image source={Images.centerMenu} resizeMode='cover' />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={this.props.showFilterModal}
            // onPress={() => {}}
            style={{
              width: 25,
              height: 25,
              position: 'absolute',
              zIndex: 6,
              left: 0,
              top: 14
            }}
          />

          <TouchableOpacity
            // onPress={() => {}}
            onPress={Actions.Conversations}
            style={{
              width: 25,
              height: 25,
              position: 'absolute',
              zIndex: 6,
              right: 0,
              top: 14
            }}
          /> */}
      
        

      </View>
    )
  }
}

const styles = StyleSheet.create({
  tab: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 4
  },
  tabs: {
    height: 48,
    flexDirection: 'row',
    paddingTop: 0,
    borderWidth: 1,
    borderTopWidth: 1,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderBottomColor: 'rgba(0,0,0,0.05)',
    borderTopColor: 'rgba(0,0,0,0.3)',
    backgroundColor: '#E4E4E4',
    justifyContent: 'space-between'
  },
  tabContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8
  },
  image: {
    height: 28,
    width: 28
  },
  dualTabContainer: {
    flexDirection: 'row',
    width: 100,
    justifyContent: 'space-around',
    backgroundColor: '#E4E4E4'
  },
  centerView: {
    zIndex: 5,
    elevation: 0.5,
    height: 72,
    width: 200,
    position: 'absolute',
    bottom: Platform.OS == 'ios' ? -10 : -10,
    alignSelf: 'center',
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center'
  }
})

export default TabBar