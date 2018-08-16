import React, { Component } from 'react'
import { Platform } from 'react-native'
import { Scene, Router } from 'react-native-router-flux'
import Styles from './Styles/NavigationContainerStyles'
import NavigationDrawer from './NavigationDrawer'
import Splash from '../Components/Splash'
// screens identified by the router
import LaunchScreen from '../Containers/LaunchScreen'
import MainLoginScreen from '../Containers/MainLoginScreen' 
import LoginWithPhoneScreen from '../Containers/LoginWithPhoneScreen' 
import ActivationCodeScreen from '../Containers/ActivationCodeScreen'




import OrderHistoryList from '../Components/OrderHistoryList'
import SelectLanguage from '../Containers/SelectLanguage' 
import ProductList from '../Components/ProductList'
import CartScreen from '../Containers/CartScreen'
import HomeScreen from '../Containers/HomeScreen'
import SubCategory from '../Containers/HomeScreen/SubCategory'
import OrderScreen from '../Containers/OrderScreen'
import ProductDetails from '../Containers/ProductDetails'
import OtherScreen from '../Containers/Others'

import AddressSelect from '../Containers/CartScreen/AddressSelect' 
import BuyerProfile from '../Containers/BuyerProfile'
import EditProfile from '../Containers/EditProfile'
import Settings from '../Containers/Settings' 

import Filter from '../Containers/Filter' 

import Terms from '../Containers/Terms-Privacy-Help/Terms'
import Privacy from '../Containers/Terms-Privacy-Help/Privacy'
import Help from '../Containers/Terms-Privacy-Help/Help'
import ContactUs from '../Containers/ContactUs'
import Upgrade from '../Containers/UpgradeSubscribe'



import BankTransfer from '../Containers/UpgradeSubscribe/BankTransfer'
import BasicPackage from '../Containers/UpgradeSubscribe/BasicPackage'

import NotificationScreen from '../Containers/NotificationsScreen'
import ContactStatusList from '../Containers/ContactUs/ContactUsList'
import PostStatus from '../Containers/ProductDetails/PostStatus'
import ViewAllList from '../Containers/ViewAllItems/ViewAllItemsList'
import SelectMethod from '../Containers/CartScreen/SelectMethod'
/* **************************
* Documentation: https://github.com/aksonov/react-native-router-flux
***************************/

const SceneWrapper = props =>
  Platform.OS === 'android'
    ? <Scene {...props} panHandlers={null} />
    : <Scene {...props} />

class NavigationRouter extends Component {
  render () {
    return (
      <Router>
        <SceneWrapper key='drawer' component={NavigationDrawer} open={true}>
          <SceneWrapper
            key='drawerChildrenWrapper'
            navigationBarStyle={Styles.navBar}
            titleStyle={Styles.title}
            leftButtonIconStyle={Styles.leftButton}
            rightButtonTextStyle={Styles.rightButton}
          >
            <SceneWrapper
              initial
              key='launchScreen'
              component={LaunchScreen}
              title='LaunchScreen'
              hideNavBar
            />
            <SceneWrapper
              key='selectlanguage'
              component={SelectLanguage}
              title='SelectLanguage'
              hideNavBar
            />

            
            <SceneWrapper
              key='splash'
              component={Splash}
              title='Splash'
              hideNavBar
            />
            <SceneWrapper
              key='mainlogin'
              component={MainLoginScreen}
              title='MainLogin'
              hideNavBar
              hideTabBar
            />
            <SceneWrapper
              key='LoginWithPhoneScreen'
              component={LoginWithPhoneScreen}
              title='LoginWithPhoneScreen'
              hideNavBar
              hideTabBar
            />
            <SceneWrapper
              key='ActivationCodeScreen'
              component={ActivationCodeScreen}
              title='ActivationCodeScreen'
              hideNavBar
              hideTabBar
            />

             <SceneWrapper
              key='SubCategory'
              component={SubCategory}
              title='SubCategory'
              hideNavBar
            />
            <SceneWrapper
              key='OrderHistoryList'
              component={OrderHistoryList}
              title='OrderHistoryList'
              hideNavBar
            />

            <SceneWrapper
              key='SelectMethod'
              component={SelectMethod}
              title='SelectMethod'
              hideNavBar
            />

            <SceneWrapper
              key='OtherScreen'
              component={OtherScreen}
              title='OtherScreen'
              hideNavBar
            />

            <SceneWrapper
              key='ProductList'
              component={ProductList}
              title='ProductList'
              hideNavBar
            />

            <SceneWrapper
              key='AddressSelect'
              component={AddressSelect}
              title='AddressSelect'
              hideNavBar
            />
            <SceneWrapper
              key='HomeScreen'
              component={HomeScreen}
              title='HomeScreen'
              hideNavBar
              panHandlers={null}
            />
            
            <SceneWrapper
              key='OrderScreen'
              component={OrderScreen}
              title='OrderScreen'
              tab={true}
              hideNavBar
            />
            <SceneWrapper
              key='ProductDetails'
              component={ProductDetails}
              title='ProductDetails'
              hideNavBar
            />
            <SceneWrapper
              key='BuyerProfile'
              component={BuyerProfile}
              title='BuyerProfile'
              hideNavBar
            />
            <SceneWrapper
              key='editProfile'
              component={EditProfile}
              title='EditProfile'
              hideNavBar
            />

            <SceneWrapper
              key='Settings'
              component={Settings}
              title='Settings'
              hideNavBar
            />



            <SceneWrapper
              key='Filter'
              component={Filter}
              title='Filter'
              hideNavBar
            />

            <SceneWrapper
              key='Terms'
              component={Terms}
              title='Terms'
              hideNavBar
            />
            <SceneWrapper
              key='Privacy'
              component={Privacy}
              title='Privacy'
              hideNavBar
            />
            <SceneWrapper key='Help' component={Help} title='Help' hideNavBar />
            <SceneWrapper
              key='ContactUs'
              component={ContactUs}
              title='ContactUs'
              hideNavBar
            />
            <SceneWrapper
              key='Upgrade'
              component={Upgrade}
              title='Upgrade'
              hideNavBar
            />




            <SceneWrapper
              key='BankTransfer'
              component={BankTransfer}
              title='BankTransfer'
              hideNavBar
            />
            <SceneWrapper
              key='BasicPackage'
              component={BasicPackage}
              title='BasicPackage'
              hideNavBar
            />


            <SceneWrapper
              key='NotificationScreen'
              component={NotificationScreen}
              title='NotificationScreen'
              hideNavBar
            />
            <SceneWrapper
              key='ContactStatusList'
              component={ContactStatusList}
              title='ContactStatusList'
              hideNavBar
            />

            <SceneWrapper
              key='ViewAllList'
              component={ViewAllList}
              title='ViewAllList'
              hideNavBar
            />
            <SceneWrapper
              key='CartScreen'
              component={CartScreen}
              title='CartScreen'
              hideNavBar
            />

          </SceneWrapper>
        </SceneWrapper>
      </Router>
    )
  }
}

export default NavigationRouter
