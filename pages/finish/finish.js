var app = getApp()
const utils = require('../../utils/util.js');
Page({
  data : {
    hotData : [],
    newData: []
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