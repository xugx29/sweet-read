var app = getApp();
const utils = require('../../utils/util.js');
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
  }
})