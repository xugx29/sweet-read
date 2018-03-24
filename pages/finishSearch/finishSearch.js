var app = getApp()
Page({
  onLoad: function (options){
    wx.setNavigationBarTitle({
      title: options.type + '- 甜悦读'
    })
  },
  data : {
    showTypeContent:false,
    showSearchContent:false,
    contentHeight: 0,
    chooseTypeId : 0,
    costButtonId : 0,
    progressButtonId : 0,
    isScroll: true,
    bookTypes: ['全部分类', '古代言情', '纪实生活', '青春校园', '女生灵异', '都市暧昧', '玄幻奇幻', '仙侠修真','悬疑灵异'],
    costTypesArr : ['不限','免费','VIP'],
    progressTypesArr: ['不限', '连载', '完结'],
    finishArr: [  // 推荐列表
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
  showSeacrchContent : function(event){
    var id = event.currentTarget.dataset.id;
    if(id == 1){
      this.setData({
        showTypeContent : true,
        showSearchContent : false,
        isScroll:false
      })
    }else{
      this.setData({
        showTypeContent: false,
        showSearchContent: true,
        isScroll: false
      })
    }
  },
  hideMask : function(){
    this.setData({
      showTypeContent: false,
      showSearchContent: false,
      isScroll: true
    })
  },
  changeChoose : function(event){
    // 切换分类
    this.setData({
      chooseTypeId: event.currentTarget.dataset.id
    })
  },
  changeSelect:function(event){
    var selectType = event.currentTarget.dataset.type;
    var id = event.currentTarget.dataset.id;
    if(selectType == 'cost') {
      this.setData({
        costButtonId : id
      })
      return;
    }
    this.setData({
      progressButtonId: id
    })
  },
  onReady: function () {
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          //动态根据手机分辨率来计算内容的高度（屏幕总高度-顶部筛选栏的高度）
          contentHeight: (res.windowHeight - 90 * res.screenWidth / 750)
        });
      }
    })
  }
})