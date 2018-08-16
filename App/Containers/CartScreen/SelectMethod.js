import React, { Component } from "react"
import {
  Container,
  Text,
  Header,
  Title,
  Content,
  Button,
  Icon,
  Card,
  CardItem,
  Badge,
  List,
  ListView,
  ListItem,
  Left,
  Right,
  Body,
  Form,
  Input,
  Item,
  Label
} from "native-base";
import {
  Image,
  Dimensions,
  StyleSheet,
  View,
  TouchableOpacity,
  Platform,
  TextInputField
} from "react-native";
import TopBarWithoutBack from '../../Components/TopBarWithoutBack'
import I18n from 'react-native-i18n'
import { Colors, Images, Metrics, Fonts } from '../../Themes'
import { observer ,inject} from 'mobx-react'
import Style from "./CartScreenStyles";
import vm from './CartStore'
import TabBar from "../../Components/TabBar"
import { Actions } from 'react-native-router-flux';
import CartItems from "../../Components/CartItems";
import RNGooglePlaces from 'react-native-google-places';
import Topbar from '../../Components/TopBar'
import AddressList from '../../Components/AddressList'
import styles from '../EditProfile/EditProfileStyle'

@observer
class SelectMethod extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
        text: '',
        height: 0
    };
  }




  componentWillMount() {
    console.log(vm.user.addresses)
    
  }
  render() {
    let index=0
    return (
      
      <Container>
            <Topbar
              leftImage={Images.chevronLeft}
              leftText={I18n.t('Back')}
              title='Chọn địa chỉ'
              leftAction={()=> Actions.pop()}
              backgroundColor={Colors.mainColor}
            />
        <Content
          padder
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 40 ,  backgroundColor: 'rgba(255,255,255,0.3)'}}
        >

          <View>   

            <Card>
               <CardItem  style={{flexDirection: "column", justifyContent: "center",flex: 1, flexWrap: 'wrap'}}>
              
                <Button full bordered  onPress={()=>{
                        RNGooglePlaces.openPlacePickerModal()
                        .then((place) => {
                        console.log(place)
                        vm.addressDetail = place.address;
                        vm.lat=place.latitude
                        vm.long = place.longitude
                        }).catch(error => console.log(error.message))  
                        Actions.CartScreen()
                        }}>
                        <Text>Thủ công</Text>
                        </Button>
                                               
              </CardItem>


 
            </Card>
            <Card >

            <CardItem style={{flexDirection: "column", justifyContent: "center",flex: 1, flexWrap: 'wrap'}}>
                    <Button full bordered danger onPress={()=>{
                     RNGooglePlaces.openPlacePickerModal()
                    .then((place) => {
                    console.log(place)
                     vm.addressDetail = place.address;
                     vm.disabled = false
                     vm.lat=place.latitude
                     vm.long = place.longitude
                     vm.addressId=''
                    }).catch(error => console.log(error.message))  
                    Actions.CartScreen({disabled:vm.disabled})
                    }}>
                    <Text>Dùng bản đồ</Text>
                    </Button>

    


              </CardItem>

            </Card>
          </View>       
        </Content>      
      </Container>
    );
  
  }
}
export default SelectMethod;