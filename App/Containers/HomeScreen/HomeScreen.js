import React from 'react'
import {
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
  Animated,
  TextInput,
  StatusBar,
  Platform,
  StyleSheet,
  Alert,
  FlatList,
  ListView,
  ImageBackground,
  TouchableWithoutFeedback,
  BackAndroid
} from 'react-native'
import Image from 'react-native-remote-svg'
import GridView,{SuperGridSectionList} from 'react-native-super-grid'
import LinearGradient from 'react-native-linear-gradient'
import { Colors, Images, Metrics, Fonts } from '../../Themes'
import ProductList from '../../Components/ProductList'
import HorizontalCategoryList from '../../Components/HorizontalCategoryList'
import TabBar from '../../Components/TabBar'
import vm from './HomeStore'
import { observer } from 'mobx-react/native'
import FilterScreen from '../Filter'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { Actions } from 'react-native-router-flux'
import Menu from './Menu';
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
// Styles
import OrLine from '../../Components/OrLine'
import Slideshow from 'react-native-slideshow'
import styles from './HomeScreenStyle'
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
import I18n from 'react-native-i18n'
import AndroidBackButton from 'react-native-android-back-button'
import Modal from "react-native-modal"
import { Row } from 'native-base';
@observer 
class Home extends React.Component {
  constructor () {
    super()
    this.toggle = this.toggle.bind(this);
    this.state = {
      modalVisible: false,
      searchBarWidth: Metrics.screenWidth - 20, // Initial value for opacity: 0
      searching: false,
      hidden: false,
      animated: true,
      searchModal: false,
      tabsHeight: new Animated.Value(0),
      opacity: new Animated.Value(0),
      topTabsHeight: new Animated.Value(Platform.OS == 'android' ? 50 : 70),
      showAd: true,
      isOpen: false,
      selectedItem: 'About',
      position: 0,
      interval: null,
      dataSource: [
        {

          url: Images.slide1,
        }, {

          url: Images.slide2,
        }, {

          url: Images.slide3,
        },
      ],
      data:[

        {        
        productId: 2,
        productCode: 100002,
        productVersion: 1,
        productName: "Bột giặt OMO comfort tinh dầu thơm",
        price: 15000,
        type: "tinh dầu thơm",
        size: "2 kg",
        description :" ",
        imageUrl: "https://s3-ap-southeast-1.amazonaws.com/eazy-images/1-o+mo+comfort.png",
        startDate: 1530403200000,
        endDate: null,
        brand: {
            brandId: 1,
            brandName: "Ô MÔ",
            description: ""
        },
        category: {
            categoryId: 18,
            categoryName: "Bột giặt",
            escription: null,
            parentId: 4,
            type: 3
        } 
        },
        {    
          
            productId: 9,
            productCode: 100009,
            productVersion: 1,
            productName: "Nước xả mềm vải Downy Dam Me",
            price: 35000,
            type: "mềm vải",
            size: "1.5 lít",
            description: " ",
            imageUrl: "https://s3-ap-southeast-1.amazonaws.com/eazy-images/9-nuoc-xa-vai-downy-antibac-chong-khuan-dang-chai.jpeg",
            startDate: 1530403200000,
            endDate: null,
            brand: {
                brandId: 3,
                brandName: "DOWNY",
                description: null
            },
            category: {
                categoryId: 19,
                categoryName: "Nước xả",
                description: null,
                parentId: 4,
                type: 3
            }
            

        },
        {    
          productId: 13,
          productCode: 100013,
          productVersion: 1,
          productName: "Bàn chải giặt đồ",
          price: 15000,
          type: "màu hồng",
          size: "nhỏ",
          description: " ",
          imageUrl: "https://s3-ap-southeast-1.amazonaws.com/eazy-images/13-ban-chai-giat-do-mau-hong.jpg",
          startDate: 1530403200000,
          endDate: null,
          brand: null,
          category: {
              categoryId: 20,
              categoryName: "Bàn chải giặt đồ",
              description: null,
              parentId: 5,
              type: 3
          }     
           
          },
          {    
            productId: 18,
            productCode: 100018,
            productVersion: 1,
            productName: "KHĂN giấy ướt Pampers Sensitive Wipes",
            price: 35000,
            type: "Sensitive Wipes",
            size: "50 g",
            description: " ",
            imageUrl: "https://s3-ap-southeast-1.amazonaws.com/eazy-images/18-khan-giay-uot-pampers.jpg",
            startDate: 1530403200000,
            endDate: null,
            brand: {
                brandId: 5,
                brandName: 'Pampers',
                description: null
            },
            category: {
                categoryId: 22,
                categoryName: "Giấy, khăn ướt",
                description: null,
                parentId: 6,
                type: 3
            }     

            },

          ],
        catSource: [
            {
              name:"Dùng trong gia đình",  
              url: Images.family,
            }, {
              name:"Ăn uống",  
              url: Images.food,
            }, {
              name:"Nhà bếp",  
              url: Images.kitchen,
            },
            {
              name:"Chất giặt tẩy",  
              url: Images.wash,
            },
            {
              name:"Dụng cụ giặt tẩy",  
              url: Images.image1,
            },
            {
              name:"Chất tẩy rửa",  
              url: Images.image15,
            },
            {
              name:"Dụng cụ vệ sinh",  
              url: Images.image2,
            },
            {
              name:"Văn phòng phẩm",  
              url: Images.image3,
            },
            {
              name:"Đồ ăn vặt",  
              url: Images.image7,
            },
          ],  
    }
    this.oldScrollPos = 0
  }

