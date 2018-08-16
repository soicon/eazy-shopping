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
  Body
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
class AddressSelect extends React.Component {

  constructor(props) {
    super(props)
  }

  componentWillMount() {
    console.log(vm.user.addresses)
    vm.user.getBuyerProfile()
  }
  render() {
    let index=0
    return (
      
      <Container>
            <Topbar
              leftImage={Images.chevronLeft}
              leftText={I18n.t('Back')}
              title='Danh sách địa chỉ'
              leftAction={()=> Actions.pop()}
              backgroundColor={Colors.mainColor}
            />
        <Content
          padder
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 40 ,  backgroundColor: 'rgba(255,255,255,0.3)'}}
        >

          <View>   


              <AddressList
                items={vm.user.addresses}
              />
            {/* <Card>
              <ListItem style={{ marginLeft: 10 }}>
              <TouchableOpacity style={Style.pickLocationView} onPress={()=>Actions.LocationInput()}>
                <Left>
                  <Text style={Style.textMutedLight}>Chọn địa chỉ thủ công</Text>
                </Left>
               </TouchableOpacity>                                                 
              </ListItem>
              <ListItem style={{ marginLeft: 10,flexDirection: 'column',justifyContent:'flex-start'}}>
              <Left>
              <TouchableOpacity style={Style.pickLocationView} onPress={()=>{
                                                            RNGooglePlaces.openPlacePickerModal()
                                                              .then((place) => {
                                                                console.log(place)
                                                              vm.addressDetail = place.address;
                                                              // place represents user's selection from the
                                                              // suggestions and it is a simplified Google Place object.
                                                              })
                                                              .catch(error => console.log(error.message))  
                                                              
                                                            
                                                            }}>
                <TextInputField style={Style.textMutedLight}
                                onChangeText={vm.onLocalChange}
                                styles={[Style.textMutedLight, { height: 28 }]}
                                title='Địa chỉ chính xác'
                                titleStyle={styles.titleInputText}
                                containerStyle={styles.textInput}
                                textInputStyle={{ borderBottomWidth: 0, height: 28 }}
                                defaultValue={vm.addressDetail}
                                editable={false}
                >
                  Chọn địa chỉ trên bản đồ
                </TextInputField>


            </TouchableOpacity>
              </Left>

              </ListItem>
 
            </Card> */}

            <Body style={{flexDirection: "row", justifyContent: "center"}}>
                <Button  info
                    onPress={()=>{
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
                    }}
                >
                    <Text>Thêm mới</Text>
                </Button>
            </Body> 


          </View>


       
        </Content>
        
            


          
      </Container>
    );
  
  }
}
export default AddressSelect;