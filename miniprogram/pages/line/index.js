import * as echarts from '../../ec-canvas/echarts';
import { handleWXSaveReport } from '../../utils/WXAnalytics'
const COS = require('../../utils/cos-wx-sdk-v5');

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
  const lowestPEPrice = margin * lowestPE / capital
  const highestPEPrice = margin * highestPE / capital
  const lowPrice1 = +(lowestPEPrice * (1 + growth1)).toFixed(2)
  const lowPrice2 = +(lowestPEPrice * (1 + growth1) * (1 + growth2)).toFixed(2)
  const lowPrice3 = +(lowestPEPrice * (1 + growth1) * (1 + growth2) * (1 + growth3)).toFixed(2)
  const lowPrice4 = +(lowestPEPrice * (1 + growth1) * (1 + growth2) * (1 + growth3) * (1 + growth4)).toFixed(2)
  const highPrice1 = +(highestPEPrice * (1 + growth1)).toFixed(2)
  const highPrice2 = +(highestPEPrice * (1 + growth1) * (1 + growth2)).toFixed(2)
  const highPrice3 = +(highestPEPrice * (1 + growth1) * (1 + growth2) * (1 + growth3)).toFixed(2)
  const highPrice4 = +(highestPEPrice * (1 + growth1) * (1 + growth2) * (1 + growth3) * (1 + growth4)).toFixed(2)
  const midPrice1 = ((lowPrice1 + highPrice1) / 2).toFixed(2)
  const midPrice2 = ((lowPrice2 + highPrice2) / 2).toFixed(2)
  const midPrice3 = ((lowPrice3 + highPrice3) / 2).toFixed(2)
  const midPrice4 = ((lowPrice4 + highPrice4) / 2).toFixed(2)
  return {
    lowPrice: [price, lowPrice1, lowPrice2, lowPrice3, lowPrice4],
    midPrice: [price, midPrice1, midPrice2, midPrice3, midPrice4],
    highPrice: [price, highPrice1, highPrice2, highPrice3, highPrice4]
  }
}

function uploadImage(filePath) {
  var cos = new COS({
    ...getApp().globalData.secret
  });
  var filename = filePath.substr(filePath.lastIndexOf('/') + 1);
  handleWXSaveReport({
    file_path: 'https://public-1304544538.cos.ap-chengdu.myqcloud.com/upload/' + filename
  })
  cos.postObject({
    Bucket: 'public-1304544538',
    Region: 'ap-chengdu',
    Key: 'upload/' + filename,
    FilePath: filePath,
    onProgress: function (info) {
      // console.log(JSON.stringify(info));
    }
  }, function (err, data) {
    // console.log(err || data);
  });
}

function initChart(canvas, width, height, dpr) {
  const chart = echarts.init(canvas, null, {
    width: width,
    height: height,
    devicePixelRatio: dpr
  });
  const { name } = wx.getStorageSync('stockInfo')
  const year = new Date().getFullYear()

  const { lowPrice, midPrice, highPrice } = calStockPrice()

  canvas.setChart(chart);

  const option = {
    backgroundColor: '#fff',
    title: {
      text: `${ name }未来三年股价估值`,
      left: 'center'
    },
    color: ["#37A2DA", "#67E0E3", "#9FE6B8"],
    legend: {
      data: ['低估', '平均', '高估'],
      top: 50,
      left: 'center',
      backgroundColor: 'white',
      z: 100
    },
    grid: {
      containLabel: true
    },
    tooltip: {
      show: true,
      trigger: 'axis'
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: [`${ year - 1 }`, `${ year }`, `${ year + 1 }`, `${ year + 2 }`, `${ year + 3 }`],
      show: true
    },
    yAxis: {
      x: 'center',
      type: 'value',
      splitLine: {
        lineStyle: {
          type: 'dashed'
        }
      },
      show: true
    },
    series: [{
      name: '高估',
      type: 'line',
      smooth: true,
      color: 'red',
      itemStyle: {
        normal: {
          label: {
            show: true, //开启显示
            position: 'top', //在上方显示
            textStyle: { //数值样式
              color: '#999',
              fontSize: 12
            }
          }
        }
      },
      data: highPrice
    }, {
      name: '平均',
      type: 'line',
      smooth: true,
      color: '#aaa',
      itemStyle: {
        normal: {
          label: {
            show: true, //开启显示
            position: 'top', //在上方显示
            textStyle: { //数值样式
              color: '#aaa',
              fontSize: 12
            }
          },
          lineStyle: {
            type: 'dotted'
          }
        }
      },
      data: midPrice
    }, {
      name: '低估',
      type: 'line',
      smooth: true,
      color: 'green',
      itemStyle: {
        normal: {
          label: {
            show: true, //开启显示
            position: 'bottom', //在上方显示
            textStyle: { //数值样式
              color: '#999',
              fontSize: 12
            }
          }
        }
      },
      data: lowPrice
    }]
  };

  chart.setOption(option);
  return chart;
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
    ec: {
      onInit: initChart
    }
  },
  onLoad() {
    const { name } = wx.getStorageSync('stockInfo')
    wx.setNavigationBarTitle({
      title: name
    })
  },
  save() {
    const ecComponent = this.selectComponent('#mychart-dom-line');
    // 先保存图片到临时的本地文件，然后存入系统相册
    ecComponent.canvasToTempFilePath({
      success: (res) => {
        // 存入系统相册
        wx.saveImageToPhotosAlbum({
          filePath: res.tempFilePath || '',
          success(res) {
            wx.showModal({
              title: '保存成功',
              content: '线形图已成功保存到本地相册',
              success(res) {
                console.log("success", res)
              }
            })
          },
          fail(res) {
            wx.showModal({
              title: '保存失败',
              content: '线形图保存过程中出错',
              success(res) {
                console.log("fail", res)
              }
            })
          }
        })
        // 图片上传
        const { name } = wx.getStorageSync('stockInfo')
        uploadImage(res.tempFilePath)
        this.handleAdd(res.tempFilePath)
      },
      fail: (res) => {
        wx.showModal({
          title: '保存失败',
          content: '线形图保存过程中出错',
          success(res) {
            console.log("fail", res)
          }
        })
      }
    });
  },
  handleAdd (filePath) {
    const db = wx.cloud.database()
    const filename = filePath.substr(filePath.lastIndexOf('/') + 1);
    db.collection('history').add({
      data: {
        ...wx.getStorageSync('stockInfo'),
        imgUrl: 'https://public-1304544538.cos.ap-chengdu.myqcloud.com/upload/' + filename
      },
      success: res => {
        console.log('[数据库] [新增记录] 成功，记录 _id: ', res._id)
      },
      fail: err => {
        console.error('[数据库] [新增记录] 失败：', err)
      }
    })
  },
});
