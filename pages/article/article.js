// pages/article.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    backgroundClass : '',
    showFontSize:20,
    fontSize:0.94,
    showBottomMenu : false,
    showSetting :false,
    light: !true,
    article: '不做安家儿女不做安家儿女不做安家儿女不做安家儿女不做安家儿女不做安家儿女不做安家儿女不做安家儿女不做安家儿女不做安家儿女不做安家儿女不做安家儿女不做安家儿女不做安家儿女不做安家儿女不做安家儿女不做安家儿女不做安家儿女不做安家儿女不做安家儿女不做安家儿女不做安家儿女不做安家儿女不做安家儿女不做安家儿女不做安家儿女不做安家儿女不做安家儿女不做安家儿女不做安家儿女不做安家儿女不做安家儿女不做安家儿女不做安家儿女不做安家儿女不做安家儿女不做安家儿女不做安家儿女不做安家儿女不做安家儿女不做安家儿女不做安家儿女不做安家儿女不做安家儿女不做安家儿女不做安家儿女不做安家儿女不做安家儿女不做安家儿女不做安家儿女不做安家儿女不做安家儿女不做安家儿女不做安家儿女不做安家儿女不做安家儿女不做安家儿女不做安家儿女不做安家儿女不做安家儿女不做安家儿女不做安家儿女不做安家儿女不做安家儿女不做安家儿女不做安家儿女不做安家儿女不做安家儿女不做安家儿女不做安家儿女不做安家儿女不做安家儿女不做安家儿女不做安家儿女不做安家儿女不做安家儿女不做安家儿女不做安家儿女不做安家儿女不做安家儿女不做安家儿女不做安家儿女不做安家儿女不做安家儿女不做安家儿女不做安家儿女不做安家儿女不做安家儿女不做安家儿女不做安家儿女不做安家儿女不做安家儿女不做安家儿女不做安家儿女不做安家儿女不做安家儿女不做安家儿女不做安家儿女不做安家儿女不做安家儿女不做安家儿女不做安家儿女不做安家儿女不做安家儿女不做安家儿女不做安家儿女不做安家儿女不做安家儿女不做安家儿女不做安家儿女不做安家儿女不做安家儿女不做安家儿女不做安家儿女不做安家儿女不做安家儿女不做安家儿女不做安家儿女不做安家儿女不做安家儿女不做安家儿女不做安家儿女不做安家儿女不做安家儿女不做安家儿女不做安家儿女不做安家儿女不做安家儿女不做安家儿女不做安家儿女不做安家儿女不做安家儿女不做安家儿女不做安家儿女不做安家儿女不做安家儿女不做安家儿女不做安家儿女'
  },
  operationClick:function(){
    return;
  },
  contentClick : function(event){
    this.setData({
      showBottomMenu: !this.data.showBottomMenu
    })
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
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
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