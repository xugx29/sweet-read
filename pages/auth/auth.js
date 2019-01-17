// pages/auth/auth.js
const utils = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
      auth: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中...'
    })
    wx.getSetting({
      success: result => {
        console.log(result);
        if (JSON.stringify(result.authSetting) != '{}' && result.authSetting['scope.userInfo'] && wx.getStorageSync('userInfo') != '' && wx.getStorageSync('userId') != '') {
          wx.redirectTo({
            url: '../index/index',
            success: function (res) { },
            fail: function (res) { },
            complete: function (res) { },
          })
        } else {
          wx.hideLoading()
          this.setData({
            auth: true
          })
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  },
  getUserInfoFun: function (res) {
    console.log(res);
    if (res.detail.errMsg == 'getUserInfo:fail auth deny') {
      return;
    }
    wx.setStorageSync('userInfo', res.detail.userInfo);
    this.login(res.detail, res.detail.userInfo)
  },
  login(user, userInfo) {
    wx.login({
      success: res => {
        console.log(res)
        utils.utilRequest('/mpApi/getopenid', { code: res.code }, 'get', function (data) {
          var openid = data.openid;
          var sessionKey = data.session_key;
          var iv = user.iv;
          var encryptedData = user.encryptedData;
          wx.setStorageSync('openId', openid)
          console.log(user);
          var postData = { openid: openid, logo: userInfo.avatarUrl, nickname: userInfo.nickName, iv: iv, sessionKey: sessionKey, encryptedData: encryptedData };
          utils.utilRequest('/mpApi/login', postData, 'get', function (result) {
            wx.setStorageSync('userId', result.data.userId);
            wx.showToast({
              title: '加载中...',
              mask: true,
              icon: 'loading'
            })
            wx.redirectTo({
              url: '../index/index',
              success: function (res) { },
              fail: function (res) { },
              complete: function (res) { },
            })
          })
        })
      }
    })
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