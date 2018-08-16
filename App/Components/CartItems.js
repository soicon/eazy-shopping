import React, { Component } from "react";
import {
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  TouchableHighlight,
  StyleSheet,
  Text
} from "react-native";
import {
  Card,
  CardItem,
  Button,
  Icon,
  Thumbnail,
  Grid,
  Col,
  Style
} from "native-base";
import { observer, inject } from "mobx-react/native";
var deviceWidth = Dimensions.get("window").width;
var deviceHeight = Dimensions.get("window").height;
import { Colors, Images, Metrics, Fonts } from '../Themes'
import IconMI from "react-native-vector-icons/MaterialIcons";
import vm from '../Containers/CartScreen/CartStore'
import NumericInput from 'react-native-numeric-input'
import { stringify } from "querystring";

class CartItems extends Component {
  constructor(props) {
    super(props)
    this.state={
      quantity: this.props.product.quantity,
      total:this.props.quantity*this.props.product.price
    }
  }
  componentDidMount = () => {
    this.props.product.quantity = this.state.quantity

    this.calculate()
  };

  componentWillMount(){
    this.setState({quantity:this.props.product.quantity})
    this.setState({total:this.props.product.quantity*this.props.product.price})
  }

  calculate(){
    vm.calculateTotal()
  }
  
  _delete(index) {
    vm.itemsInCart.splice(index, 1)// This will remove the element at index, and update this.items with new array
    
    this.calculate()

  }
  onChangeState(){
    this.props.onDelete(this.props.itemIndex,this.state.quantity)
  }
  render() {
    // var imageSource = require("../../../assets/images/saleThumb1.png");
    var thumbWidth = deviceWidth / 2;
    var thumbHeight = deviceHeight / 2 - 5;
    var oldValue  =  this.state.quantity;
    return (
      <Card>
        <CardItem>
          <Grid>
            <Col size={1}>
              <Thumbnail
                style={{ resizeMode: "contain", marginTop: 5 }}
                square
                source={{uri:this.props.product.imageUrl}}
              />
            </Col>
            <Col size={4}>
              <Text
                style={styles.itemDesc}
                numberOfLines={2}
                ellipsizeMode="tail"
              >
                {this.props.product.productName}
              </Text>
              <Text style={styles.soldBy}>
                Nhà sản xuất: {this.props.product.brand?this.props.product.brand.brandName:''}
              </Text>

              <View>
                <Text style={styles.discountedText}>
                  {"Đơn giá:  "}{this.props.product.price}
                </Text>
              </View>

              <View style={{flexDirection: 'row',flex:1}}>
                <Text style={styles.itemDesc}>Số lượng{"  "}  </Text>
                {this.props.completed ? <Text style={{margin:5}}>{this.props.quantity}</Text>:
                <NumericInput 
                  style={{margin: 5,}}
                  value={this.state.quantity} 
                  onChange={(quantity) => {
                    this.setState({quantity})

                    // console.log(this.props.index)
                    if(this.state.quantity==0){
          
                      console.log('index '+this.props.item)
                     
                      this._delete(this.props.itemIndex)

                      this.calculate()
                    }                    
                    else{
                      this.setState({total:this.state.quantity*this.props.product.price})    
                      this.props.onDelete(this.props.itemIndex,this.state.quantity)
                      this.calculate()
                    }
                   

                    // this.props.product.quantity = this.state.quantity

                    // this.addValueToCart(this.props.product,this.props.index)

                    // }
                  }} 
                
                totalWidth={100} 
                totalHeight={20} 
                iconSize={35}
                step={1}
                minValue={0}
                valueType='real'
                rounded 
                textColor='gray' />
                }
              </View>
              <View>
                <Text style={styles.discountedText}>

                  {"Tổng tiền:  "}{this.state.total}
                </Text>
              </View>
            </Col>
          </Grid>
        </CardItem>
        {this.props.completed? 
        null:
        <CardItem
          style={{
            justifyContent: "space-around",
            borderTopWidth: 0.5,
            borderTopColor: "#ccc",
            margin: 10,
            marginBottom: 0,
            padding: 0,
            borderBottomWidth: 0
          }}
        >

          <TouchableOpacity style={styles.bagItemButtons} onPress={()=>this._delete(this.props.index)} >
            <Text style={styles.bagItemButtonText}>REMOVE</Text>
          </TouchableOpacity>
          <View style={styles.btnDivider} />
          <TouchableOpacity style={styles.bagItemButtons}>
            <Text style={styles.bagItemButtonText}>MOVE TO WISHLIST</Text>
          </TouchableOpacity>
        
        </CardItem>
        }
      </Card>
    );
  }
}
const styles = StyleSheet.create({
  itemDesc: {
    fontSize: 14,
    fontWeight: "500",
    color: "black",
    margin:5
  },
  soldBy: {
    fontSize: 13,
    fontWeight: "300",
    margin:5,
    color: "black"
  },
  inStock: {
    fontSize: 12,
    margin:5,
    fontWeight: "300",
    color: "black"
  },
  price: {
    fontSize: 14,
    margin:5,
    fontWeight: "500",
    color: "#555",
    textDecorationLine: "line-through"
  },
  discountedText: {
    fontSize: 14,
    fontWeight: "300",
    color: Colors.brandPrimary,
    margin: 5
  },
  bagItemButtons: {
    justifyContent: "center",
    flex: 1
  },
  bagItemButtonText: {
    textAlign: "center",
    fontSize: 12,
    fontWeight: "500",
    color: "black"
  },
  btnDivider: {
    height: 30,
    width: 0.5,
    backgroundColor: "#ccc",
    marginTop: 12,
    marginBottom: 12
  }
});
export default CartItems;