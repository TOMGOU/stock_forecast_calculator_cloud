//index.js
const year = new Date().getFullYear()
Page({
  onShareAppMessage: function (res) {
    return {
      title: '黄金三角估值计算器，动态生成图表，让贵贱一目了然！',
      path: '/pages/index/index',
      success: function () { },
      fail: function () { }
    }
  },
  data: {
    stockInfo: {
      name: '',
      price: '',
      capital: '',
      margin: '',
      lowestPE: '',
      highestPE: '',
      growth1: '',
      growth2: '',
      growth3: '',
      growth4: ''
    },
    stockInfoFormList: [
      { title: '股票名称', placeholder: '请输入', maxlength: 10, name: 'name', type: 'text', unit: '' },
      { title: '去年年末股价', placeholder: '请输入', maxlength: 10, name: 'price', type: 'text', unit: '元' },
      { title: '总股本数', placeholder: '请输入', maxlength: 10, name: 'capital', type: 'text', unit: '亿' },
      { title: '去年净利润', placeholder: '请输入', maxlength: 10, name: 'margin', type: 'text', unit: '亿' },
      { title: '最低市盈率', placeholder: '请输入', maxlength: 10, name: 'lowestPE', type: 'text', unit: '倍' },
      { title: '最高市盈率', placeholder: '请输入', maxlength: 10, name: 'highestPE', type: 'text', unit: '倍' },
      { title: year + '年净利润增长率', placeholder: '请输入', maxlength: 10, name: 'growth1', type: 'text', unit: '%' },
      { title: year + 1 + '年净利润增长率', placeholder: '请输入', maxlength: 10, name: 'growth2', type: 'text', unit: '%' },
      { title: year + 2 + '年净利润增长率', placeholder: '请输入', maxlength: 10, name: 'growth3', type: 'text', unit: '%' },
      { title: year + 3 + '年净利润增长率', placeholder: '请输入', maxlength: 10, name: 'growth4', type: 'text', unit: '%' }
    ],
  },
  handleDataVerify() {
    const stockInfo = this.data.stockInfo
    const emptyVerify = Object.keys(stockInfo).every(key => stockInfo[key] !== '')
    const typeVerify = Object.keys(stockInfo).every(key => {
      if (key !== 'name') {
        return !isNaN(+stockInfo[key])
      } else {
        return true
      }
    })
    return {
      emptyVerify,
      typeVerify
    }
  },
  bindClearStockInfo() {
    const stockInfo = {
      name: '',
      price: '',
      capital: '',
      margin: '',
      lowestPE: '',
      highestPE: '',
      growth1: '',
      growth2: '',
      growth3: '',
      growth4: ''
    }
    this.setData({
      stockInfo: stockInfo
    })
    wx.setStorageSync('stockInfo', this.data.stockInfo)
  },
  // 生成表格事件
  bindGenerateExcel() {
    const {
      emptyVerify,
      typeVerify
    } = this.handleDataVerify()
    if (!emptyVerify) {
      wx.showToast({
        title: '请输入完整数据',
        icon: 'none',
        duration: 2000
      })
      return
    }
    if (!typeVerify) {
      wx.showToast({
        title: '请输入数字类型的数据',
        icon: 'none',
        duration: 2000
      })
      return
    }
    wx.setStorageSync('stockInfo', this.data.stockInfo)
    wx.navigateTo({
      url: '../table/index'
    })
  },
  // 生成线形图事件
  bindGenerateGraph() {
    const {
      emptyVerify,
      typeVerify
    } = this.handleDataVerify()
    if (!emptyVerify) {
      wx.showToast({
        title: '请输入完整数据',
        icon: 'none',
        duration: 2000
      })
      return
    }
    if (!typeVerify) {
      wx.showToast({
        title: '请输入数字类型的数据',
        icon: 'none',
        duration: 2000
      })
      return
    }
    wx.setStorageSync('stockInfo', this.data.stockInfo)
    wx.navigateTo({
      url: '../line/index'
    })
  },
  handleInput(e) {
    let name = e.currentTarget.dataset.name;
	  this.setData({
      stockInfo: {
        ...this.data.stockInfo,
        [name]: e.detail.value
      }
    })
    wx.setStorageSync('stockInfo', this.data.stockInfo)
  },
  handleGoHistory() {
    wx.navigateTo({ url: '../history/index' })
  },
  onShow() {
    const stockInfo = wx.getStorageSync('stockInfo')
    if (stockInfo) {
      this.setData({
        stockInfo: stockInfo
      })
    }
  },
})
