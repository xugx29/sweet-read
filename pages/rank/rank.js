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
      console.log(JSON.parse(res));
      _this.setData({
        rankArr4: res
      })
    })
    console.log(this.data)
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