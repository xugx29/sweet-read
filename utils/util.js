const md5 = require('js-md5');
const URL = 'http://mp.sweetread.net/weixinmp';
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
  let sign = 'FA2z9RQ9pAZbXHrqJ20T5R4COeE9x3zW-' + JSON.stringify(newParameter) + '-' + timeStamp;
  return md5(sign)
}

const utilRequest = (url, params, method, callback) => {
  if(!!params){
    const timeStamp = new Date().getTime;
    params['timeStamp'] = timeStamp;
    let sign = setSortEncryption(params, timeStamp);
    params['sign'] = sign;
  }
  wx.request({
    url: URL + url,
    data : params,
    method : method,
    header: {
      'content-type': 'application/json' // 默认值
    },
    success: res => {
      // if (!hideLoading) {
      //   wx.hideLoading()
      // }
      if (!!callback) {
        callback(res);
      }
    },
    fail: res => {
      // if (!hideLoading) {
      //   wx.hideLoading()
      // }
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

module.exports = {
  formatTime: formatTime,
  setSortEncryption: setSortEncryption,
  utilRequest: utilRequest
}
