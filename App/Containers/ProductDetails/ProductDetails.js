import React, { Component } from "react";
import {
  Container,
  Header,
  Title,
  Content,
  Button,
  Icon,
  Card,
  Item,
  Input,
  CardItem,
  Left,
  Body,
  Right,
  Badge,
  List,
  ListView,
  ListItem,
  Tabs,
  Tab,
  Footer,
  
} from "native-base";
import {

  Dimensions,
  Modal,
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  Alert,
  Platform,
  ActivityIndicator,
  ImageBackground
} from "react-native";
import { Actions } from 'react-native-router-flux'
import Image from 'react-native-remote-svg'
import { observer, inject } from "mobx-react/native";
import Swiper from "react-native-swiper";
import IconSLI from "react-native-vector-icons/SimpleLineIcons";
import { Colors, Images, Metrics, Fonts } from '../../Themes';
import {

  PacmanIndicator,

} from 'react-native-indicators';
import TopBar from '../../Components/TopBar'
import I18n from 'react-native-i18n'
import vm from './ProductDetailsStore'
import vmCart from '../CartScreen/CartStore'
import Snackbar, {showSnackBar} from '@prince8verma/react-native-snackbar'
var deviceWidth = Dimensions.get("window").width;
var deviceHeight = Dimensions.get("window").height;



