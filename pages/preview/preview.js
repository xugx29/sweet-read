const app = getApp();
const utils = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    balance: -1, // 1 余额够，0 余额不够
    balanceCount : 0,
    cost:0
  },
  toRead : function(){
    wx.redirectTo({
      url: '../article/article',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  buy : function(){
    var userId = wx.getStorageSync('userId');
    var bookId = wx.getStorageSync('bookId');
    var chapterId = this.data.chapterId;
    if(!userId || !bookId || !chapterId){
      return wx.showToast({
        icon: 'none',
        title: '购买失败，请重试！'
      })
    }else{
      utils.utilRequest('/mpApi/buy', { userId: userId, bookId: bookId, chapterId: chapterId }, 'get', function (data) {
        console.log(data)
        if (data.resultCode == 0){
          wx.navigateTo({
            url: '../article/article?id=' + chapterId,
            success: function (res) { },
            fail: function (res) { },
            complete: function (res) { },
          })
        }else{
          return wx.showToast({
            icon: 'none',
            title: '购买失败，请重试！'
          })
        }
      })
    }
  },
  pay(){
    return wx.redirectTo({
      url: '../personal/personal',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      this.setData({
        chapterId: options.id
      })
      var userId = wx.getStorageSync('userId')
      var _this = this;
      utils.utilRequest('/mpApi/userinfo', { userId: userId }, 'get', function (data) {
        _this.setData({
          balanceCount: data.data.count
        })
        var balanceTarget = data.data.count > options.cost ? 1 : 0;
        _this.setData({
          balance: balanceTarget,
          cost: options.cost
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