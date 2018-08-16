import React, { Component } from "react";
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
  Platform
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


@observer
class CartScreen extends React.Component {

  constructor(props) {
    super(props)
  }



  componentWillMount() {
    console.log(vm.itemsInCart)
    
  }
  render() {
    let index=0
    return (
      
      <Container>

        <TopBarWithoutBack
            title={I18n.t('Cart')}
        />
        {vm.cartCount===0? <Text style={{flex:1,flexDirection:'row',textAlign: 'center',marginTop:Metrics.screenHeight/3 ,}}>Không có sản phẩm nào</Text>
        :
        <Content
          padder
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 40 ,  backgroundColor: 'rgba(255,255,255,0.3)'}}
        >

          <View style={Style.bagTopContent}>
            <View>
              <Text style={Style.textMuted}>{I18n.t('items')}{"("} {vm.cartCount}{" Sản phẩm)"}</Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <Text style={Style.textMutedLight}>{I18n.t('carttotal')}:</Text>
              <Text style={Style.price}> {vm.total}</Text>
            </View>
          </View>
          <List
            removeClippedSubviews={false}
            dataArray={vm.itemsInCart}
            renderRow={(item,rowData) =>
              <CartItems 
                index ={index++}   
                product ={item}
                quantity = {1}
              />}
          />

          <View>
            <Text style={Style.textMutedLight}>{I18n.t('priceDetails')}</Text>
            <Card>
              <ListItem style={{ marginLeft: 10 }}>
                <Left>
                  <Text style={Style.textMutedLight}>{I18n.t('carttotal')}</Text>
                </Left>
                <Right>
                  <Text style={Style.price}>{vm.total}</Text>
                </Right>
              </ListItem>
   
              <ListItem style={{ marginLeft: 10 }}>
                <Left>
                  <Text style={Style.textMutedLight}>{I18n.t('discount')}</Text>
                </Left>
                <Right>
                  <Text style={Style.price}>{vm.discount*100}{"%"}</Text>
                </Right>
              </ListItem>

              <ListItem style={{ marginLeft: 10 }}>
                <Left>
                  <Text style={Style.textMutedLight}>{I18n.t('totalpayable')}</Text>
                </Left>
                <Right>
                  <Text style={Style.price}>{vm.total-vm.total*vm.discount}</Text>
                </Right>
              </ListItem>
              <ListItem style={{ marginLeft: 10,flexDirection: 'column',justifyContent:'flex-start'}}>
              <Left>
              <Text style={ {     flex: 1,flexDirection: 'row',justifyContent: 'flex-start',fontSize: 17,color: "#555",fontWeight: "300",marginBottom: 10,marginTop: 10}}>
                  {I18n.t('chooseAddress')}
                </Text>
              </Left>
              <TouchableOpacity style={Style.pickLocationView} onPress={()=>{RNGooglePlaces.openPlacePickerModal()
                                                              .then((place) => {
                                                                console.log(place)
                                                              vm.address =place.address;
                                                              // place represents user's selection from the
                                                              // suggestions and it is a simplified Google Place object.
                                                              })
                                                              .catch(error => console.log(error.message)) }}>

                <Text style={Style.pickLocationText}>
                  {vm.address ? vm.address : I18n.t('pickAddress')}
                </Text>
                <View style={{ width: 24, height: 24, position: 'absolute', right: 3, bottom: 0 }}>
                  <Image source={Images.pickIcon} resizeMode='contain' />
                </View>
              </TouchableOpacity>
              </ListItem>
 
            </Card>
          </View>
          <Button
            primary
            block
            onPress={() => this.props.navigation.navigate("SaveAddress")}
            style={{ marginTop: 10, marginBottom: 15 }}
          >
            <Text> MUA HÀNG </Text>
          </Button>
        
       
        </Content>
        
            }

          <TabBar
            newTab = 'cart'
            showFilterModal={() => {
              Actions.popTo({ scene: 'HomeScreen' })
            }}
            goToHome={() => Actions.popTo({ scene: 'HomeScreen' })}
          />
          
      </Container>
    );
  
  }
}
export default CartScreen;