@observer
class ProductDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      bagStatus: "ADD TO BAG"
    };
    vm.loadItemData(this.props.productCode)
  }
  componentWillMount () {
    console.log(this.props.productCode)
    if (this.props.productCode) {
      vm.loadItemData(this.props.productCode)
    }
   
  }

  componentWillReceiveProps (nextProps) {
    if (!this.props.productCode != nextProps.productCode) {
      vm.loadItemData(nextProps.productCode)
    }
  }
  componentDidMount(){
    this.setState({isLoading:false})
  }

  renderSlide= ()=> {
    return (
      <View style={{ position: "relative" }}> 
      <Swiper
        style={styles.wrapper}
        showsButtons={true}
        height={deviceHeight / 2.5}
        removeClippedSubviews={false}
        paginationStyle={styles.pagination}
        dot={<View style={styles.defaultDot} />}
        activeDot={<View style={styles.actDot} />}
      >
        <View style={styles.slide1}>
        <Image 
          source={{uri: vm.imageUrl}}
          style={{ width: Metrics.screenWidth, height: deviceHeight / 2.5,    justifyContent: 'center',
          alignItems: 'center',}}  
          /> 

        </View>
      </Swiper>
      <Button
        style={{
          position: "absolute",
          bottom: 30,
          left: 10,
          padding: 10,
          backgroundColor: "rgba(255,255,255,0.3)"
        }}
        onPress={() =>{
          Alert.alert("The model with height 1.7m is wearing size S")
          console.log(vm.imageUrl)
        }}
      >
        <Icon
          name="ios-information-circle-outline"
          style={{ color: "#111" }}
        />
      </Button>
      </View>
    )
  }


  addBookToCart = () => {
    vm.item.quantity = 1
    console.log('item detail'+vm.item)
    vmCart.addToCart(vm.item);
  }
  
  render() {
    const userStore = this.props["domain.user"];
    const navigation = this.props.navigation;
    var items = [
      "More Green Sweaters",
      "More Sweaters",
      "More Black tshirts",
      "More Tshirts"
    ];
    return (
      <Container>
         <TopBar
                    style={{  
                      position:'absolute',
                      right: Metrics.screenWidth-20,
                      //elevation: 1,
                      zIndex: Platform.OS == 'ios' ? 100 : 0,
                      flexDirection: 'row',
                    }}
          
          backgroundColor='transparent'
          leftImage={Images.chevronLeft}
          backgroundColorChild='gray'
          leftText={I18n.t('Back')}

          leftAction={()=>Actions.pop()}
        />
          {vm.isLoading
            ?     
            <PacmanIndicator
            size={48}
            color={Colors.mainColor}
            style={{
              position: 'absolute',
              bottom: 270,
              alignSelf: 'center',
              minHeight: 60,
              minWidth: 60,
              borderRadius: 20,
            }}
            />
            :
        <Content
          style={{ backgroundColor: "#fff", marginBottom: 0 }}
          >
        {vm.imageUrl ?  
          this.renderSlide() :null }

          <List>
            <View style={{ marginTop: 15 }}>
            <Text style={styles.productName}> {vm.productName}</Text>
            </View>
            <ListItem style={{ marginLeft: 0, paddingLeft: 10 }}>
              <View style={{ flexDirection: "row" }}>
                <Text style={styles.price}>{vm.price}{" đ"}</Text>
               
                
              </View>

            </ListItem>
            <ListItem button style={{ marginLeft: 0, paddingLeft: 10 }}>
              <Icon name="ios-pricetag" style={styles.priceTag} />
              <Text style={styles.tagText}> Giá sốc hôm nay</Text>
            </ListItem>
          </List>

          <View>
            <Tabs style={{ paddingHorizontal: 0 }}>
              <Tab heading="CHI TIẾT" style={{ padding: 10 }}>
                <Text style={{ color: "#777", textAlign: "justify" }}>
                  {vm.description}
                </Text>
              </Tab>
              <Tab heading="KHÁC" style={{ padding: 10 }}>
                <Text style={{ color: "#777" }}>
                {vm.description}
                </Text>
              </Tab>
            </Tabs>
          </View>
          <View>
            <Text style={{ padding: 10, fontSize: 14, color: "#777" }}>
              LƯU Ý KHI SỬ DỤNG
            </Text>
            <View
              style={{
                padding: 10,
                paddingTop: 5,
                borderTopWidth: 1,
                borderTopColor: "#ddd"
              }}
            >
              <Text
                style={{ color: "#777", fontSize: 14, textAlign: "justify" }}
              >
                {vm.description}
              </Text>
            </View>
          </View>
          <View>
            <Text style={{ padding: 10, fontSize: 14, color: "#777" }}>
              THÔNG TIN KHÁC
            </Text>
            <View
              style={{ padding: 10, borderTopWidth: 1, borderTopColor: "#ddd" }}
            >
              <Text style={{ color: "#777" }}>Product Code: {vm.productCode?vm.productCode:''}</Text>
              <Text style={{ color: "#777" }}>Nhãn hiệu: {vm.brand?vm.brand.brandName:''}</Text>
              <Text style={{ color: "#777" }}>
              {vm.description}
              </Text>
            </View>
          </View>
          <Footer>
                  <View style={styles.footer}>
                    <TouchableOpacity
                      style={styles.saveButton}
                      onPress={() => { 
                        this.addBookToCart()
                        Alert.alert("Thêm vào giỏ hàng thành công")
                        Actions.CartScreen()
                      }}
                    >
                      <IconSLI name="list" style={styles.listIcon} />
                      <Text style={styles.saveText}>
                        {" "}MUA NGAY{" "}
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.bagButton}
                      onPress={() =>{
        
                          this.addBookToCart()
                          showSnackBar({
                            message: "Thêm vào giỏ hàng thành công",
                            textColor: '#FFF',      // message text color
                            position: 'top',  // enum(top/bottom).
                            confirmText: 'Mở', // button text.
                            buttonColor: 'white', // default button text color
                            duration: 4000,   // (in ms), duartion for which snackbar is visible.
                            animationTime: 250, // time duration in which snackbar will complete its open/close animation.
                            backgroundColor:Colors.facebook, //background color for snackbar
                            onConfirm: () => {Actions.CartScreen()},    //  perform some task here on snackbar button press.
                          });
                         
                      }}
                                     
                      >
                      <IconSLI name="handbag" style={styles.bagIcon} />
                      <Text style={styles.bagText}> THÊM VÀO GIỎ HÀNG</Text>
                    </TouchableOpacity>
                  </View>
                </Footer>
        </Content>

          }

      </Container>
    );
  }
}
var styles = {
  wrapper: {},
  slide1: {
    position:'absolute',
    flex: 1,
    top:0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "gray"
  },
  slide2: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#97CAE5"
  },
  slide3: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#92BBD9"
  },
  text: {
    // color: "#fff",
    // fontSize: 30,
    // fontWeight: "bold"
  },
  sizes: {
    alignItems: "center",
    justifyContent: "center",
    width: 30,
    height: 30,
    borderColor: "#B2BAB5",
    borderWidth: 1,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    marginLeft: 10
  },
  sizesAlt: {
    alignItems: "center",
    justifyContent: "center",
    width: 30,
    height: 30,
    borderColor: "#7468C5",
    borderWidth: 1,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    marginLeft: 10
  },
  backArrow: {
    color: "#9FA29F"
  },
  titleText: {
    color: "#9FA29F"
  },
  bag: {
    fontSize: 25,
    color: "#9FA29F"
  },
  more: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#9FA29F"
  },
  pagination: {
    bottom: 5
  },
  defaultDot: {
    backgroundColor: "#ddd",
    opacity: 1,
    width: 8,
    height: 8,
    borderRadius: 4,
    marginLeft: 3,
    marginRight: 3,
    marginTop: 3,
    marginBottom: 3
  },
  actDot: {
    backgroundColor: "black",
    opacity: 1,
    width: 8,
    height: 8,
    borderRadius: 4,
    marginLeft: 3,
    marginRight: 3,
    marginTop: 3,
    marginBottom: 3
  },
  pic: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#92BBD9',
  },
  info: {
    position: "absolute",
    bottom: 330,
    backgroundColor: "white",
    height: 50,
    width: 50,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    justifyContent: "center"
  },
  infoIcon: {
    fontSize: 25,
    fontWeight: "bold",
    alignSelf: "center",
    color: "#ddd"
  },
  view1: {
    marginTop: 25,
    backgroundColor: "white"
  },
  productName: {
    fontSize: 16,
    color: "#090909",
    marginLeft: 10
  },
  price: {
    fontSize: 16,
    color: "#ff4d4d"
  },
  cutOffPrice: {
    fontSize: 16,
    color: "#898C94",
    marginLeft: 10,
    textDecorationLine: "line-through"
  },
  discount: {
    fontSize: 16,
    color: "#7468C5",
    marginLeft: 10
  },
  priceTag: {
    fontSize: 16,
    color: "#999"
  },
  tagText: {
    color: "#999",
    alignSelf: "center",
    marginTop: -4
  },
  sizeView: {
    flex: 1,
    flexDirection: "row"
  },
  sizeView1: {
    flex: 1,
    alignItems: "flex-start",
    marginLeft: 10
  },
  rulerIcon: {
    fontSize: 18,
    color: "#999"
  },
  sizeView2: {
    flex: 2,
    alignItems: "flex-start"
  },
  sizeText: {
    color: "#999",
    marginLeft: -15,
    marginTop: 0
  },
  sizeView3: {
    flex: 8,
    alignItems: "flex-end",
    marginRight: 10
  },
  chartText: {
    fontSize: 12,
    color: "#7468C5"
  },
  sizeButtons: {
    flex: 1,
    flexDirection: "row",
    marginLeft: 0,
    paddingVertical: 10
  },
  footer: {
    flex: 1,
    flexDirection: "row"
  },
  saveButton: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#ffad33",
    alignItems: "center",
    justifyContent: "center"
  },
  listIcon: {
    fontSize: 20,
    color: "white"
  },
  saveText: {
    fontSize: 16,
    color: "white"
  },
  bagButton: {
    flex: 1.5,
    flexDirection: "row",
    backgroundColor: "#ff3333",
    alignItems: "center",
    justifyContent: "center"
  },
  bagIcon: {
    fontSize: 16,
    color: "white"
  },
  bagText: {
    fontSize: 16,
    color: "white"
  }
};
export default ProductDetails;