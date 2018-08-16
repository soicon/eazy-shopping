import React from 'react'
import { View, Text, Image, TouchableOpacity, TouchableWithoutFeedback } from 'react-native'
import { Actions } from 'react-native-router-flux'
import styles from './Styles/ProductItemStyle'
import { Images, Colors } from '../Themes'
import { observer } from 'mobx-react'
import I18n from 'react-native-i18n'
import UserModel from '../Models/User'

@observer
export default class ProductItem extends React.Component {
  constructor (props) {
    super(props)

    this.state = {

    }
  }







  render () {
    let {
      productId,
      productCode,
      productVersion,
      productName,
      price,
      type,
      size,
      description,
      imageUrl,
      startDate,
      endDate,
      brand,
      category,
    } = this.props
    
    return (
      <View style={[styles.container, this.props.style]}>
        <View style={styles.productImage}>
          <TouchableWithoutFeedback
            onPress={() =>
              Actions.ProductDetails({
                productCode:this.props.productCode
              })}
          >
            <Image source={{uri:this.props.imageUrl}} style={styles.image} resizeMode='cover' />
          </TouchableWithoutFeedback>
        </View>
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
          <Text numberOfLines={1} style={styles.nameText}>
            {this.props.productImage}
          </Text>
          <Text numberOfLines={1} style={styles.priceText}>
            {this.props.price} đ
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
          <Text style={styles.titleText}>
            {this.props.productName}
          </Text>
        </TouchableOpacity>
        {/* <TouchableOpacity onPress={() => onLikeItem(this.props.index)} style={styles.likesView}> */}
        <TouchableOpacity onPress={this.onLikeItem} style={styles.likesView}>
          <Image
            source={{uri:this.props.imageUrl}}
            // style={styles.ownerImage}
            resizeMode='cover'
          />
          <Text
            style={[
              styles.likeText,
              { color: this.state.like ? Colors.mainColor : '#979797' }
            ]}
          >
            {' '}Mua hàng{' '}
          </Text>
        </TouchableOpacity>
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
