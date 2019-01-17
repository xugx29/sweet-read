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
  onShow: function () {
    var _this = this;
    wx.getSetting({
      success : result => {        
        if(JSON.stringify(result.authSetting) == '{}'){
          wx.redirectTo({
            url: '../auth/auth',
            success: function (res) { },
            fail: function (res) { },
            complete: function (res) { },
          })
        }else{
          if (!result.authSetting['scope.userInfo']) {
            console.log(2)
            wx.redirectTo({
              url: '../auth/auth',
              success: function (res) { },
              fail: function (res) { },
              complete: function (res) { },
            })
          }else{
            if (wx.getStorageSync('userInfo') == '' || wx.getStorageSync('userId') == ''){
              wx.redirectTo({
                url: '../auth/auth',
                success: function (res) { },
                fail: function (res) { },
                complete: function (res) { },
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
