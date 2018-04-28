//index.js
//获取应用实例
const app = getApp()
const utils = require('../../utils/util.js');
Page({
  data: {
    defaultSearchKeyWords: '买一送一：嫁给亿万首席',
    searchKeywords: '',
    swiperImgUrls: [],
    adImgUrls1:[],
    adImgUrls2: [],
    recommendArr : [],
    guimiredu: [],
    duanyanqing: [],
    guyanArr: [],
    xianyanArr: [],
    otherArr :[]
  },
  searchInputBlur:function(event){
    var keywords = event.detail.value;
    this.setData({
      searchKeywords: keywords
    })
  },
  toSearch:function(event){
    var keywords = this.data.searchKeywords == '' ? this.data.defaultSearchKeyWords : this.data.searchKeywords
    wx.navigateTo({
      url: '../search/search?keywords=' + keywords,
    })
  },
  login (userInfo){
    wx.login({
      success : res => {
        console.log(res)
        utils.utilRequest('/mpApi/getopenid',{code :res.code},'get',function(data){
          var openid = data.openid;
          wx.setStorageSync('openId',openid)
          var postData = { openid: openid, logo: userInfo.avatarUrl, nickname: userInfo.nickName };
          if (data && data.unionid){
            postData.unionId = data.unionid
          }
          utils.utilRequest('/mpApi/login', postData , 'get', function (result) {
            wx.setStorageSync('userId', result.data.userId);
          })
        })
      }
    })
  },
  onShow: function () {
    var _this = this;
    wx.getSetting({
      success : result => {        
        if(JSON.stringify(result.authSetting) == '{}'){
          console.log(1)
          return wx.getUserInfo({
            success : userInfo => {
              console.log(userInfo);
              wx.setStorageSync('userInfo', userInfo.userInfo);
              _this.login(userInfo.userInfo)
            }
          })
        }else{
          if (!result.authSetting['scope.userInfo']) {
            console.log(2)
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
                        return wx.getUserInfo({
                          success: userInfo => {
                            wx.setStorageSync('userInfo', userInfo.userInfo)
                          }
                        })
                      }
                    }
                  })
                  // wx.getSetting({
                  //   success : result => {
                  //     if (!result.authSetting['scope.userInfo']) {
                  //       return wx.getUserInfo({
                  //         success: userInfo => {
                  //           console.log(userInfo);
                  //           wx.setStorageSync('userInfo', userInfo.userInfo);
                  //           _this.login(userInfo.userInfo)
                  //         }
                  //       })
                  //     }
                  //   }
                  // })
                }
              }
            })
          }else{
            if (wx.getStorageSync('userInfo') == '' || wx.getStorageSync('userId') == ''){
              return wx.getUserInfo({
                success: userInfo => {
                  console.log(userInfo);
                  wx.setStorageSync('userInfo', userInfo.userInfo);
                  _this.login(userInfo.userInfo)
                }
              })
            }
          }
        }
      }
    })
   

  },
  onLoad (){
    if (!wx.getStorageSync('bookIdProgress')){
      wx.setStorageSync('bookIdProgress',[])
    }
    var _this = this;
    utils.utilRequest('/mpApi/homepage', {}, 'get', function (result) {
      if(result.resultCode == 0){
        var hdt1 = result.data.hdt1;
        var hdt2 = result.data.hdt2;
        hdt1[0].bookId = hdt1[0].url.replace(/[^0-9]/ig, "")
        hdt2[0].bookId = hdt2[0].url.replace(/[^0-9]/ig, "")
        var lbt = result.data.lbt
        for(var i = 0; i < lbt.length; i++){
          lbt[i].bookId = lbt[i].url.replace(/[^0-9]/ig, "")
        }
        _this.setData({
          recommendArr: result.data.bqtj,
          guimiredu: result.data.gmrd,
          duanyanqing: result.data.rxdyq,
          guyanArr: result.data.rxgy,
          xianyanArr: result.data.rxxy.slice(0,6),
          otherArr: result.data.rxxy.slice(6),
          adImgUrls1: hdt1,
          adImgUrls2: hdt2,
          swiperImgUrls: lbt
        })
      }
    })
  }
})
