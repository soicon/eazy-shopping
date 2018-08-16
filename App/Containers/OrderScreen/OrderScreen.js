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
import TopBar from '../../Components/TopBar'
import I18n from 'react-native-i18n'
import TextInputField from '../../Components/TextInputField'
import { Colors, Images, Metrics, Fonts } from '../../Themes'
import { observer ,inject} from 'mobx-react'
import Style from "./OrderScreenStyle";
import vm from './OrderStore'
import TabBar from "../../Components/TabBar"
import { Actions } from 'react-native-router-flux';
import CartItems from "../../Components/CartItems";
import RNGooglePlaces from 'react-native-google-places';
import styles from '../EditProfile/EditProfileStyle'
import { Rating, FormLabel, FormInput } from 'react-native-elements';
const textInputStyle = { color: 'black' }


@observer
class CartScreen extends React.Component {

  constructor(props) {
    super(props)
    this.state={
      disabled:vm.disabled
    }
  }

  contants = [
    {des:'',color:'white'},
    {des:'Đang tìm',color:'limegreen'},
    {des:'Đã nhận',color:'green'},
    {des:'Đang vận chuyển',color:'deeppink'},
    {des:'Đã vận chuyển',color:'yellowgreen'},
    {des:'Đã nhận hàng',color:'orange'},
    {des:'Kết thúc',color:'orchid'},
    {des:'Không tìm thấy',color:'brown'},
    {des:'Huỷ đơn hàng',color:'red'}
  ]


  componentWillMount() {
    console.log(vm.itemsInCart)
    
  }
  render() {
    let index=0
    return (
      
      <Container>

        <TopBar
          leftImage={Images.chevronLeft}
          leftText={I18n.t('Back')}
          title='Chi tiết đơn hàng'
          leftAction={()=>Actions.pop()}
        />

        <Content
          padder
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 40 ,  backgroundColor: 'rgba(255,255,255,0.3)'}}
        >

          <View style={Style.bagTopContent}>
            <View>
              <Text style={[Style.textMuted,{color:'red'}]}>Mã đơn hàng: {this.props.orderCode}</Text>
            </View>

          </View>
          <View style={{ flexDirection: "row" }}>
              {console.log(this.props.status)}
              <Text style={[Style.textMutedLight,{color:'green'}]}>Trạng thái:  {this.contants[this.props.status?this.props.status:0].des}  </Text>
             
            </View>
          <List
            removeClippedSubviews={false}
            dataArray={this.props.orderLines}
            renderRow={(item,rowData) =>
              <CartItems
                completed
                index ={index++}   
                product ={item.product}
                quantity = {item.amount}
              />}
          />

          <View>
            <Text style={Style.textMutedLight}>{I18n.t('priceDetails')}</Text>
            <Card>

   


              <ListItem style={{ marginLeft: 10 }}>
                <Left>
                  <Text style={Style.textMutedLight}>{I18n.t('totalpayable')}</Text>
                </Left>
                <Right>
                  <Text style={[Style.price,{color:'red'}]}>{this.props.totalPrice} đ</Text>
                </Right>
              </ListItem>
              <ListItem style={{ marginLeft: 10}}>
              <Left>
              <Text style={Style.textMutedLight}>{I18n.t('chooseAddress')}</Text>
              </Left>
              </ListItem>
              <ListItem>
                <Text
                  style={[Style.textMutedLight, { height: 48 }]}              
                >
                {this.props.shippingAddress.addressDetail}
                </Text>
              </ListItem>

              <ListItem style={{ marginLeft: 10}}>
              <Left>
              <Text style={Style.textMutedLight}>Ghi chú</Text>
              </Left>
              </ListItem>

              <ListItem>
              <Text
                  style={[Style.textMutedLight, { height: 48 }]}              
                >
                {this.props.note}
                </Text>
               </ListItem>
               <ListItem>
                 {this.props.feedbacks[0]?
              <View style={{flex:1,alignContent:'center',alignItems:'center'}}>
              <Text style={{...Fonts.style.h3,textAlign:'center'}}>Đánh giá dịch vụ</Text>
              <Rating
                showRating
                type="star"
                fractions={1}
                startingValue={this.props.feedbacks[0].rating}
                readonly
                imageSize={40}
                onFinishRating={(rating)=>this.setState({rating})}
                style={{ paddingVertical: 10 ,alignItems: 'center',}}
              />
              <FormLabel>Ý kiến đóng góp</FormLabel>
              <Text>
                {this.props.feedbacks[0].comment}
              </Text>


            </View>
            :null}
            </ListItem>
            </Card>
          </View>
       
       
        </Content>
        
            


          
      </Container>
    );
  
  }
}
export default CartScreen;