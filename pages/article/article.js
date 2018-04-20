// pages/article.js
const utils = require('../../utils/util.js');
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    backgroundClass : '',
    showFontSize:20,
    fontSize:1,
    showBottomMenu : false,
    showSetting :false,
    light: !true,
    article: '',
    prevId:'',
    nextId : '',
    name: ''
  },
  operationClick:function(){
    return;
  },
  contentClick : function(event){
    this.setData({
      showBottomMenu: !this.data.showBottomMenu
    })
  },
  prev (event){
    var id = event.currentTarget.dataset.id;
    if(id == 0){
      return wx.showToast({
        title: '这是第一章！',
        icon: 'none',
        duration: 1500,
        mask: true
      })
    }else{
      wx.redirectTo({
        url: '../article/article?id=' + id,
      })
    }
  },
  next(event) {
    var id = event.currentTarget.dataset.id;
    if (id == 0) {
      return wx.showToast({
        title: '这是最后一章！',
        icon: 'none',
        duration: 1500,
        mask: true
      })
    } else {
      wx.redirectTo({
        url: '../article/article?id=' + id,
      })
    }
  },
  changeLight:function(){
    if(!this.data.light){
      this.setData({
        backgroundClass: 'night'
      })
    }else{
      this.setData({
        backgroundClass: ''
      })
    }
    this.setData({
      light: !this.data.light
    })
  },
  showSettingContent:function(){
    this.setData({
      showSetting: !this.data.showSetting
    })
  },
  changeBackgroundAndColor: function (event){
     var className = event.currentTarget.dataset.id;
     this.setData({
       backgroundClass: className
     })
  },
  changeFontSize: function (event){
    var types = event.currentTarget.dataset.type;
    if(types=='sub'){
      // 减小字体
      if (this.data.showFontSize <= 12){
        return wx.showToast({
          icon : 'none',
          title : '字体不能再小了！'
        })
      }
      this.setData({
        fontSize: this.data.fontSize - 0.07,
        showFontSize: this.data.showFontSize - 1
      })
    }else{
      if (this.data.showFontSize >= 30) {
        return wx.showToast({
          icon: 'none',
          title: '字体不能再大了！'
        })
      }
      this.setData({
        fontSize: this.data.fontSize + 0.07,
        showFontSize: this.data.showFontSize + 1
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this;
    var id = options.id;
    var userId = wx.getStorageSync('userId')
    var bookId = wx.getStorageSync('bookId')
    if (!id || !userId || !bookId){
      wx.showToast({
        title: '获取文章失败！',
        icon: 'none',
        duration: 1500,
        mask: true,
        success:function(){
          setTimeout(function(){
            wx.redirectTo({
              url: '../catalog/catalog?bookId=' + bookId,
              success: function (res) { },
              fail: function (res) { },
              complete: function (res) { },
            })
          },1500)
        }
      })
    }else{
      utils.utilRequest('/mpApi/chapter', { bookId: bookId, userId: userId, chapterId: id }, 'get', function (data) {
        _this.setData({
          article: data.data.content.replace(/<p>/g, '<p class="duanluo">').replace(/<br\/>/g, '<br/>　　'),
          name: data.data.name,
          prevId: data.data.previousId,
          nextId: data.data.nextId,
        })
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },
  gotoCatelog (){
    // return console.log(getCurrentPages())
    var bookId = wx.getStorageSync('bookId')
    wx.navigateBack(1)
    // wx.redirectTo({
      // url: '../catalog/catalog?bookId=' + bookId,
      // success: function(res) {},
      // fail: function(res) {},
      // complete: function(res) {},
    // })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})