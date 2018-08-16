import React, { Component } from 'react'
import { View, StatusBar,AsyncStorage } from 'react-native'
import NavigationRouter from '../Navigation/NavigationRouter'
import { connect } from 'react-redux'
import StartupActions from '../Redux/StartupRedux'
import ReduxPersist from '../Config/ReduxPersist'
import TabBar from '../Components/TabBar'
import Snackbar from '@prince8verma/react-native-snackbar';
import vm from './ActivationCodeScreen/ActivationCodeScreenStore'
// Styles
import styles from './Styles/RootContainerStyles'

class RootContainer extends Component {
  constructor (props) {
    super(props)
    this.state = {
      display: false
    }
   // vm.onStartUp()
  }
  componentDidMount () {
    // if redux persist is not active fire startup action
    if (!ReduxPersist.active) {
      this.props.startup()
    }

  }

  render () {
    if(AsyncStorage.getItem('user')==null){
      console.log("setting state")
      
    }
    return (
      
      <View style={styles.applicationView}>

        <StatusBar barStyle='light-content' backgroundColor="#003CD5" />
        <NavigationRouter />
        <Snackbar id={"Eazy"}/>

      </View>
      
    
    )
  }
}

// wraps dispatch to create nicer functions to call within our component
const mapDispatchToProps = (dispatch) => ({
  startup: () => dispatch(StartupActions.startup())
})

export default connect(null, mapDispatchToProps)(RootContainer)
