import React from 'react'
import { View, Text, Image, TouchableOpacity, TouchableWithoutFeedback,Button } from 'react-native'
import { Actions } from 'react-native-router-flux'
import styles from './Styles/AddressItemStyles'
import { Images, Colors } from '../Themes'
import { observer } from 'mobx-react'
import I18n from 'react-native-i18n'
import UserModel from '../Models/User'
import vm from '../Containers/CartScreen/CartStore'
import Swipeout from 'react-native-swipeout';
import Snackbar, {showSnackBar} from '@prince8verma/react-native-snackbar'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
@observer
export default class AddressItem extends React.Component {
  constructor (props) {
    super(props)

    this.state = {

    }
  }
  componentWillMount() {
    console.log(this.itemIndex)
  }

  btnsTypes = [
    { component:        
    <View               style={{
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
    }}>
      <Icon  name='delete' size={45} color='red'/>
    </View>,
      backgroundColor: 'transparent',
        onPress: this.deleteAddress.bind(this) 
      }
  ];

  deleteAddress(){
    try{
      let res =   UserModel.deleteAdress(this.props.addressId)
       console.log(res)
        // vm.user.addresses.slice(this.props.itemIndex,1)
        // Actions.pop()
       this.props.onDelete(this.props.itemIndex)
   }catch(e){
     console.log(e)
     showSnackBar({
       message: 'Có lỗi xảy ra.Vui lòng thử lại',
       textColor: '#FFF',      // message text color
       position: 'top',  // enum(top/bottom).
       confirmText: 'OK', // button text.
       buttonColor: '#03a9f4', // default button text color
       duration: 3000,   // (in ms), duartion for which snackbar is visible.
       animationTime: 250, // time duration in which snackbar will complete its open/close animation.
       backgroundColor:Colors.facebook, //background color for snackbar
       })
   }
  }
  render () {
    let {
      addressId,
      addressDetail,
      latitude,
      longitude,
      district,
      province,
      town,
    } = this.props
    
    return (
      <Swipeout 
      right={this.btnsTypes}
      backgroundColor='white'
      autoClose={true}
      >
      <View style={[styles.container]}>
        <TouchableOpacity
          style={styles.ownerView}
          onPress={() =>{
            vm.addressDetail = this.props.addressDetail
            vm.addressId = this.props.addressId
            console.log(this.props.addressId)
            Actions.pop()
          }}
        >

          <Text  style={styles.nameText}>
            {this.props.addressDetail}
          </Text>
  

        </TouchableOpacity>
        {/* <TouchableOpacity onPress={() => onLikeItem(this.props.index)} style={styles.likesView}> */}
      </View>
      </Swipeout>
    )
  }
}

// // Prop type warnings
// LogoImage.propTypes = {
//   someProperty: React.PropTypes.object,
//   someSetting: React.PropTypes.bool.isRequired
// }
//
// // Defaults for props
// LogoImage.defaultProps = {
//   someSetting: false
// }
