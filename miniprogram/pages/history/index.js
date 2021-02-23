const COS = require('../../utils/cos-wx-sdk-v5');

let videoAd = null

Page({
  tapPreviewImage(e) {
    wx.previewImage({
      current: this.data.imageList[e.target.dataset.index],
      urls: this.data.imageList
    })
  },
  onShareAppMessage: function (res) {
    return {
      title: '黄金三角估值计算器，动态生成图表，让贵贱一目了然！',
      path: '/pages/history/index',
      success: function () { },
      fail: function () { }
    }
  },
  data: {
    cdn: 'https://public-1304544538.cos.ap-chengdu.myqcloud.com/',
    images: [],
    imageList: [],
    selfRecord: [],
    selected: 0,
    list: ['个人记录', '他人记录'],
  },
  onLoad() {
    wx.showLoading({
      title: '加载中',
    })
    var cos = new COS({
      ...getApp().globalData.secret
    });
    cos.getBucket({
      Bucket: 'public-1304544538',
      Region: 'ap-chengdu',
      Prefix: 'upload/',
    }, (err, data) => {
      const img = data.Contents || [];
      const images = img.filter((value, index) => index !== 0).map((item, num) => {
        if (num === 1) console.log(item.LastModified)
        return {
          ...item,
          url: this.data.cdn + item.Key,
          times: item.LastModified.replace(/T/, ' ').replace(/.000Z/, ''),
          time: this.dateFormate(item.LastModified.replace(/^(\d.*)T(.*)\.000Z$/g, '$1 $2')),
          bg: '#' + Math.random().toString(16).substr(2, 6).toUpperCase()
        }
      }).sort((a, b) => new Date(b.LastModified) - new Date(a.LastModified))
      this.setData({
        images: images,
        imageList: images.map(item => this.data.cdn + item.Key)
      })
      wx.hideLoading()
    });
    this.handleQuery()
    this.initEncourageAd()
  },
  dateFormate(time) {
    const newDate = new Date(new Date(time.replace(/-/g, '/')).getTime() + 8 * 3600 * 1000)
    const year = newDate.getFullYear()
    const month = this.addZero(newDate.getMonth() + 1)
    const day = this.addZero(newDate.getDate())
    const hour = this.addZero(newDate.getHours())
    const minute = this.addZero(newDate.getMinutes())
    const second = this.addZero(newDate.getSeconds())

    return `${year}-${month}-${day} ${hour}:${minute}:${second}`
  },
  addZero(num) {
    return num >= 10 ? num : '0' + num
  },
  initEncourageAd() {
    if (wx.createRewardedVideoAd) {
      videoAd = wx.createRewardedVideoAd({
        adUnitId: 'adunit-73935afae611c24c'
      })
      videoAd.onError((err) => {
        console.log({ err })
      })
      videoAd.onClose((res) => {
        console.log({ res })
        if (res && res.isEnded || res === undefined) {
          this.setData({
            selected: 1
          })
        } else {
          wx.showModal({
            title: '提示',
            content: '未获得奖励，无法查看他人估值记录',
            showCancel: false
          })         
        }
      })
    }
  },
  handleQuery () {
    const db = wx.cloud.database()
    // 查询当前用户所有的 counters
    db.collection('history').where({
      _openid: getApp().globalData.openid
    }).get({
      success: res => {
        this.setData({
          selfRecord: res.data.reverse()
        })
      },
      fail: err => {
        console.error('[数据库] [查询记录] 失败：', err)
      }
    })
  },
  handleRemove (e) {
    const item = e.currentTarget.dataset.item;
    const db = wx.cloud.database()
    db.collection('history').where({
      ...item,
      _openid: getApp().globalData.openid
    }).remove({
      success: res => {
        wx.showToast({
          title: '删除成功',
        })
        this.handleQuery()
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '删除失败',
        })
        console.error('[数据库] [删除记录] 失败：', err)
      }
    })
  },
  selected (e) {
    let that = this
    //console.log(e)
    let index = e.currentTarget.dataset.index
    //console.log("index",index)
    if (index == 0) {
      that.setData({
        selected: 0
      })
    } else if (index == 1) {
      if (videoAd && getApp().globalData.openid !== 'ooyQh0TdbZ2QYFy-LNB4jq8k2YUc') {
        videoAd.show().catch(() => {
          // 失败重试
          videoAd.load()
          .then(() => videoAd.show())
          .catch(err => {
            console.log('激励视频 广告显示失败')
          })
        })
      } else {
        this.setData({
          selected: 1
        })
      }
    }
  },
  handleEdit(e) {
    const {
      name,
      price,
      capital,
      margin,
      lowestPE,
      highestPE,
      growth1,
      growth2,
      growth3,
      growth4
    } = e.currentTarget.dataset.item;
    console.log({
      name,
      price,
      capital,
      margin,
      lowestPE,
      highestPE,
      growth1,
      growth2,
      growth3,
      growth4
    })
    wx.setStorageSync('stockInfo', {
      name,
      price,
      capital,
      margin,
      lowestPE,
      highestPE,
      growth1,
      growth2,
      growth3,
      growth4
    })
    wx.switchTab({
      url: '../index/index'
    })
  },
  handleExcel(e) {
    const {
      name,
      price,
      capital,
      margin,
      lowestPE,
      highestPE,
      growth1,
      growth2,
      growth3,
      growth4
    } = e.currentTarget.dataset.item;
    wx.setStorageSync('stockInfo', {
      name,
      price,
      capital,
      margin,
      lowestPE,
      highestPE,
      growth1,
      growth2,
      growth3,
      growth4
    })
    wx.navigateTo({
      url: '../table/index'
    })
  },
  handleLine(e) {
    const {
      name,
      price,
      capital,
      margin,
      lowestPE,
      highestPE,
      growth1,
      growth2,
      growth3,
      growth4
    } = e.currentTarget.dataset.item;
    wx.setStorageSync('stockInfo', {
      name,
      price,
      capital,
      margin,
      lowestPE,
      highestPE,
      growth1,
      growth2,
      growth3,
      growth4
    })
    wx.navigateTo({
      url: '../line/index'
    })
  }
});
