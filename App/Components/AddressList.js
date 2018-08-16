import React from 'react'
import {
  View,
  Text,
  ListView,
  ActivityIndicator,
  Animated,
  Dimensions
} from 'react-native'
import { connect } from 'react-redux'
import HorizontalCategoryList from './HorizontalCategoryList'
import Button from './FullButton'
import InfiniteScrollView from 'react-native-infinite-scroll-view'
import { Images,Colors } from '../Themes'
import UserModel from '../Models/User'
import TopBar from './TopBar'
import I18n from 'react-native-i18n'
var { height, width } = Dimensions.get('window')

// For empty lists
// import AlertMessage from '../Components/AlertMessage'

// Styles
import styles from './Styles/OrderHistoryListStyle'
import {

  PacmanIndicator,

} from 'react-native-indicators';
import AddressItem from './AddressItem'
import { observer } from 'mobx-react'
import { Actions } from 'react-native-router-flux';

@observer 
class AddressList extends React.Component {
  ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
  //dataSource = this.ds.cloneWithRows([])

  constructor (props) {
    super(props)
    this.state ={
      data :this.props.items,
      dataSource: this.ds.cloneWithRows([])
    }
    this._delete.bind(this)
  }
  componentWillMount () {
    this.updateComponent(this.props)
    console.log('data'+this.props.items)
    this.setState({data:this.props.items})
    console.log('data props'+JSON.stringify(this.state.data))
  }

  componentWillReceiveProps (nextProps) {
    this.updateComponent(nextProps)
  }
  updateComponent (props) {
    if (props.items && props.items.length > 0) {
      console.log('come ere')
      this.setState({dataSource:this.ds.cloneWithRows(this.state.data)})
      //this.state.dataSource = this.ds.cloneWithRows(this.state.data)
    }
  }
  _delete = (index) => {
    
    console.log("deleting"+index)
    this.state.data.splice(index, 1)
    console.log("data form data"+JSON.stringify(this.state.data))
    this.setState({
      dataSource: this.ds.cloneWithRows(this.state.data)
    });
  }


  _renderRow = (OrderHistory, _, index) => {

    return (
      <AddressItem
        onDelete={this._delete}
        itemIndex={index}
        {...OrderHistory}
      />
    )
  }

  _loadMoreContentAsync = async () => {
    await this.props.onLoadMore()
  }

  render () {
    if (this.props.isloading) return     
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

    if (
      this.props.items.length < 1
    ) {
      return (
        <View
        style={[styles.container, this.props.style]}
        >

              
          <Text style={{flex:1,textAlign:'center',marginTop:150}}>Không có đơn hàng nào</Text>
           
        </View>

      )
    } else {
      return (
        <View style={[styles.container, this.props.style]}>

          <ListView
            renderScrollComponent={props => <InfiniteScrollView {...props} />}
            contentContainerStyle={[
              styles.listContent,
              this.props.listContentStyle
            ]}
            dataSource={this.state.dataSource}
            renderRow={this._renderRow}
            enableEmptySections
            onScroll={this.props.scrollY}
            pageSize={15}
            canLoadMore={
              !!(this.props.total > this.props.items.length &&
                !this.props.pageLoad)
            }
            onLoadMoreAsync={this._loadMoreContentAsync}
          />


        </View>
      )
    }
  }
}

export default AddressList
