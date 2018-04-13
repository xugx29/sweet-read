var app = getApp()
const utils = require('../../utils/util.js');
Page({
  onLoad: function (options) {
    console.log(options);
    wx.setNavigationBarTitle({
      title: options.type + '- 甜悦读'
    })
    this.setData({
      cid : options.id
    })
    this.getData(options.id)
  },
  data : {
    scrollTop:0,
    typeId: -1,
    tagId:-1,
    type : '',
    tag : '',
    cid : -1,
    page : 1,
    getMoreDataTag : 1,
    typesArr : [
      '热门', '免费','VIP','连载','完本'
    ],
    tagsArr : [
      '总裁','高干','重生','穿越','种田'
    ],
    resultArr: []
  },
  selectItem : function(event){
    var selectType = event.currentTarget.dataset.type,
        id = event.currentTarget.dataset.id;
    this.setData({
      page : 1
    })
    if(selectType == 'type'){
      if(id == this.data.typeId){
        this.setData({
          typeId: -1,
          type: ''
        })  
        this.getData();
        return;
      }
      this.setData({
        typeId : id,
        type: event.currentTarget.dataset.item
      })
    }else{
      if (id == this.data.tagId) {
        this.setData({
          tagId: -1,
          tag: ''
        })
        this.getData();
        return;
      }
      this.setData({
        tagId: id,
        tag: event.currentTarget.dataset.item
      })
    }
    this.getData();
  },
  getData : function(cid){
    if(!cid) cid = this.data.id;
    var _this = this;
    utils.utilRequest('/mpApi/booklist', {cid : this.data.cid,type : this.data.type,tag : this.data.tag,page : this.data.page}, 'get',function(data){
      _this.setData({
        scrollTop:0,
        getMoreDataTag: 1,
        resultArr : data.data,
        page : _this.data.page + 1
      })
    })
  },
  getMoreData : function(cid){
    if (this.data.getMoreDataTag == 0) return; // 禁止加载
    if (!cid) cid = this.data.id;
    var _this = this;
    utils.utilRequest('/mpApi/booklist', { cid: this.data.cid, type: this.data.type, tag: this.data.tag, page: this.data.page }, 'get', function (data) {
      if(!data.data) return;
      _this.setData({
        getMoreDataTag: data.data.length < 20 ? 0 : 1,
        resultArr: _this.data.resultArr.concat(data.data),
        page: _this.data.page + 1
      })
    })
  }
})