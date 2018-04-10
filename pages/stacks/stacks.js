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
  }
})