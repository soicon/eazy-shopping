import React from 'react'
import {
  View,
  Text,
  ListView,
  Dimensions
} from 'react-native'

import InfiniteScrollView from 'react-native-infinite-scroll-view'
import { Colors, Images } from '../Themes'
import TopBarWithoutBack from './TopBarWithoutBack'
import TopBar from './TopBar'
import I18n from 'react-native-i18n'
import vm from '../Containers/BuyerProfile/BuyerProfileStore'
import TabBar from '../Components/TabBar'
var { height, width } = Dimensions.get('window')

// For empty lists
// import AlertMessage from '../Components/AlertMessage'

// Styles
import styles from './Styles/OrderHistoryListStyle'
import {

  PacmanIndicator,

} from 'react-native-indicators';
import OrderHistoryItem from './OrderHistoryItem'
import { observer } from 'mobx-react'

@observer 
class OrderHistoryList extends React.Component {
  ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
  //dataSource = this.ds.cloneWithRows([])

  constructor (props) {
    super(props)
    this.state={
      data :this.props,
      dataSource: this.ds.cloneWithRows([])
    }
  }
  async componentWillMount () {
    if(this.props.processing){
      vm.isLoading = true
      await vm.loadProcessingOrder().then( async ()=>{
        vm.orders = vm.orders.reverse()
        console.log('data'+JSON.stringify(vm.orders))
        this.setState({data:vm.orders})
        this.setState({dataSource:this.ds.cloneWithRows(this.state.data)})
     })
      // this.setState({data:vm.orders})

    }else{
      await vm.loadCompletedOrder()
      vm.ordersCompleted = vm.ordersCompleted.reverse()
      this.setState({data:vm.ordersCompleted})
      this.setState({dataSource:this.ds.cloneWithRows(this.state.data)})
      console.log(this.props.items)

    }

  }

  componentWillReceiveProps (nextProps) {
    if(nextProps.processing){
      vm.isLoading = true
      vm.loadProcessingOrder()
      this.setState({data:vm.orders})
      this.updateComponent(this.state.data)
    }else{
      this.updateComponent(this.props)
      console.log(this.props.items)

    }
  }
  updateComponent (props) {
    if (props.items && props.items.length > 0) {
     // this.dataSource = this.ds.cloneWithRows(props.items)
      this.setState({dataSource:this.ds.cloneWithRows(props.items)})
    }
  }

  getDefaultImage (images) {
    if (!images || images.length < 1) return null

    for (var i = 0; i < images.length; i++) {
      let image = images[i]
      if (image.default) return image.link
      if (i + 1 == images.length) return image.link
    }
  }

  _renderRow = (OrderHistory, _, index) => {
    let images = OrderHistory && OrderHistory.images && OrderHistory.images.slice
      ? OrderHistory.images.slice()
      : []
    return (
      <OrderHistoryItem
        completed={this.props.completed?true:false}
        itemIndex={index}
        {...OrderHistory}
      />
    )
  }


  render () {

    

    // if (
    //   this.props.items.length < 1
    // ) {
    //   return (
    //     <View
    //     style={[styles.container, this.props.style]}
    //     >
    //     {this.props.completed? null:
    //           <TopBar
    //           leftImage={
    //                 Images.chevronLeft
    //             }
    //           leftText={I18n.t('Back')}
    //           title="Đơn hàng đang xử lý"
    //           />
    //           }
    //       <Text style={{flex:1,textAlign:'center',marginTop:150}}>Không có đơn hàng nào</Text>
           
    //     </View>
    //   )
    // } else {
      return (
        <View style={[styles.container, this.props.style]}>
        {this.props.completed?              
             <TopBarWithoutBack
              title="Lịch sử đơn hàng"
              />
              :
              <TopBar
              leftImage={
                    Images.chevronLeft
                }
              leftText={I18n.t('Back')}
              title="Đơn hàng đang xử lý"
              />
              }
          {vm.isLoading ?     
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

            onLoadMoreAsync={this._loadMoreContentAsync}
           
          />
          }
          {this.props.completed?
              <TabBar
                  newTab = 'history'
              />
              :
              null
              }

        </View>
      )
    }
  

}

export default OrderHistoryList
