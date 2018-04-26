const app = getApp();
const utils = require('../../utils/util.js');
Page({
  /**
   * 页面的初始数据
   */
  data: {
    bookId : 0,
    page : 1, // 分页页码
    orderType: 0, // 0正序 1倒序
    catalogs : [],
    scrollTop : 0,
    currentChapterId: -10000
  },
  changeSort: function(){
    if (this.data.orderType == 1){
      this.setData({
        orderType : 0,
        page:1,
        scrollTop:0
      })
    }else{
      this.setData({
        orderType: 1,
        page: 1,
        scrollTop:0
      })
    }
    this.getData(true);
  },
  jump(event){
    var isVip = event.currentTarget.dataset.vip;
    var id = event.currentTarget.dataset.id;
    var name = event.currentTarget.dataset.name;
    var count = event.currentTarget.dataset.count
    if (isVip == 0){
      wx.setStorageSync('readFrom', 'catalogList')
      wx.navigateTo({
        url: '../article/article?id=' + id,
        success: function(res) {},
        fail: function(res) {},
        complete: function(res) {},
      })
    }else{
      wx.navigateTo({
        url: '../preview/preview?cost=' + count + '&id=' + id + '&name=' + name,
        success: function (res) { },
        fail: function (res) { },
        complete: function (res) { },
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      bookId: options.bookId
    })
    var _this = this;
    wx.setStorageSync('bookId', options.bookId);
  },
  onShow:function(){
    wx.getSetting({
      success: result => {
        if (!result.authSetting['scope.userInfo']) {
          wx.showModal({
            title: '用户未授权',
            // content: '如需正常使用阅读记录功能，请按确定并在授权管理中选中“用户信息”，然后点按确定。最后再重新进入小程序即可正常使用。',
            content: '如需正常使用甜悦读各项功能，请按确定并在授权管理中选中“用户信息”',
            showCancel: false,
            success: function (res) {
              if (res.confirm) {
                console.log('用户点击确定')
                wx.openSetting({
                  success: setting => {
                    console.log(setting)
                    if (setting.authSetting['scope.userInfo'] == true) {
                      wx.getUserInfo({
                        success: userInfo => {
                          wx.setStorageSync('userInfo', userInfo.userInfo);
                          wx.redirectTo({
                            url: '../index/index',
                          })
                        }
                      })
                    }
                  }
                })
              }
            }
          })
        }
      }
    })
    this.setData({
      scrollTop: 0,
      page : 1
    })
    var _this = this;
    this.getData(true, function(){
      var booksProgress = wx.getStorageSync('bookIdProgress');
      if (!!booksProgress) {
        for (var i = 0; i < booksProgress.length; i++) {
          if (booksProgress[i].bookId == _this.data.bookId) {
            console.log(booksProgress[i].chapterId)
            _this.setData({
              currentChapterId: booksProgress[i].chapterId
            })
          }
        }
      }
    });
  },
  getData : function(concat,cb){
    cb = cb || function(){};
    var _this = this;
    utils.utilRequest('/mpApi/chapterlist', {userId:wx.getStorageSync('userId'),bookId: this.data.bookId, page: this.data.page, orderType: this.data.orderType }, 'get', function (data) {
      _this.setData({
        catalogs: concat == true ? data.data : _this.data.catalogs.concat(data.data),
        page: _this.data.page + 1
      })
      cb();
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

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