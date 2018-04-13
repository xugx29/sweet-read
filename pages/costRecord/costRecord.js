var app = getApp();
const utils = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    page: 1,
    records: [],
    allowToRequest: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getData(true);
  },
  getData(isOnLoad) {
    console.log(this.data)
    if (!this.data.allowToRequest) return;
    var _this = this;
    var userId = wx.getStorageSync('userId');
    if (!userId) return;
    utils.utilRequest('/mpApi/readlog', { userId: userId, page: this.data.page }, 'GET', function (data) {
      _this.setData({
        page: _this.data.page + 1,
        records: isOnLoad ? data.data : _this.data.records.contact(data.data)
      })
      if (data.data.length < 20) {
        _this.setData({
          allowToRequest: false
        })
      }
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