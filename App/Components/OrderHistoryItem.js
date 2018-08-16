import React from 'react'
import { View, Modal,Text, Image, TouchableOpacity, TouchableHighlight,List,FlatList,Dimensions} from 'react-native'
import { Actions } from 'react-native-router-flux'
//import {Button} from 'native-base'
import styles from './Styles/OrderHistoryStyles'
import { observer } from 'mobx-react'
import I18n from 'react-native-i18n'
import UserModel from '../Models/User'

import {Colors,Fonts,Metrics} from '../Themes'
import { ListItem,Rating, FormLabel, FormInput ,Button} from 'react-native-elements';
import TextInputField from './TextInputField';
var { height, width } = Dimensions.get('window');
const STATUS ={

}
@observer
export default class OrderHistoryItem extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      modalVisible: false,
      text:'',
      rating:''
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
  confirmReceived(){
    UserModel.receivedOrder(this.props.orderId)
    this.setState({modalVisible: true});
  }

  cancelOrder(){
    UserModel.cancelOrder(this.props.orderId)
    Actions.BuyerProfile({type:'replace'})
  }
  openFeedback(){
    this.setState({modalVisible: true});
  }
  onCommentChange(t){
    this.setState({comment: t});
  }
  closeModal(){
    data = {
      comment:this.state.text,
      rating:this.state.rating,
      orderId:this.props.orderId
    }
    UserModel.addFeedback(data)
    this.setState({modalVisible: false})
    Actions.BuyerProfile({type:'replace'})
  }
  ratingCompleted(){
    this.setState(rating);
  }
  render () {
    let {
      orderId,
      orderCode,
      shippingAddress,
      totalPrice,
      note,
      status,
      pendingRetailers,
      matchedTime,
      orderLines,
      feedbacks,
      failed,
    } = this.props
    
    return (
      <View style={[styles.container, this.props.style]}>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            this.closeModal()
          }}> 
          <View style={{marginTop: 22,height:100,flex:1,alignContent:'center',alignItems:'center'}}>
          <Text style={{...Fonts.style.h3,textAlign:'center',}}>Đánh giá dịch vụ</Text>
              <Rating
                showRating
                type="star"
                fractions={0}
                startingValue={3}
                imageSize={40}
                onFinishRating={(rating)=>this.setState({rating})}
                style={{ paddingVertical: 10 ,alignItems: 'center',}}
              />
              <FormLabel>Ý kiến đóng góp</FormLabel>
              <FormInput 
                containerStyle={{width:Metrics.screenWidth-150,alignContent:'center',alignItems:'center'}}
                inputStyle={{color:'black',width:Metrics.screenWidth-150,alignContent:'center',alignItems:'center'}}
                onChangeText={(text) => this.setState({text})}
              />
              <Button
                style={{marginTop:20}}
                onPress={()=>this.closeModal()}
                title='XONG' 
                backgroundColor={Colors.mainColor}
                rounded
              />

            </View>
        </Modal>
        {/* {status == 'sold'
          ? <View
            style={{
              position: 'absolute',
              top: 0,
              right: 0,
              height: 60,
              width: 60,
              backgroundColor: Colors.transparent
            }}
            >
            <Image
              source={Images.sold}
              style={{ width: 60, height: 60 }}
              resizeMode='cover'
              />
          </View>
          : null}
        {this.props.item_featured
          ? <View
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              height: 60,
              width: 60,
              backgroundColor: Colors.transparent
            }}
            >
            <Image
              source={Images.featured}
              style={{ width: 60, height: 60 }}
              resizeMode='cover'
              />
          </View>
          : null}
        <TouchableOpacity
          onPress={this.onUserImagePress}
          style={styles.ownerImageView}
        >
          <Image
            source={
              !owner_image || owner_image != 'N/A'
                ? { uri: owner_image }
                : Images.blueLogo
            }
            style={styles.ownerImage}
            resizeMode={
              !owner_image || owner_image != 'N/A' ? 'cover' : 'contain'
            }
          />
        </TouchableOpacity> */}
        <View style={styles.ownerView}>
          <Text numberOfLines={1} style={[styles.nameText,{fontWeight: 'bold',color:'red',textAlign:'center',fontSize:14}]}>
            Mã đơn hàng: {this.props.orderCode}
          </Text>

        </View>
        <View style={styles.ownerView}>
        <Text numberOfLines={1} style={[styles.priceText,{color:this.contants[this.props.status?this.props.status:0].color,fontWeight: 'bold',fontSize:14}]}>
          {console.log(this.props.status)}
            Trạng thái:  {this.contants[this.props.status?this.props.status:0].des} 
            {/* {this.props.feedbacks.comment} */}
          </Text>
          </View>
        <TouchableOpacity
          style={styles.tilteView}
          onPress={() =>
            Actions.ProductDetails({
              productCode:item.productCode
            })}
          activeOpacity={0.6}
        >
          <Text style={[styles.titleText,{fontSize:14}]}>
           Địa chỉ giao hàng:  {this.props.shippingAddress?this.props.shippingAddress.addressDetail:''}
          </Text>
        </TouchableOpacity>
        <View style={styles.likesView}>
              <FlatList
                data={this.props.orderLines}
                renderItem={({ item }) => (
                  <TouchableOpacity style={{width:width-40}} onPress={() => Actions.ProductDetails({productCode:item.product.productCode})}>

                  <ListItem
                    roundAvatar
                    title={item.product.productName}
                    subtitle= {`${'Đơn giá:'} ${item.product.price}    ${'Số lượng: '} ${item.amount}`}
                    avatar={{ uri: item.product.imageUrl }}
                  />
                   </TouchableOpacity>        
                )}
              />
       {!this.props.completed ?
       <View style={[styles.funcView,{marginTop:20}]}>
       {this.props.status == 4?
       <TouchableHighlight
          style={[styles.submit,{ borderColor: 'green'}]}
          onPress={() => this.confirmReceived()}
          underlayColor='#fff'>
                  <Text
                      style={[
                        styles.submitText,
                        { color: 'green',  borderColor: 'green' }
                      ]}
                    >
                      {' '}ĐÃ NHẬN{' '}
                    </Text>
        </TouchableHighlight>

                    :null}
                    {this.props.status==5?
                            <TouchableHighlight
                            style={[styles.submit,{ borderColor: 'blue'}]}
                            onPress={() => this.openFeedback()}
                            underlayColor='#fff'>
                              <Text
                                style={[
                                  styles.submitText,
                                  { color: 'blue' }
                                ]}
                              >
                                {' '}ĐÁNH GIÁ{' '}
                              </Text>
                          </TouchableHighlight>
                    :null}
      <TouchableHighlight
          style={[styles.submit,{ borderColor: 'red'}]}
          onPress={() => this.cancelOrder()}
          underlayColor='#fff'>
            <Text
              style={[
                styles.submitText,
                { color: 'red' }
              ]}
            >
              {' '}HUỶ ĐƠN HÀNG{' '}
            </Text>
        </TouchableHighlight>


          </View>
       :      
       <TouchableHighlight
       style={[styles.submit,{ borderColor: 'green'}]}
       onPress={() => Actions.OrderScreen({...this.props})}
       underlayColor='#fff'>
         <Text
           style={[
             styles.submitText,
             { color: 'green' }
           ]}
         >
           {' '}Chi tiết{' '}
         </Text>
     </TouchableHighlight>}
       </View>

      </View>
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
