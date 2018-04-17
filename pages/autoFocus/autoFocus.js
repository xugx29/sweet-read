var app = getApp();
const utils = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    autoFocusList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this;
    var userId = wx.getStorageSync('userId');
    if(!userId){
      return wx.showToast({
        title: '获取订阅列表失败！',
        icon: 'none',
        duration: 1500,
        mask: true
      })
    }
    utils.utilRequest('/mpApi/autobuylist', { userId: userId }, 'get', function (data) {
      if (data.resultCode == 0) {
        _this.setData({
          autoFocusList : data.data
        })
      }
    })
  },
  changeSwitch (event){
    var _this = this;
    var bookId = event.currentTarget.dataset.id;
    var index = event.currentTarget.dataset.index
      if (!bookId || !wx.getStorageSync('userId')) {
        return wx.showToast({
          title: '取消订阅失败，请重试',
          icon: 'none',
          duration: 1500,
          mask: true
        })
      }
      utils.utilRequest('/mpApi/autobuy', { bookId: bookId, userId: wx.getStorageSync('userId'), type: 0 }, 'get', function (data) {
        if (data.resultCode == 0) {
         wx.showToast({
            title: '取消订阅成功',
            icon: 'none',
            duration: 1500,
            mask: true
          })
          var newArr = [];
         for (var i = 0; i < _this.data.autoFocusList.length;i++) {
           if (_this.data.autoFocusList[i].bookId != bookId){
             newArr.push(_this.data.autoFocusList[i])
           }
         }
          _this.setData({
            autoFocusList: newArr
          })
          return
        }else{
          return wx.showToast({
            title: '取消订阅失败，请重试',
            icon: 'none',
            duration: 1500,
            mask: true
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