const app = getApp();
const utils = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showMore : false,
    bookInfo : {},
    bookId : 0,
    tuijian: [  // 推荐列表
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
    ],
    descData: "<p>18岁那年，我被当作礼物送到他手里。</p><p>他宠我入骨，所有的姐妹们都羡慕我，可只有我自己心里清楚，我只是他初恋女孩的影子。</p><p>可就算影子，我也想成为最好的名字。</p>,<p>18岁那年，我被当作礼物送到他手里。</p><p>他宠我入骨，所有的姐妹们都羡慕我，可只有我自己心里清楚，我只是他初恋女孩的影子。</p><p>可就算影子，我也想成为最好的名字。</p>,<p>18岁那年，我被当作礼物送到他手里。</p><p>他宠我入骨，所有的姐妹们都羡慕我，可只有我自己心里清楚，我只是他初恋女孩的影子。</p><p>可就算影子，我也想成为最好的名字。</p>,<p>18岁那年，我被当作礼物送到他手里。</p><p>他宠我入骨，所有的姐妹们都羡慕我，可只有我自己心里清楚，我只是他初恋女孩的影子。</p><p>可就算影子，我也想成为最好的名字。</p>"
  },
  toggleShowMore:function(){
    this.setData({
      showMore: !this.data.showMore
    })
  },
  autoBuy(){
    if(!this.data.bookId || !wx.getStorageSync('userId')){
      return wx.showToast({
        title: '自动订阅失败，请重试',
        icon: 'none',
        duration: 1500,
        mask: true
      })
    }
    utils.utilRequest('/mpApi/autobuy', { bookId: this.data.bookId, userId: wx.getStorageSync('userId'),type :1},'get',function(data){
      console.log(data)
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      bookId: options.id
    })
    var _this = this;
    utils.utilRequest('/mpApi/bookinfo',{bookId : options.id},'get',function(data){
      _this.setData({
        bookInfo : data.data
      })
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