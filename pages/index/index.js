//index.js
//获取应用实例
const app = getApp()
const utils = require('../../utils/util.js');
Page({
  data: {
    defaultSearchKeyWords: '倾世妖妃',
    searchKeywords: '',
    swiperImgUrls: [ // 轮播图
      {
        link: '/pages/index/index',
        url: '../images/banner1.jpg'
      },
      {
        link: '/pages/index/index',
        url: '../images/banner1.jpg'
      },
      {
        link: '/pages/index/index',
        url: '../images/banner1.jpg'
      }
    ],
    adImgUrls:[
      {
        link: '/pages/index/index',
        url: '../images/banner1.jpg'
      },
      {
        link: '/pages/index/index',
        url: '../images/banner1.jpg'
      },
      {
        link: '/pages/index/index',
        url: '../images/banner1.jpg'
      }
    ],
    recommendArr : [  // 推荐列表
      {
        title : '倾世妖记',
        author: '千流万溪',
        desc: '我姬安白，此生不信山盟海誓，我姬安白，此生不信山盟海誓，我姬安白，此生不信山盟海誓，我姬安白，此生不信山盟海誓，我姬安白，此生不信山盟海誓，我姬安白，此生不信山盟海誓，我姬安白，此生不信山盟海誓，我姬安白，此生不信山盟海誓，我姬安白，此生不信山盟海誓',
        bookType :'古代言情',
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
    guimiredu: [  // 闺蜜热读
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
    duanyanqing: [  // 闺蜜热读
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
    guyanArr: [  // 热销古言
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
    xianyanArr: [  // 热销现言
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
    otherArr :[
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
  searchInputBlur:function(event){
    var keywords = event.detail.value;
    this.setData({
      searchKeywords: keywords
    })
  },
  toSearch:function(event){
    var keywords = this.data.searchKeywords == '' ? this.data.defaultSearchKeyWords : this.data.searchKeywords
    wx.navigateTo({
      url: '../search/search?keywords=' + keywords,
    })
  },
  login (userInfo){
    wx.login({
      success : res => {
        utils.utilRequest('/mpApi/getopenid',{code :res.code},'get',function(data){
          console.log(data);
          var openid = data.openid;
          utils.utilRequest('/mpApi/login', { openid: openid, logo: userInfo.avatarUrl, nickname: userInfo.nickName}, 'get', function (result) {
            wx.setStorageSync('userId', result.data.userId);
          })
        })
      }
    })
  },
  onShow: function () {
    var _this = this;
    wx.getSetting({
      success : result => {        
        if(JSON.stringify(result.authSetting) == '{}'){
          console.log(1)
          return wx.getUserInfo({
            success : userInfo => {
              console.log(userInfo);
              wx.setStorageSync('userInfo', userInfo.userInfo);
              _this.login(userInfo.userInfo)
            }
          })
        }else{
          if (!result.authSetting['scope.userInfo']) {
            console.log(2)
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
                        return wx.getUserInfo({
                          success: userInfo => {
                            wx.setStorageSync('userInfo', userInfo.userInfo)
                          }
                        })
                      }
                    }
                  })
                  // wx.getSetting({
                  //   success : result => {
                  //     if (!result.authSetting['scope.userInfo']) {
                  //       return wx.getUserInfo({
                  //         success: userInfo => {
                  //           console.log(userInfo);
                  //           wx.setStorageSync('userInfo', userInfo.userInfo);
                  //           _this.login(userInfo.userInfo)
                  //         }
                  //       })
                  //     }
                  //   }
                  // })
                }
              }
            })
          }else{
            if (wx.getStorageSync('userInfo') == '' || wx.getStorageSync('userId') == ''){
              return wx.getUserInfo({
                success: userInfo => {
                  console.log(userInfo);
                  wx.setStorageSync('userInfo', userInfo.userInfo);
                  _this.login(userInfo.userInfo)
                }
              })
            }
          }
        }
      }
    })
   

  },
  onLoad (){
    utils.utilRequest('/mpApi/homepage', {}, 'get', function (result) {
      console.log(result)
    })
  }
})
