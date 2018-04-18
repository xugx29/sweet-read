const app = getApp();
const utils = require('../../utils/util.js');
Page({
  /**
   * 页面的初始数据
   */
  data: {
    bookId : 0,
    page : 1, // 分页页码
    orderType: 0, // 0正序 1倒序
    catalogs : [],
    scrollTop : 0
  },
  changeSort: function(){
    if (this.data.orderType == 1){
      this.setData({
        orderType : 0,
        page:1,
        scrollTop:0
      })
    }else{
      this.setData({
        orderType: 1,
        page: 1,
        scrollTop:0
      })
    }
    this.getData(true);
  },
  jump(event){
    var isVip = event.currentTarget.dataset.vip;
    var id = event.currentTarget.dataset.id;
    var count = event.currentTarget.dataset.count
    if (isVip == 0){
      wx.navigateTo({
        url: '../article/article?id=' + id,
        success: function(res) {},
        fail: function(res) {},
        complete: function(res) {},
      })
    }else{
      wx.navigateTo({
        url: '../preview/preview?cost=' + count + '&id=' + id,
        success: function (res) { },
        fail: function (res) { },
        complete: function (res) { },
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      bookId: options.bookId
    })
    wx.setStorageSync('bookId', options.bookId)
    this.getData();
  },
  getData : function(concat){
    var _this = this;
    utils.utilRequest('/mpApi/chapterlist', { bookId: this.data.bookId, page: this.data.page, orderType: this.data.orderType }, 'get', function (data) {
      _this.setData({
        catalogs: concat == true ? data.data : _this.data.catalogs.concat(data.data),
        page: _this.data.page + 1
      })
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