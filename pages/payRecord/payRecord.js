var app = getApp();
const utils = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    page :1,
    records : [],
    allowToRequest:true
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getData(true);
  },
  getData(isOnLoad){
    if (!this.data.allowToRequest) return;
    var _this = this;
    var userId = wx.getStorageSync('userId');
    if(!userId) return;
    utils.utilRequest('/mpApi/chargelog', { userId: userId, page: this.data.page }, 'GET', function (data) {
      _this.setData({
        page : _this.data.page + 1,
        records: _this.data.records.concat(data.data)
      })
      if(data.data.length < 20){
        _this.setData({
          allowToRequest : false
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