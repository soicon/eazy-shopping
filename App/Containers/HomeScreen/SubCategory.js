import React from 'react'
import {
  ScrollView,
  Text,
  View,
  TouchableOpacity,

} from 'react-native'
import Image from 'react-native-remote-svg'
import GridView,{SuperGridSectionList} from 'react-native-super-grid'

import { Colors, Images, Metrics, Fonts } from '../../Themes'

import vm from './HomeStore'

import { observer } from 'mobx-react/native'

import { Actions } from 'react-native-router-flux'

// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
// Styles
import {

  PacmanIndicator,

} from 'react-native-indicators';
import styles from './HomeScreenStyle'

import I18n from 'react-native-i18n'
import TopBar from '../../Components/TopBar'

@observer 
class SubCategory extends React.Component {
  constructor () {
    super()
    
    this.state = {
      typeCate:'',
    }
  }
  componentWillMount () {
    // Actions.refresh({key:'SubCategory' })
    // console.log(this.props.parentId)
    // console.log(this.props.typeCate)
    this.setState({typeCate:this.props.typeCate})
    if(this.state.typeCate==2){
      vm.followingScreen[2] = this.props.parentId
      console.log("screen data "+ vm.followingScreen[2])
    }
    vm.loadHomeSubCategories(this.props.parentId)
    //setTimeout(()=> {}, 500);
  }



  componentWillUnmount() {
    //clearInterval(this.state.interval);
    console.log("type "+this.props.typeCate)
  }

  componentWillReceiveProps (nextProps) {
    if (this.nextProps.parentId !=this.props.parentId) {
      //this.update()
      this.setState({typeCate:this.props.typeCate})
      vm.loadHomeSubCategories(this.props.parentId)
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
  getProduct(categoryId) {
    vm.loadAllItemsWithCategory(categoryId)
  }






  renderCategory= () => {   
    return (
      <View style= {{ flex:1,marginBottom: 10,marginTop:10,backgroundColor:'white'}}>              
      <View    
      style={{
            flexDirection: 'row',
            alignSelf: 'flex-start',
            marginTop: 15,
            position: 'absolute',
            backgroundColor:'white'
          }}>
          <Text     
                style={{
                  fontSize:18,
                  paddingLeft:10,
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
              console.log("type "+this.state.typeCate)
              if(this.state.typeCate===2) { 
                this.getProduct(item.categoryId)
               

              }else{
                Actions.SubCategory({parentId:item.categoryId,typeCate:item.type})
              }
            }}>
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


  render () {

    return (

      <View style={styles.mainView}>

            <TopBar
              leftImage={
                    Images.chevronLeft
                }
              leftText={I18n.t('Back')}
              title="Danh Mục"
              leftAction={()=> {
                if(this.state.typeCate==2){
                  console.log('typeCate'+ this.state.typeCate)
                  console.log('typeCate'+ vm.followingScreen[1])
                  vm.loadHomeSubCategories(vm.followingScreen[1])
                  Actions.pop()
                 
                }else{
                  console.log('typeCate'+ this.state.typeCate)
                  vm.loadHomeSubCategories(vm.followingScreen[0])
                  Actions.pop()
                }
              }
            }

                
              />
      <ScrollView>
        <View style={{flex:1,zIndex:0}}>
         {vm.isLoading?            
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
          />:
          this.renderCategory()
         }
        </View>

      </ScrollView>


      </View>
     
    )
  }

}

export default SubCategory
