// pages/search/search.js
const utils = require('../../utils/util.js');
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchKeywords : '',
    inputFocus : false,
    getFocus : false,
    page :1,
    searchResult: [  // 推荐列表
      {
        title: '倾世妖记',
        author: '千流万溪',
        desc: '我姬安白，此生不信山盟海誓，我姬安白，此生不信山盟海誓，我姬安白，此生不信山盟海誓，我姬安白，此生不信山盟海誓，我姬安白，此生不信山盟海誓，我姬安白，此生不信山盟海誓，我姬安白，此生不信山盟海誓，我姬安白，此生不信山盟海誓，我姬安白，此生不信山盟海誓',
        bookType: '古代言情',
        imgUrl: '../images/img5.jpg'
      },
      {
        title: '王爷好球：俏丫入我怀',
        author: 'zixiyan',
        desc: '我姬安白，此生不信山盟海誓，我姬安白，此生不信山盟海誓，我姬安白，此生不信山盟海誓，我姬安白，此生不信山盟海誓，我姬安白，此生不信山盟海誓，我姬安白，此生不信山盟海誓，我姬安白，此生不信山盟海誓，我姬安白，此生不信山盟海誓，我姬安白，此生不信山盟海誓',
        bookType: '古代言情',
        imgUrl: '../images/img5.jpg'
      },
      {
        title: '妃长闹腾：狼君别来无恙',
        author: '咱台明月',
        desc: '我姬安白，此生不信山盟海誓，我姬安白，此生不信山盟海誓，我姬安白，此生不信山盟海誓，我姬安白，此生不信山盟海誓，我姬安白，此生不信山盟海誓，我姬安白，此生不信山盟海誓，我姬安白，此生不信山盟海誓，我姬安白，此生不信山盟海誓，我姬安白，此生不信山盟海誓',
        bookType: '古代言情',
        imgUrl: '../images/img5.jpg'
      },
      {
        title: '十七人',
        author: '夹不起丸子',
        desc: '我姬安白，此生不信山盟海誓，我姬安白，此生不信山盟海誓，我姬安白，此生不信山盟海誓，我姬安白，此生不信山盟海誓，我姬安白，此生不信山盟海誓，我姬安白，此生不信山盟海誓，我姬安白，此生不信山盟海誓，我姬安白，此生不信山盟海誓，我姬安白，此生不信山盟海誓',
        bookType: '古代言情',
        imgUrl: '../images/img5.jpg'
      },
      {
        title: '亮夫完成：顽固太子妃',
        author: '下涩',
        desc: '我姬安白，此生不信山盟海誓，我姬安白，此生不信山盟海誓，我姬安白，此生不信山盟海誓，我姬安白，此生不信山盟海誓，我姬安白，此生不信山盟海誓，我姬安白，此生不信山盟海誓，我姬安白，此生不信山盟海誓，我姬安白，此生不信山盟海誓，我姬安白，此生不信山盟海誓',
        bookType: '古代言情',
        imgUrl: '../images/img5.jpg'
      },
      {
        title: '豪门闪婚：总裁老公，请客制',
        author: '柳青也',
        desc: '我姬安白，此生不信山盟海誓，我姬安白，此生不信山盟海誓，我姬安白，此生不信山盟海誓，我姬安白，此生不信山盟海誓，我姬安白，此生不信山盟海誓，我姬安白，此生不信山盟海誓，我姬安白，此生不信山盟海誓，我姬安白，此生不信山盟海誓，我姬安白，此生不信山盟海誓',
        bookType: '古代言情',
        imgUrl: '../images/img5.jpg'
      }
    ]
  },
  focusBlurMethod :function(event){
    this.setData({
      inputFocus: event.type == 'blur' ? false : true,
      searchKeywords: event.detail.value,
      getFocus: event.type == 'blur' ? false : true
    })
  },
  clearKeywords:function(){
    this.setData({
      // inputFocus: !this.data.inputFocus,
      searchKeywords: '',
      getFocus: true
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      var keywords = options.keywords;
      var _this = this;
      utils.utilRequest('/mpApi/search', { keyword: keywords,page : this.data.page}, 'get', function (data) {
        if (data.resultCode == 0) {
          _this.setData({
            searchKeywords: keywords,
            searchResult: data.data,
            page: _this.data.page + 1
          })
        }
      })
      // 走请求获取搜索结果
  },
  toSearch(){
    var _this = this;
    var keywords = this.data.searchKeywords;
    utils.utilRequest('/mpApi/search', { keyword: keywords, page: this.data.page }, 'get', function (data) {
      if (data.resultCode == 0) {
        _this.setData({
          searchKeywords: keywords,
          searchResult: data.data,
          page: 1
        })
      }
    })
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