  componentWillMount () {
    //this.update()
    vm.loadHomeSubCategories(0)
    this.setState({
      interval: setInterval(() => {
        this.setState({
          position: this.state.position === this.state.dataSource.length-1 ? 0 : this.state.position + 1
        });
      }, 2000)
    });
    
  }

  // componentDidMount() {
  //   Animated.timing(                  // Animate over time
  //     this.state.opacity,            // The animated value to drive
  //     {
  //       toValue: 1,                   // Animate to opacity: 1 (opaque)
  //       duration: 10000,              // Make it take a while
  //     }
  //   ).start();                        // Starts the animation
  // }

  componentWillUnmount() {
    clearInterval(this.state.interval);
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.reload && this.state.screen === 'EXPLORE') {
      this.update()
    } else {
      this.refs._scrollView.scrollTo({
        x: 0,
        y: undefined,
        animated: true
      })
    }
  }

  update () {
    // vm.homeSubCategoryVisible = false
    // vm.loadHomeCategories().then(() => vm.loadAllItems())
    // vm.loadFollowedUsers()
  }




  renderHeader = () => {
    return(
      <View style={ styles.slideView}>
            <Slideshow 
            dataSource={this.state.dataSource}
            position={this.state.position}
            onPositionChanged={position => this.setState({ position })} 
            />



          <View style={styles.mainCategoryView}>
            <TouchableOpacity style={styles.categoryNameView} onPress={Actions.ProductDetails}>
                <Image source={Images.deal} style={{width:50,height:50}}/>
                  <Text style={styles.categoryNameText}>
                    Deal Chớp Nhoáng
                  </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.categoryNameView}>
              <Image source={Images.services} style={{width:50,height:50}}/>
                  <Text style={styles.categoryNameText}>
                    Dịch Vụ
                  </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.categoryNameView}>
            <Image source={Images.code} style={{width:50,height:50}}/>
                  <Text style={styles.categoryNameText}>
                    Mã Giảm Giá
                  </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.categoryNameView}>
            <Image source={Images.other} style={{width:50,height:50}}/>
                  <Text style={styles.categoryNameText}>
                    Danh Mục
                  </Text>
            </TouchableOpacity>                
          </View>
        </View>
    )
  }


  renderItem =  () => {
    return(
    <View style= {{ flex:1,marginBottom: 10,marginTop:10,backgroundColor:'white'}}> 
    {/* <GestureRecognizer
    onSwipeRight={(state) => this.onSwipeRight(state)}
    onSwipeLeft={(state) => this.onSwipeLeft(state)}
    config=   {{
      velocityThreshold: 0.3,
      directionalOffsetThreshold: 80
    }}
    style={{
      flex: 1,
      backgroundColor: 'white'
    }}
    > */}
          {/* <Modal           
            isVisible={this.state.modalVisible}
            animationIn="slideInLeft"
            animationOut="slideOutLeft">
          <View style={{  
                          flex :1,
                          flexDirection: 'column',
                          backgroundColor: "rgba(237, 237, 237, 0.85)",
                          justifyContent: "center",
                          marginTop: 60,
                          marginBottom: 30,
                          alignItems: "center",
                          borderRadius: 4,
                          width: '30%', 
                          borderColor: "rgba(0, 0, 0, 0.1)"}}>
            <TouchableOpacity             
              style={{  
              flex :1,
              flexDirection: 'column',
              padding: 20,
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 4,
              height: '30%',
              width :'100%',
              }}>
                      <Icon 
                        size={40} 
                        color={Colors.mainColor}
                        name='view-grid'
                        />
                      <Text style={{color:Colors.mainColor,...Fonts.style.small,}} >{I18n.t('family')}</Text>
            </TouchableOpacity>              

            <TouchableOpacity              
              style={{  
              flex :1,
              flexDirection: 'column',
              padding: 20,
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 4,
              height: '30%',
              width :'100%',
              borderColor: "rgba(0, 0, 0, 0.1)"}}>
                  <Icon 
                    size={40} 
                    color={Colors.mainColor}
                    name='food'
                    />              
                  <Text style={{color:Colors.mainColor,...Fonts.style.small,}}>{I18n.t('food')}</Text>
            </TouchableOpacity>

            <TouchableOpacity               
              style={{  
              flex :1,
              flexDirection: 'column',
              padding: 20,
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 4,
              height: '30%',
              width :'100%',
              borderColor: "rgba(0, 0, 0, 0.1)"}}>
                  <Icon 
                  size={40} 
                  color={Colors.mainColor}
                  name='fridge'
                  /> 
                  <Text style={{color:Colors.mainColor,...Fonts.style.small,}}>{I18n.t('kitchen')}</Text>
            </TouchableOpacity>
          </View>
        </Modal> */}
        
          <View    
              style={{
                    flexDirection: 'row',
                    alignSelf: 'flex-start',
                    marginTop: 15,
                    marginLeft: 10,
                    position: 'absolute',
                    backgroundColor:'white'
                  }}>
                  <Text     
                        style={{
                          fontSize:18,
                          ...Fonts.style.normal,
                        }}>
                       Tìm kiếm phổ biến
                  </Text>
            </View>           
            <View
                  style={{
                    borderBottomColor: 'white',
                    borderBottomWidth: 1,
                    marginTop: 35,
                    marginBottom: 10,
                    width: Metrics.screenWidth
                  }}
              />

     <FlatList 
          data={this.state.data}
          horizontal={true}
          renderItem={({item}) => 
          <View style= {{backgroundColor:'white',margin:10}}>           
            {console.log(item.productCode)}
            <TouchableOpacity style={{flex:1 ,alignItems:'center'}} onPress={()=>Actions.ProductDetails({productCode:item.productCode})}>
            <View style={{flex:1 ,width:150, borderColor:'#F0F0F0',borderWidth:1,alignItems:'center'}}>
            <Image source={{uri:item.imageUrl}}
                  style={{ width: 100, height: 120}}  
              />

              <View
                  style={{
                    borderBottomColor: '#F0F0F0',
                    borderBottomWidth: 1,
                    marginTop: 35,
                    marginBottom: 10,
                    width: 150
                  }}
              />
              <Text  style={{textAlign:'center'}}>
                    {item.productName}
              </Text>
          </View>
          </TouchableOpacity>
        </View> }
        keyExtractor={(item, index) => index.toString()}
        
        />
      

          
      </View>
    //  </GestureRecognizer> 

    
    )}

    renderItem =  () => {
      return(
      <View style= {{ flex:1,marginBottom: 10,marginTop:10,backgroundColor:'white'}}> 

          
            <View    
                style={{
                      flexDirection: 'row',
                      alignSelf: 'flex-start',
                      marginTop: 15,
                      left:10,
                      position: 'absolute',
                      backgroundColor:'white'
                    }}>
                    <Text     
                          style={{
                            fontSize:18,
                            ...Fonts.style.normal,
                          }}>
                         Tìm kiếm phổ biến
                    </Text>
              </View>           
              <View
                    style={{
                      borderBottomColor: 'white',
                      borderBottomWidth: 1,
                      marginTop: 35,
                      marginBottom: 10,
                      width: Metrics.screenWidth
                    }}
                />
                
  
       <FlatList 
            data={this.state.data}
            horizontal={true}
            renderItem={({item}) => 
            <View style= {{backgroundColor:'white',margin:10}}>           
              {console.log(item.productCode)}
              <View style={{flex:1 ,width:150, borderColor:'#F0F0F0',borderWidth:1,alignItems:'center'}}>
              <TouchableOpacity style={{flex:1 ,alignItems:'center'}} onPress={()=>Actions.ProductDetails({productCode:item.productCode})}>
              <Image source={{uri:item.imageUrl}}
                    style={{ width: 100, height: 120,    justifyContent: 'center',
                    alignItems: 'center',}}  
                />
  
                <View
                    style={{
                      borderBottomColor: '#F0F0F0',
                      borderBottomWidth: 1,
                      marginTop: 35,
                      marginBottom: 10,
                      width: 150
                    }}
                />
                <Text  style={{textAlign:'center'}}>
                      {item.productName}
                </Text>
                </TouchableOpacity>
            </View>
          </View> }
          keyExtractor={(item, index) => index.toString()}
          
          />
        
  
            
        </View>
      //  </GestureRecognizer> 
  
      
      )}




  renderScreen = () => {   
      return (
        <View style= {{ flex:1,marginBottom: 10,marginTop:10,backgroundColor:'white'}}>              
        <View    
        style={{
              flexDirection: 'row',
              alignSelf: 'flex-start',
              marginTop: 15,
              left:10,
              position: 'absolute',
              backgroundColor:'white'
            }}>
            <Text     
                  style={{
                    fontSize:18,
                    ...Fonts.style.normal,
                  }}>
                 Gói hằng ngày
            </Text>
      </View>           
      <View
            style={{
              borderBottomColor: 'white',
              borderBottomWidth: 1,
              marginTop: 35,
              marginBottom: 10,
              width: Metrics.screenWidth
            }}
        />

       <GridView 
             items = {this.state.data}
          initialNumToRender={1}
          itemDimension={Metrics.screenWidth/2}
          style={styles.productView}
          spacing={0}
           renderItem={
            item=>
              <View style={{flex:1 ,width:Metrics.screenWidth/2, height:Metrics.screenWidth/2,borderColor:'#F0F0F0',borderWidth:1,alignItems:'center'}}>
              <TouchableOpacity style={{flex:1 ,alignItems:'center'}} onPress={()=>Actions.ProductDetails({productCode:item.productCode})}>
              <Image source={{uri:item.imageUrl} }
                    style={{ width: 100, height: 120,    justifyContent: 'center',
                    alignItems: 'center',}}  
                />

                <Text  style={{textAlign:'center'}}>
                      {item.productName}
                </Text>

                <Text  style={{textAlign:'center',color:'red'}}>
                      {item.price}{'đ'}
                </Text>
                </TouchableOpacity>
             </View>
          
           }
          
           />
          </View>
      )
     
  }

  renderCategory= () => {   
    return (
      <View style= {{ flex:1,marginBottom: 10,marginTop:10,backgroundColor:'white'}}>              
      <View    
      style={{
            flexDirection: 'row',
            alignSelf: 'flex-start',
            marginTop: 15,
            left:10,
            position: 'absolute',
            backgroundColor:'white'
          }}>
          <Text     
                style={{
                  fontSize:18,
                  ...Fonts.style.normal,
                }}>
               Danh mục ngành hàng
          </Text>
    </View>           
    <View
          style={{
            borderBottomColor: 'white',
            borderBottomWidth: 1,
            marginTop: 35,
            marginBottom: 10,
            width: Metrics.screenWidth
          }}
      />

     <GridView 
        items = {vm.subCategories}
        initialNumToRender={1}
        itemDimension={Metrics.screenWidth/3}
        style={styles.productView}
        spacing={0}
         renderItem={
          item=>
            <View style={{flex:1 ,alignItems:'center'}}>
            <TouchableOpacity onPress ={() => {
              console.log('cateID '+item.categoryId)
              vm.followingScreen[1]=item.categoryId
              Actions.SubCategory({parentId:item.categoryId,typeCate:item.type})}
              }>
            <Image source={item.description}
                  style={{ width: Metrics.screenWidth/4, height: Metrics.screenWidth/4 ,margin:10}}  
              />

              <Text  style={{textAlign:'center'}}>
                    {item.categoryName}
              </Text>
              </TouchableOpacity>

           </View>
        
         }
        
         />
        </View>
    )
   
}

  handleScroll = event => {
    console.log(event.nativeEvent.contentOffset.y/1000)


    
  }
  showSearchBar = () => {

    // this.setState({
    //   searching: true
    // })
  }

  hideSearchBar = () => {
    // Animated.timing(
    //   // Animate over time
    //   this.state.searchBarWidth, // The animated value to drive
    //   {
    //     toValue: 0 // Animate to opacity: 1, or fully opaque
    //   }
    // ).start() // Starts the animation
    // this.setState({
    //   searching: false
    // })
  }



  bannerError = (e) => {
    console.log('------------------------------------------', e)
  }

  onSwipeLeft(gestureState) {
    this.setState({ modalVisible: false });

  }
 
  onSwipeRight(gestureState) {
    this.setState({ modalVisible: !this.state.modalVisible });

    

  }

  onSwipe(gestureName, gestureState) {
    const {SWIPE_UP, SWIPE_DOWN, SWIPE_LEFT, SWIPE_RIGHT} = swipeDirections;
    this.setState({gestureName: gestureName});
    switch (gestureName) {
      case SWIPE_LEFT:
       
        break;
      case SWIPE_RIGHT:
        
        break;
    }
  }
  handleAndroidBackButton = () => {
    if (this.state.screen !== 'EXPLORE') {
      this.refs._scrollView.scrollTo({
        x: 0,
        y: undefined,
        animated: true
      })
      return true
    } else {
      return false
    }
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }

  updateMenuState(isOpen) {
    this.setState({ isOpen });
  }

  onMenuItemSelected = item =>
    this.setState({
      isOpen: false,
      selectedItem: item,
    });
  render () {

    return (

      <View style={styles.mainView}>
        <Animated.View
          style={{  
            position:'absolute',
            right: Metrics.screenWidth / 4-85,
            top: Platform.OS == 'android' ? 10 : 25,
            width: this.state.searchBarWidth,
            height: 30,
            borderRadius: 30,
            backgroundColor: 'white',
            elevation: 1,
            zIndex: Platform.OS == 'ios' ? 100 : 0,
            flexDirection: 'row',
          }}
        >
          <TextInput
            onChangeText={vm.onSearchTextChange}
            style={{ flex: 1, paddingLeft: 15, padding: 5, color: 'black' }}
            onSubmitEditing={() => {
              vm.onSearchPress({ title: vm.searchText })
              this.searching = true
            }}
            width = {Metrics.screenWidth+100}
            value={vm.searchText}
            underlineColorAndroid='transparent'
            placeholder={I18n.t('searchPlaceholder')}
            returnKeyType={'search'}
            ref='searchInput'
          />

        </Animated.View>
        <Animated.View style={{            
            position:'absolute',
            right: 0,
            top: 0,
            zIndex: Platform.OS == 'ios' ? 10 : 0,
            flexDirection: 'row',

            opacity: this.state.opacity 
          }}>
            <View
                style={{
                  height: Platform.OS == 'android' ? 50 : 40,
                  flexDirection: 'row',
                  backgroundColor: Colors.mainColor
                }}
              >

            <LinearGradient
              colors={[
                Colors.topTransparent,
                Colors.mainColor,
                Colors.mainColor
              ]}
              start={{ x: 1.0, y: 1.0 }}
              end={{ x: 0.0, y: 1.0 }}
              locations={[0, 0.50, 1]}
              style={styles.linearGradientSearch}
            >
            </LinearGradient>
          </View>
        </Animated.View >
      <ScrollView onScroll={event => { 
                  Animated.timing(this.state.opacity, {
                    toValue: event.nativeEvent.contentOffset.y/200,
                    duration: 0
                }).start()
        }}  scrollEventThrottle={16}>
        <AndroidBackButton onPress={this.handleAndroidBackButton} />
        <StatusBar hidden={this.state.hidden} animated={this.state.animated} />
        <Modal
          animationType={'slide'}
          visible={vm.searchModalOpen}
          onRequestClose={vm.onSearchModalClick}
          transparent
        >
          <View style={{ flex: 1, backgroundColor: 'white', zIndex: 0 }}>
            <FilterScreen
              onSearchPress={async data => {
                await vm.onSearchPress(data)
                this.setState({})
              }}
              //onSearchSave={vm.onSearchSave}
              categories={vm.categories}
              subCategories={vm.subCategories}
              // currentCategory={vm.currentCategoryIndex}
              // onCirclePress={vm.onCurrentCategoryChange}
              // closeFilterModal={vm.onSearchModalClick}
              // subCategoryLoading={vm.subCategoryLoading}
              // onLocationChange={vm.onLocationChange}
              // onRadiusChange={vm.onRadiusChange}
            />
          </View>
        </Modal>






        <View style={{flex:1,zIndex:0}}>
          {/* {this.renderScreen()} */}
          {this.renderHeader()}
           {this.renderItem()}     
            {this.renderScreen()}
          {this.renderCategory()}
        </View>

      </ScrollView>

        <TabBar
            newTab = 'home'
        />
      {/* </View>
        </Animated.View> */}

      </View>
     
    )
  }

}

export default Home
