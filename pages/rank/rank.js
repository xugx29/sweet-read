var app = getApp();
const utils = require('../../utils/util.js');
Page({
  data: {
    currentTab: 0,
    rankArr1: [],
    rankArr2: [],
    rankArr3: [],
    rankArr4: []
  },
  onShow(){
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
  onLoad: function (options) {
    var _this = this;
    // 页面初始化 options为页面跳转所带来的参数
    // /mpApi/top
    utils.utilRequest('/mpApi/top', {type: 0}, 'get', function (res) {
      console.log(res.data)
      _this.setData({
        rankArr1: res.data
      })
    })
    utils.utilRequest('/mpApi/top', {type: 1},'get',function(res){
      _this.setData({
        rankArr2: res.data
      })
    })
    utils.utilRequest('/mpApi/top', {type: 2}, 'get', function (res) {
      _this.setData({
        rankArr3: res.data
      })
    })
    utils.utilRequest('/mpApi/top', {type: 3}, 'get', function (res) {
      _this.setData({
        rankArr4: res.data
      })
    })
  },
  //滑动切换
  swiperTab: function (e) {
    var that = this;
    that.setData({
      currentTab: e.detail.current
    });
  },
  //点击切换
  clickTab: function (e) {
    var that = this;
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
  }
})