var app = getApp()
const utils = require('../../utils/util.js');
Page({
  data : {
    fc : [],
    mc : [],
    fcCover: ['../images/xuanhuan.jpg', '../images/xuanyi.jpg', '../images/youxi.jpg', '../images/junshi.jpg', '../images/xiandai.jpg', '../images/wuxia.jpg'],
    mcCover: ['../images/mc-1.jpg', '../images/mc-2.jpg', '../images/mc-4.jpg', '../images/mc-5.jpg', '../images/img4.jpg', '../images/img5.jpg'],
  },
  onLoad : function(){
    var _this = this;
    utils.utilRequest('/mpApi/category',{},'GET',function(data){
      console.log(data.data);
      _this.setData({
        mc : data.data.mc,
        fc : data.data.fc
      })
    })
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
  }
})