//app.js
App({
  globalData: {
    secret: {
      SecretId: 'AKIDzmV3QsB3kOQIzPBFW6TxrVt77sNbESWc1',
      SecretKey: 'zBpIWiLioeEagVG6h5C4QXQ3XUBcrlQo1'
    },
    openid: '',
  },
  onLaunch: function () {
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        // env 参数说明：
        //   env 参数决定接下来小程序发起的云开发调用（wx.cloud.xxx）会默认请求到哪个云环境的资源
        //   此处请填入环境 ID, 环境 ID 可打开云控制台查看
        //   如不填则使用默认环境（第一个创建的环境）
        // env: 'my-env-id',
        traceUser: true,
      })
    }

    this.onGetOpenid()

    wx.setStorageSync('isRedDot1', false)
    wx.setStorageSync('isRedDot2', false)
    wx.setStorageSync('isRedDot3', false)
    // 版本检查更新
    if (wx.canIUse('getUpdateManager')) {
      this.checkUpdateVersion()
    }
  },
  /**
   * 检测当前的小程序
   * 是否是最新版本，是否需要下载、更新
   */
  checkUpdateVersion() {
    if (wx.getUpdateManager) {
      const updateManager = wx.getUpdateManager()
      // 检测版本更新
      updateManager.onCheckForUpdate((res) => {
        // 请求完新版本信息的回调
        if (res.hasUpdate) {
          // 监听小程序有版本更新事件
          updateManager.onUpdateReady(() => {
            wx.showModal({
              confirmColor: '#1890FF',
              title: '更新提示',
              content: '新版本已经准备好，是否重启应用？',
              showCancel: false, // 是否显示取消按钮,
              confirmText: '确定',
              success: res => {
                if (res.confirm) {
                  updateManager.applyUpdate()
                }
              }
            })
          })
          updateManager.onUpdateFailed(() => {
            // 新版本下载失败
            wx.showModal({
              confirmColor: '#1890FF',
              content: '小程序更新失败，请关闭后再次开启！',
              showCancel: false // 是否显示取消按钮,
            })
          })
        }
      })
    }
  },
  onGetOpenid () {
    // 调用云函数
    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: res => {
        console.log('[云函数] [login] user openid: ', res.result.userInfo.openId)
        this.globalData.openid = res.result.userInfo.openId
      },
      fail: err => {
        console.error('[云函数] [login] 调用失败', err)
      }
    })
  },
})
