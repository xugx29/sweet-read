var app = getApp()
const utils = require('../../utils/util.js');
Page({
  data : {
    hotData : [],
    newData: []
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
  navigateToSearchFinish(event){
    var type = event.currentTarget.dataset.id;
    wx.redirectTo({
      url: '../finishSearch/finishSearch?type=' + type
    })
  },
  onLoad (){
    var _this = this;
    utils.utilRequest('/mpApi/finishibook', { type: 0, cid: 0, isfree :-1}, 'get', function (data) {
      if (data.resultCode == 0) {
        _this.setData({
          hotData: data.data.slice(0, 6)
        })
      }
    })
    utils.utilRequest('/mpApi/finishibook', { type: 1, cid: 0, isfree: -1 }, 'get', function (data) {
      if (data.resultCode == 0) {
        _this.setData({
          newData: data.data.slice(0,4)
        })
      }
    })
  }
})