Page({
    data : {
        trace: [{
            title: 'step-1: 打开东方财富app，进入k线图界面',
        },{
            title: 'step-2: 向下滑动页面，点击资料，查看总股本数', 
        },{
            title: 'step-3: 继续向下滑动页面，找到业绩趋势模块的净利润',
        },{
            title: 'step-4: 继续向下滑动页面，找到估值分析模块，点击市盈率',
        }],
        images: {
            step1: [
                'https://public-1304544538.cos.ap-chengdu.myqcloud.com/images/1.png'
            ],
            step2: [
                'https://public-1304544538.cos.ap-chengdu.myqcloud.com/images/2.png',
                'https://public-1304544538.cos.ap-chengdu.myqcloud.com/images/3.png'
            ],
            step3: [
                'https://public-1304544538.cos.ap-chengdu.myqcloud.com/images/4.png',
                'https://public-1304544538.cos.ap-chengdu.myqcloud.com/images/5.png'
            ],
            step4: [
                'https://public-1304544538.cos.ap-chengdu.myqcloud.com/images/6.png',
                'https://public-1304544538.cos.ap-chengdu.myqcloud.com/images/7.png',
                'https://public-1304544538.cos.ap-chengdu.myqcloud.com/images/8.png'
            ],
        }
    },
    onShareAppMessage: function (res) {
        return {
            title: '上市公司股票相关参数哪里找？东方财富app了解一下！',
            path: '/pages/steps/index',
            success: function () { },
            fail: function () { }
        }
    }
});
