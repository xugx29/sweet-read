var app = getApp()
Page({
  toInfo : function(event){
    var type = event.currentTarget.dataset.type;
    wx.redirectTo({
      url: '../stackInfo/stackInfo?type=' + type,
    })
  }
})