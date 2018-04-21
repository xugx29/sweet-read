const app = getApp();
const utils = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showMore : false,
    bookInfo : {},
    bookId : 0,
    tuijian: [],
  },
  toggleShowMore:function(){
    this.setData({
      showMore: !this.data.showMore
    })
  },
  readFirst:function(){
    var _this = this;
    utils.utilRequest('/mpApi/chapterlist', { bookId: this.data.bookId, page: 1, orderType: 0 }, 'get', function (data) {
      var firstId = data.data[0].chapterId;
      var isVip = data.data[0].isVip;
      var name = data.data[0].chapterName;
      var count = data.data[0].count
      if (isVip == 0) {
        wx.setStorageSync('readFrom', 'info')
        var bookInfoProgress = wx.getStorageSync('bookIdProgress');
        if (bookInfoProgress.length != 0){
          for (var i = 0; i < bookInfoProgress.length; i++){
            if (bookInfoProgress[i].bookId == _this.data.bookId){
              firstId = bookInfoProgress[i].chapterId
            }
          }
        }
        wx.navigateTo({
          url: '../article/article?id=' + firstId,
          success: function (res) { },
          fail: function (res) { },
          complete: function (res) { },
        })
      } else {
        wx.navigateTo({
          url: '../preview/preview?cost=' + count + '&id=' + id + '&name=' + name,
          success: function (res) { },
          fail: function (res) { },
          complete: function (res) { },
        })
      }
    })
  },
  add2Shelf(event){
    var _this = this;
    var typeId = parseInt(event.currentTarget.dataset.type);
    if (!this.data.bookId || !wx.getStorageSync('userId')) {
      return wx.showToast({
        title: '加入书架失败，请重试',
        icon: 'none',
        duration: 1500,
        mask: true
      })
    }
    utils.utilRequest('/mpApi/add2shelf', { bookId: this.data.bookId, userId: wx.getStorageSync('userId'), type: typeId }, 'get', function (data) {
      var title = typeId == 0 ? '已从书架移除' : '已加入书架'
      if (data.resultCode == 0) {
         wx.showToast({
          title: title,
          icon: 'none',
          duration: 1500,
          mask: true
        })
        var bookInfo = _this.data.bookInfo;
        bookInfo.isshelf = typeId == 0 ? 0 : 1;
        console.log(bookInfo)
        _this.setData({
          bookInfo: bookInfo
        })
        return
      }
    })
  },
  autoBuy(){
    var _this = this;
    if(!this.data.bookId || !wx.getStorageSync('userId')){
      return wx.showToast({
        title: '自动订阅失败，请重试',
        icon: 'none',
        duration: 1500,
        mask: true
      })
    }
    utils.utilRequest('/mpApi/autobuy', { bookId: this.data.bookId, userId: wx.getStorageSync('userId'),type :1},'get',function(data){
      if(data.resultCode == 0){
       wx.showToast({
          title: '自动订阅成功！',
          icon: 'none',
          duration: 1500,
          mask: true
        })
       var bookInfo = _this.data.bookInfo;
       bookInfo.isautobuy = 1;
       _this.setData({
         bookInfo: bookInfo
       })
       return 
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      bookId: options.id
    })
    wx.setStorageSync('bookId', options.id)
    var userId = wx.getStorageSync('userId');
    var postData = {}
    if(!userId){
      postData = {
        bookId: options.id
      }
    }else{
      postData = {
        bookId: options.id,
        userId : userId
      }
    }
    var _this = this;
    utils.utilRequest('/mpApi/bookinfo',postData,'get',function(data){
      _this.setData({
        bookInfo : data.data,
      })
    })
      
    utils.utilRequest('/mpApi/recbooklist',{}, 'get', function (data) {
      _this.setData({
        tuijian: data.data
      })
    })
  },
  navigatorToBookInfo (event){

    // var _this = this;
    // var userId = wx.getStorageSync('userId');
    // var bookId = event.currentTarget.dataset.id;
    // var postData = {}
    // if (!userId) {
    //   postData = {
    //     bookId: bookId
    //   }
    // } else {
    //   postData = {
    //     bookId: bookId,
    //     userId: userId
    //   }
    // }
    // utils.utilRequest('/mpApi/bookinfo', postData, 'get', function (data) {
    //   _this.setData({
    //     bookInfo: data.data
    //   })
    // })

    var bookId = event.currentTarget.dataset.id;
    console.log(bookId)
    wx.redirectTo({
      url: '../bookInfo/bookInfo?id=' + bookId,
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    wx.getSetting({
      success: result => {
        if (!result.authSetting['scope.userInfo']) {
          wx.showModal({
            title: '用户未授权',
            // content: '如需正常使用阅读记录功能，请按确定并在授权管理中选中“用户信息”，然后点按确定。最后再重新进入小程序即可正常使用。',
            content: '如需正常使用甜悦读各项功能，请按确定并在授权管理中选中“用户信息”',
            showCancel: false,
            success: function (res) {
              if (res.confirm) {
                console.log('用户点击确定')
                wx.openSetting({
                  success: setting => {
                    console.log(setting)
                    if (setting.authSetting['scope.userInfo'] == true) {
                      wx.getUserInfo({
                        success: userInfo => {
                          wx.setStorageSync('userInfo', userInfo.userInfo);
                          wx.redirectTo({
                            url: '../index/index',
                          })
                        }
                      })
                    }
                  }
                })
              }
            }
          })
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})