// 点击保存按钮
export function handleWXSaveReport(saveReportData) {
  // 微信上报
  wx.reportAnalytics('save_album', saveReportData)
}
