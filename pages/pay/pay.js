var app = getApp();
const utils = require('../../utils/util.js');
var md5 = require('../../utils/js-md5.js')
Page({
  data:{
    payLevel : []
  },
  onLoad:function(){
    var _this = this;
    utils.utilRequest('/mpApi/chargelevel', {}, 'get', function (res) {
      _this.setData({
        payLevel: res.data
      })
    })
  },
  pay (event) {
    var _this = this;
    var money = parseInt(event.currentTarget.dataset.money);
    var dou = parseInt(event.currentTarget.dataset.dou);
    var gift = parseInt(event.currentTarget.dataset.gift)
    var userId = parseInt(wx.getStorageSync('userId'));
    var openId = wx.getStorageSync('openId');
    utils.utilRequest('/mpApi/pay', { userId: userId, openId: openId, count: dou + gift,amount:money }, 'get', function (data) {
      var packageStr = ''
      for(var n in data.data) {
        packageStr = n + '=' + data.data[n]
      }
      var randomStr = _this.randomString();
      var times = new Date().getTime();
      var signStr = 'appId=wx1f25115057119243&nonceStr=' + randomStr + '&package=' + packageStr + '&signType=MD5&timeStamp=' + times + '&key=shanghdingtian201811111111111111'
      console.log(signStr,'|',md5(signStr))
      var sign = md5(signStr);
      wx.requestPayment({
        timeStamp: times.toString(),
        nonceStr: randomStr,
        package: packageStr,
        signType:'MD5',
        paySign: sign.toString().toUpperCase(),
        success: function(){
          wx.redirectTo({
            url: '../personal/personal',
          })
        }
      })
    })
    console.log(money,dou)
  },
  randomString(len) {
    　　len = len || 32;
    　　var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';    // 去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1
    　　var maxPos = $chars.length;
    　　var pwd = '';
    　　for(var i = 0; i <len; i++) {
  　　　　pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
　　}
　　return pwd;
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