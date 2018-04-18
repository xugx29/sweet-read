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
    tuijian: []
  },
  toggleShowMore:function(){
    this.setData({
      showMore: !this.data.showMore
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
        bookInfo : data.data
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