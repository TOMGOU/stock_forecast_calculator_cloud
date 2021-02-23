const app = getApp()

const year = new Date().getFullYear()
const { name } = wx.getStorageSync('stockInfo')

function calStockPrice() {
  const stockInfo = wx.getStorageSync('stockInfo')
  const price = +stockInfo.price
  const capital = +stockInfo.capital
  const margin = +stockInfo.margin
  const lowestPE = +stockInfo.lowestPE
  const highestPE = +stockInfo.highestPE
  const growth1 = (+stockInfo.growth1) / 100
  const growth2 = (+stockInfo.growth2) / 100
  const growth3 = (+stockInfo.growth3) / 100
  const growth4 = (+stockInfo.growth4) / 100
  const totalValue = (price * capital).toFixed(0)
  const currentPE = (totalValue / margin).toFixed(2)
  const lowTV = margin * lowestPE
  const highTV = margin * highestPE
  const lowestPEPrice = margin * lowestPE / capital
  const highestPEPrice = margin * highestPE / capital
  const margin1 = (margin * (1 + growth1)).toFixed(2)
  const margin2 = (margin * (1 + growth1) * (1 + growth2)).toFixed(2)
  const margin3 = (margin * (1 + growth1) * (1 + growth2) * (1 + growth3)).toFixed(2)
  const margin4 = (margin * (1 + growth1) * (1 + growth2) * (1 + growth3) * (1 + growth4)).toFixed(2)
  const lowTV1 = (lowTV * (1 + growth1)).toFixed(0)
  const lowTV2 = (lowTV * (1 + growth1) * (1 + growth2)).toFixed(0)
  const lowTV3 = (lowTV * (1 + growth1) * (1 + growth2) * (1 + growth3)).toFixed(0)
  const lowTV4 = (lowTV * (1 + growth1) * (1 + growth2) * (1 + growth3) * (1 + growth4)).toFixed(0)
  const highTV1 = (highTV * (1 + growth1)).toFixed(0)
  const highTV2 = (highTV * (1 + growth1) * (1 + growth2)).toFixed(0)
  const highTV3 = (highTV * (1 + growth1) * (1 + growth2) * (1 + growth3)).toFixed(0)
  const highTV4 = (highTV * (1 + growth1) * (1 + growth2) * (1 + growth3) * (1 + growth4)).toFixed(0)
  const lowPrice1 = (lowestPEPrice * (1 + growth1)).toFixed(2)
  const lowPrice2 = (lowestPEPrice * (1 + growth1) * (1 + growth2)).toFixed(2)
  const lowPrice3 = (lowestPEPrice * (1 + growth1) * (1 + growth2) * (1 + growth3)).toFixed(2)
  const lowPrice4 = (lowestPEPrice * (1 + growth1) * (1 + growth2) * (1 + growth3) * (1 + growth4)).toFixed(2)
  const highPrice1 = (highestPEPrice * (1 + growth1)).toFixed(2)
  const highPrice2 = (highestPEPrice * (1 + growth1) * (1 + growth2)).toFixed(2)
  const highPrice3 = (highestPEPrice * (1 + growth1) * (1 + growth2) * (1 + growth3)).toFixed(2)
  const highPrice4 = (highestPEPrice * (1 + growth1) * (1 + growth2) * (1 + growth3) * (1 + growth4)).toFixed(2)
  return [
    {years: '股价(元)', last_year: price, this_year: `${lowPrice1}-${highPrice1}`, next_year: `${lowPrice2}-${highPrice2}`, after_year: `${lowPrice3}-${highPrice3}`, future_year: `${lowPrice4}-${highPrice4}`},
    {years: '总股本(亿)', last_year: capital, this_year: capital, next_year: capital, after_year: capital, future_year: capital},
    {years: '总市值(亿)', last_year: totalValue, this_year: `${lowTV1}-${highTV1}`, next_year: `${lowTV2}-${highTV2}`, after_year: `${lowTV3}-${highTV3}`, future_year: `${lowTV4}-${highTV4}`},
    {years: '市盈率(倍)', last_year: currentPE, this_year: `${lowestPE}-${highestPE}`, next_year: `${lowestPE}-${highestPE}`, after_year: `${lowestPE}-${highestPE}`, future_year: `${lowestPE}-${highestPE}`},
    {years: '净利润(亿)', last_year: margin, this_year: margin1, next_year: margin2, after_year: margin3, future_year: margin4},
    {years: '净利增长率', last_year: '--', this_year: `${(growth1 * 100).toFixed(2)}%`, next_year: `${(growth2 * 100).toFixed(2)}%`, after_year: `${(growth3 * 100).toFixed(2)}%`, future_year: `${(growth4 * 100).toFixed(2)}%`}
  ]
}

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
    title: '',
    columns: [
      {
        key: 'years',
        title: '年份',
        width: 70,
        fixed: 'left',
        align: 'center'
      }, {
        key: 'last_year',
        title: `${year - 1}`,
        width: 70
      }, {
        key: 'this_year',
        width: 100,
        title: `${year}`
      }, {
        key: 'next_year',
        width: 100,
        title: `${year + 1}`
      }, {
        key: 'after_year',
        width: 100,
        title: `${year + 2}`
      }, {
        key: 'future_year',
        width: 100,
        title: `${year + 3}`
      }
    ],
    data: [
      {years: '股价(元)', last_year: '85.46', this_year: '68 - 114', next_year: '75 - 125', after_year: '82 - 138'},
      {years: '总股本(亿)', last_year: '182.8', this_year: '182.8', next_year: '182.8', after_year: '182.8'},
      {years: '总市值(亿)', last_year: '15622', this_year: '12533-20888', next_year: '13786-22977', after_year: '15165-25275'},
      {years: '市盈率(倍)', last_year: '11.22', this_year: '9 - 15', next_year: '9 - 15', after_year: '9 - 15'},
      {years: '净利润(亿)', last_year: '1392.55', this_year: '1392.55', next_year: '1531.81', after_year: '1684.99'},
      {years: '净利增长率', last_year: '0', this_year: '10', next_year: '10', after_year: '10'}
    ],
  },
  onLoad() {
    this.setData({
      data: calStockPrice(),
      title: `${wx.getStorageSync('stockInfo').name}未来三年股价估值数据表格`
    })
  }
})
