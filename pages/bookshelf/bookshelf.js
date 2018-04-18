var app = getApp();
const utils = require('../../utils/util.js');
Page({
  data: {
    shelfData:[]
  },
  onLoad(){
    var _this = this;
    var userId = wx.getStorageSync('userId');
    if(!userId) return;
    utils.utilRequest('/mpApi/shelf', {userId : userId}, 'get', function (res) {
      _this.setData({
        shelfData: res.data
      })
    })
  }
})