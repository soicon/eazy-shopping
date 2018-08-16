import { observable } from 'mobx'
import { Actions } from 'react-native-router-flux'
import { AsyncStorage } from 'react-native'
import BaseViewModel from '../../Models/BaseViewModel'
import Categories from '../../Models/Categories'
import Items, { ItemsModel } from '../../Models/Items'
import Snackbar from 'react-native-snackbar'
import { Colors } from '../../Themes'
import { ItemModel } from '../../Models/Item'
import User from '../../Models/User'

export class HomeStore extends BaseViewModel {
  @observable catIsLoading = false
  @observable subCategories = []
  @observable allItems = []
  @observable featuredItems = []
  @observable currentScreen = 'explore'
  @observable currentCategoryIndex = null
  @observable searchModalOpen = false
  @observable subCategoryLoading = false
  @observable nearestLocation = null
  @observable radius = null
  @observable followingScreen = [0]
  @observable pagingLoad = false
  @observable totalAllitems = 0
  @observable totalFeatured = 0
  @observable homeSubCategoryVisible = false
  @observable leafCategory = false
  @observable currentSubCategoryIndex = null
  @observable searchText = ''
  @observable oldSearchText = ''
  // @observable screens = [
  //   {title: 'All'}, {title: 'Feature'}
  // ]

  onLocationChange = location => {
    this.nearestLocation = location
  }
  onRadiusChange = radius => {
    this.radius = radius
  }
  onSearchModalClick = () => {
    this.searchModalOpen = !this.searchModalOpen
  }
  changeCurrentScreen = screen => {
    this.currentScreen = screen
  }
  onSearchTextChange = text => {
    this.searchText = text
  }

  onCurrentCategoryChange = async (categoryIndex, f, s) => {
    this.currentCategoryIndex = categoryIndex
    if (categoryIndex !== -1) {
      await this.loadHomeSubCategories(this.categories[categoryIndex].id, f, s)
      this.allItems = []
      await this.loadAllItemsWithCategory(
        this.categories[categoryIndex].id,
        false
      )
    }
  }
  onCurrentSubCategoryChange = async categoryIndex => {
    this.currentSubCategoryIndex = categoryIndex
    await this.loadAllItemsWithCategory(
      this.subCategories[categoryIndex].id,
      false
    )
  }

  loadHomeCategories = () => {
    console.log('loading...')
    this.catIsLoading = true
    this.categories = []
    
    return Categories.loadCategories({}, { parent_category })
      .then(cats => {
        this.catIsLoading = false
        cats.map((val, index) => {
          this.categories.push({ ...val, parent: true })
        })

        console.log('data from store'+this.categories)
      })
      .catch(e => {
        this.catIsLoading = false
       
      })
  }



  resetCategories = async foo => {
    await this.loadAllItems()
    this.subCategories = []
    this.homeSubCategoryVisible = false
    this.currentCategoryIndex = -1
    this.currentSubCategoryIndex = -1
    this.leafCategory = false
    foo ? foo() : null
  }

  loadHomeSubCategories = async (parent_category) => {
    this.homeSubCategoryVisible = true
    this.isLoading = true

    console.log('PARENT => ', parent_category)
    this.subCategories = []
    return Categories.loadCategories({}, { parent_category })
    .then(cats => {
      
      cats.map((val, index) => {
        this.subCategories.push({ ...val, parent: true })
        
      })
      this.isLoading = false
      console.log('data from store'+this.subCategories)
  })
}

  loadAllItems = async ( searchText) => {
    try {
        console.log("Start loading")
        let optionsParams = {
          text: searchText || this.searchText
        }

        // searchText ? (options.title = this.searchText) : null
        await Items.loadAllItems(optionsParams).then(async (res) =>{
          console.log('itemsLoaded')
          this.allItems = [...this.allItems, ...res]
          this.totalAllitems = Items.allItemsPaging.total
          this.pagingLoad = false
        })
      
      
    } catch (e) {
      this.isLoading = false
      this.pagingLoad = false
      console.log('loadAllItemsError => ', e)
    }
  }

  loadAllItemsWithCategory = async (category) => {
    this.isLoading = true
    this.allItems=[]
    try {

      return Items.loadCategoryItem({ category }).then(cats => {
        
        
        cats.map((val, index) => {
          this.allItems.push({ ...val, parent: true })
        })
        Actions.ProductList({items:this.allItems})
        this.isLoading = false
      })
    } catch (e) {
      Items.isDisconnected(e)
      this.isLoading = false
      this.pagingLoad = false
      if (e._message === 'No data to show') {
        this.allItems = []
      }
      console.log('loadAllItemsError => ', e)
    }
  }




  onSearchPress = async ({title}) => {
    console.log('searching....')
    this.allItems = []
    this.isLoading  = true
    let res = false
    let optionalParams = {
      text: title
    }
   
    try {
        await Items.loadAllItems(optionalParams).then(async (res) =>{
          this.allItems = Items.allItems
          console.log('data from home store'+this.allItems)
          this.isLoading = false
          Actions.ProductList({items:this.allItems})
          return res
        })

    } catch (e) {
      
      this.allItems = []
      console.log('FILTER ERROR => ', e)
     
      this.isLoading = false

      this.errors = e
      return res
    }
  }

  onSearchSave = async ({
    catIndex,
    priceMin,
    priceMax,
    title,
    subCategoryIndex,
    isFeatured
  }) => {
    this.onSearchModalClick()
    let options = {
      from_price: priceMin,
      to_price: priceMax,
      title: title
    }
    catIndex && catIndex != -1
      ? (options.category = this.categories[catIndex].id)
      : null
    subCategoryIndex && subCategoryIndex != -1
      ? (options.category = this.subCategories[subCategoryIndex].id)
      : null

    if (this.nearestLocation) {
      options.latitude = this.nearestLocation.latitude
      options.longitude = this.nearestLocation.longitude
    }
    try {
      await Items.saveSearchItem(options)
      Snackbar.show({
        title: 'Filter saved successfully',
        length: 3000,
        backgroundColor: Colors.mainColor
      })
    } catch (e) {
      console.log('FILTER SAVE ERROR => ', e)
      Snackbar.show({
        title: 'There is an error, please try again later',
        length: 3000,
        backgroundColor: Colors.mainColor
      })
      this.errors = e
      Items.isDisconnected(e)
    }
  }

  loadFollowedUsers = async () => {
    try {
      this.isLoading = true
      await User.getUserFollowingList()
      this.followingList = User.followingList
      return this.followingList
    } catch (e) {
      console.log('FOLLOWED LIST ERROR => ', e)
      this.errors = e
    }
  }

  loadOtherSellerItems = async ownerId => {
    try {
      let res = await Items.loadOtherSellerItems(ownerId)
      console.log('otherSllerItems1 => ', res)
      return res
    } catch (e) {
      User.isDisconnected(e)
      console.log('ERROR LOADING OTHER SELLER ITEMS => ', e)
      this.errors = e
    }
  }
}

export default new HomeStore()
