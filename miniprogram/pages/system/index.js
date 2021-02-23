Page({
    data : {
        img: 'https://public-1304544538.cos.ap-chengdu.myqcloud.com/images/gj.png',
        trace: [{
            title: 'step-1: 正确的心态',
        },{
            title: 'step-2: 符合趋势的行业', 
        },{
            title: 'step-3: 业绩确定性高成长',
        },{
            title: 'step-4: 商业模式可持续',
        },{
            title: 'step-5: 黄金三角估值法确定高低目标价',
        },{
            title: 'step-6: 明确各种可能及概率', 
        },{
            title: 'step-7: 低点买入,高点卖出',
        },{
            title: 'step-8: 多次实践,能力必成',
        }],
        images: {
            step1: [
                'https://public-1304544538.cos.ap-chengdu.myqcloud.com/images/1.png'
            ],
            step2: [
                'https://public-1304544538.cos.ap-chengdu.myqcloud.com/images/2.png'
            ],
            step3: [
                'https://public-1304544538.cos.ap-chengdu.myqcloud.com/images/3.png'
            ],
            step4: [
                'https://public-1304544538.cos.ap-chengdu.myqcloud.com/images/4.png'
            ],
            step5: [
                'https://public-1304544538.cos.ap-chengdu.myqcloud.com/images/5.png'
            ],
            step6: [
                'https://public-1304544538.cos.ap-chengdu.myqcloud.com/images/6.png'
            ],
            step7: [
                'https://public-1304544538.cos.ap-chengdu.myqcloud.com/images/7.png'
            ],
            step8: [
                'https://public-1304544538.cos.ap-chengdu.myqcloud.com/images/8.png'
            ],
        }
    },
    onShareAppMessage: function (res) {
        return {
            title: '格局八步投资体系了解一下！',
            path: '/pages/system/index',
            success: function () { },
            fail: function () { }
        }
    },
    handlePreviewImage() {
        wx.previewImage({
            current: this.data.img, // 当前显示图片的http链接
            urls: [this.data.img] // 需要预览的图片http链接列表
        })
    }
});
