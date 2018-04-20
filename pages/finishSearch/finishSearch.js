var app = getApp();
const utils = require('../../utils/util.js');
Page({
  data : {
    showTypeContent:false,
    showSearchContent:false,
    contentHeight: 0,
    chooseTypeId : 0,
    costButtonId : 0,
    progressButtonId : 0,
    page : 1,
    isScroll: true,
    bookTypes: [{
      name : '全部分类',
      id:0
    }, {
      name: '古代言情',
      id: 11
      }, {
        name: '现代言情',
        id: 12
      },
      {
        name: '穿越幻想',
        id: 13
      }, {
        name: '浪漫青春',
        id: 14
      }, {
        name: '灵异悬疑',
        id: 37
      }, {
        name: '悬疑探险',
        id: 40
      }, {
        name: '玄幻奇幻',
        id: 5
      }, {
        name: '悬疑探险',
        id: 6
      }, {
        name: '游戏竞技',
        id: 7
      }, {
        name: '历史军事',
        id: 8
      }, {
        name: '现代都市',
        id: 9
      }, {
        name: '武侠仙侠',
        id: 10
      }],
    costTypesArr: [{ name: '不限', id: -1 }, { name: 'VIP', id: 0 }, { name: '免费', id: 1}],
    // '不限','免费','VIP'
    finishArr: []
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
  },
  onLoad: function (options){
    var title = options.type == 0 ? '最新完本' : '热门完本'
    wx.setNavigationBarTitle({
      title: title + '- 甜悦读'
    })
    var _this = this;
    utils.utilRequest('/mpApi/finishibook', { type: options.type, page: _this.data.page, cid: 0, isfree: -1 }, 'get', function (data) {
      if (data.resultCode == 0) {
        _this.setData({
          finishArr: data.data,
          page : _this.data.page+1
        })
      }
    })
  },
  onShow(){
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
  }
})