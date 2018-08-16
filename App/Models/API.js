var get = {
  method: 'get'
}
var getWithToken = {
  method: 'get',
  useUserToken: true
}
var post = {
  method: 'post'
}
var postWithToken = {
  method: 'post',
  useUserToken: true
}

var deleteWithToken = {
  method: 'delete',
  useUserToken: true
}
var putWithToken = {
  method: 'put',
  useUserToken: true
}
export default {
  getCode: {
    ...post,
    url: `generate?`
  },
  completedOrder: {
    ...getWithToken,
    url: `getCompletedForBuyer`
  },
  processingdOrder: {
    ...getWithToken,
    url: `getProcessingForBuyer`
  },
  itemSearch: {
    ...getWithToken,
    url: `search?`
  },
  login: {
    ...post,
    url: `login`
  },
  register: {
    ...post,
    url: `register`
  },
  forgetPassword: {
    ...post,
    url: `reset_password`
  },
  addFeedback: {
    ...postWithToken,
    url: `add`
  },
  cancelOrder: {
    ...putWithToken,
    url: `buyerCancelOrder`
  },
  deleteAddress: {
    ...postWithToken,
    url: `removeAddress?`
  },
  logout: {
    ...getWithToken,
    url: `logout`
  },
  resendCode: {
    ...post,
    url: `resend_code`
  },
  receivedOrder: {
    ...putWithToken,
    url: `buyerReceivedOrder`
  },

  categories: {
    ...getWithToken,
    url: `/getByParentId`
  },
  getBuyerProfile: {
    ...getWithToken,
    url: `getByUsername?`
  },
  items: {
    ...getWithToken,
    url: `getByCategory`
  },
  item: {
    ...getWithToken,
    url: `getByCode?`
  },
  makeOrder: {
    ...postWithToken,
    url: `add`
  },
  updateDeviceId: {
    ...putWithToken,
    url: `updateDeviceID`
  },
  userWishList: {
    ...getWithToken,
    url: `search?`
  },
  getNotification: {
    ...getWithToken,
    url: 'getAllBuyerNotification'
  },
  followUser: {
    ...postWithToken,
    url: 'follow_user'
  },
  userFollowingList: {
    ...getWithToken,
    url: 'user_following_list'
  },
  blockUser: {
    ...postWithToken,
    url: 'block_user'
  },
  userBlockingList: {
    ...getWithToken,
    url: 'user_block_list'
  },
  rateUser: {
    ...postWithToken,
    url: 'rate_user'
  },
  updateBuyerProfile: {
    ...putWithToken,
    url: `updateInfo`
  },
  saveSearchItem: {
    ...postWithToken,
    url: 'save_item_search'
  },
  saveItem: {
    ...postWithToken,
    url: 'save_item'
  },
  deleteItem: {
    ...postWithToken,
    url: 'delete_item'
  },
  preprationItem: {
    ...getWithToken,
    url: 'prepration_item_form'
  },
  makeOffer: {
    ...postWithToken,
    url: 'send_offer'
  },
  reportReasons: {
    ...getWithToken,
    url: 'reporting_types'
  },
  reportItem: {
    ...postWithToken,
    url: 'report_item'
  },

  offersList: {
    ...postWithToken,
    url: 'offers_item'
  },
  addAddress: {
    ...postWithToken,
    url: `addAddress?`
  },
  upgradeReq: {
    ...postWithToken,
    url: 'upgrade_account_req'
  },
  upgradePay: {
    ...postWithToken,
    url: 'upgrade_account_pay'
  },
  conversations: {
    ...getWithToken,
    url: 'my_chats'
  },
  getUrl: {
    ...get,
    url: 'get_url_schema'
  },
  deleteChat: {
    ...postWithToken,
    url: 'delete_chat'
  },
  myNotifications: {
    ...getWithToken,
    url: 'my_notifications'
  },

  deleteNotification: {
    ...getWithToken,
    url: 'delete_notifications'
  },
  deleteNotification2: {
    ...postWithToken,
    url: 'delete_notifications'
  },
  contactUsList: {
    ...getWithToken,
    url: 'list_contactus_status'
  },
  contactUs: {
    ...postWithToken,
    url: 'contactus'
  },
  getUserType: {
    ...postWithToken,
    url: 'get_user_type'
  },
  setUserConfig: {
    ...postWithToken,
    url: 'set_user_config'
  },
  getUserConfig: {
    ...postWithToken,
    url: 'get_user_config'
  },
  uploadImage: {
    ...postWithToken,
    url: 'upload_image'
  }
}
