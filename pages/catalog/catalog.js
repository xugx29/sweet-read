const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    asc : 1,
    catalogs : [
      '第一章：阿斯顿和勤务i多哈赛',
      '第二章：阿斯顿和勤务i多哈赛',
      '第三章：阿斯顿和勤务i多哈赛',
      '第四章：阿斯顿和勤务i多哈赛',
      '第五章：阿斯顿和勤务i多哈赛'
    ]
  },
  changeSort: function(){
    if(this.data.asc == 1){
      this.setData({
        asc : 0,
        catalogs: this.data.catalogs.reverse()
      })
    }else{
      this.setData({
        asc: 1,
        catalogs: this.data.catalogs.reverse()
      })
    }
  },
  toReadBook:function(event){
    var balance = event.currentTarget.dataset.balance;
    var cost = event.currentTarget.dataset.cost;
    wx.navigateTo({
      url: '../preview/preview?cost=' + cost + '&balance=' + balance,
    })
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