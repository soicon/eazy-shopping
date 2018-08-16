import React, { Component } from "react";
import {
  Container,
  Text,
  Header,
  Title,
  Content,
  Icon,
  Card,
  CardItem,
  Badge,
  List,

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
  ListView,
} from "react-native";
import Button from '../../Components/FullButton'
import TopBarWithoutBack from '../../Components/TopBarWithoutBack'
import I18n from 'react-native-i18n'
import TextInputField from '../../Components/TextInputField'
import { Colors, Images, Metrics, Fonts } from '../../Themes'
import { observer ,inject} from 'mobx-react'
import Style from "./CartScreenStyles";
import vm from './CartStore'
import TabBar from "../../Components/TabBar"
import { Actions } from 'react-native-router-flux';
import CartItems from "../../Components/CartItems";
import RNGooglePlaces from 'react-native-google-places';
import styles from '../EditProfile/EditProfileStyle'

const textInputStyle = { color: 'black' }


@observer
class CartScreen extends React.Component {
  
  constructor(props) {
    super(props)
    this.state={
      disabled:false,
      data :vm.itemsInCart,
      
    }
  }

  makeOrderFromScreen = () => {
    this.setState({
      disabled: true,
    });
    vm.isLoading=true
    vm.makeOrder();
    // enable after 5 second
    setTimeout(()=>{
      this.setState({
       disabled: false,
     });
     vm.isLoading=true
   }, 5000)

  }

  onDelete=(index,quantity,e)=>{
    this.setState({
      data: vm.itemsInCart
    })
    vm.changeQuantity(index,quantity)
 

    

  }
  componentWillMount() {
    console.log(vm.itemsInCart)
    
  }
  render() {
    
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
            key={this.state.data}
            removeClippedSubviews={false}
            dataArray={this.state.data}
            renderRow={(item,rowData,rowID) =>
              <CartItems 
                onDelete = {this.onDelete}
                itemIndex={rowID}
                handler = {this.handler}
                product ={item}
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
              <ListItem style={{ marginLeft: 10}}>
              <Left>
              <Text style={Style.textMutedLight}>{I18n.t('chooseAddress')}</Text>
              </Left>
              <Right  >
              <TouchableOpacity style={{marginTop:1}} onPress={()=>{Actions.AddressSelect()}}>
                <Text style={[Style.textMutedLight,{color:'red'}]}>
                  { I18n.t('pickAddress')}
                </Text>
                </TouchableOpacity>
              </Right>


              </ListItem>
              <ListItem>
              <TextInputField
                MultiLines={true}
                onChangeText={vm.onLocalChange}
                styles={[Style.textMutedLight, { height: 48 }]}
                titleStyle={Style.textMutedLight}
                containerStyle={styles.textInput}
                textInputStyle={{ borderBottomWidth: 0,padding: -10, height: 48 ,flex:1}}
                defaultValue={vm.addressDetail}
                editable={false}               
              />
              </ListItem>
              <ListItem>
               <TextInputField
                MultiLines={true}
                onChangeText={vm.onNoteChange}
                styles={[Style.textMutedLight, { height: 28 }]}
                title="Ghi chú"
                titleStyle={Style.textMutedLight}
                containerStyle={styles.textInput}
                textInputStyle={{ borderBottomWidth: 0,height: 48 ,flex:0}}
                defaultValue={vm.note}
                editable={false}               
              />
               </ListItem>
            </Card>
          </View>
          {/* <Button
            danger
            block
            
            onPress={() => vm.makeOrder()}
            style={{ marginTop: 10, marginBottom: 15 }}
          >
            <Text> MUA HÀNG </Text>
          </Button> */}
          <Button
                loading={vm.isLoading}
                disabled={this.state.disabled}
                onPress={() => this.makeOrderFromScreen()}
                text='MUA HÀNG'
                style={[Style.buy, { backgroundColor: '#b30000',height:40 ,marginTop: 10, marginBottom: 15  }]}
                styleText={{ color: 'white' }} />
       
        </Content>
        
            }

          <TabBar
            newTab = 'cart'
            showFilterModal={() => {
              Actions.popTo({ scene: 'HomeScreen' })
            }}
            goToHome={() => vm.addAddress()}
          />
          
      </Container>
    );
  
  }
}
export default CartScreen;