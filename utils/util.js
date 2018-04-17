const md5 = require('js-md5');
const URL = 'https://mp.sweetread.net/weixinmp';
const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

const setSortEncryption = (parameter, timeStamp) => {
  const sortArr = []
  const newParameter = {};
  for (let key in parameter) {
    sortArr.push(key);
  }
  sortArr.sort();
  for (let key of sortArr) {
    newParameter[key] = parameter[key]
  }
  let sign = '1832df87387a0404690136cac7c1axiaocx-' + JSON.stringify(newParameter) + '-' + timeStamp;
  console.log(sign)
  return md5(sign).toUpperCase()
}

const utilRequest = (url, params, method, callback, hideLoading) => {
  if (!hideLoading) {
    wx.showLoading({
      title: 'Loading',
      mask:true
    })
  }
  if(!!params){
    const timeStamp = new Date().getTime();
    let sign = setSortEncryption(params,timeStamp);
    params['timeStamp'] = timeStamp.toString();
    params['sign'] = sign;
  }
  wx.request({
    url: URL + url,
    data : params,
    method : method,
    success: (res) => {
      if (!hideLoading) {
        wx.hideLoading()
      }
      if (!!callback) {
        callback(res.data);
      }
    },
    fail: res => {
      if (!hideLoading) {
        wx.hideLoading()
      }
      wx.showToast({
        title: '网络连接异常，请检查网络',
        icon: 'none',
        duration: 2000
      })
      // if (!fail) {
      //   wx.showToast({
      //     title: '网络连接异常，请检查网络',
      //     icon: 'none',
      //     duration: 2000
      //   })
      // } else {
      //   fail(res);
      // }
    }
  })
}
Array.prototype.remove = function (dx) {
  if (isNaN(dx) || dx > this.length) { return false; }
  for (var i = 0, n = 0; i < this.length; i++) {
    if (this[i] != this[dx]) {
      this[n++] = this[i]
    }
  }
  this.length -= 1
}
module.exports = {
  formatTime: formatTime,
  setSortEncryption: setSortEncryption,
  utilRequest: utilRequest
}
