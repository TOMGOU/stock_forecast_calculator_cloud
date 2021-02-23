Component({
  externalClasses: ['x-class'],
  properties: {
    trace: {
      type: Object,
      value: {}
    },
    imgs: {
      type: Array,
      value: []
    },
    iconColor: {
      type: String,
      value: ''
    },
    iconSize: {
      type: String,
      value: ''
    },
    icon: {
      type: String,
      value: ''
    },
    options: {
      type: Object,
      value: {}
    }
  },
  relations: {
    '../steps/index': {
      type: 'parent'
    }
  },
  options: {
    // 在组件定义时的选项中启用多slot支持
    multipleSlots: true
  },
  methods: {
    handlePreviewImg: function(e) {
      const {
        dataset: {
          imageurl = ''
        } = ''
      } = e.currentTarget
      this.triggerEvent('handlePreviewImg')
      if (!imageurl) {
        return
      }
      console.log(imageurl)
      console.log('imageurl:', this.properties.imgs)
      wx.previewImage({
        current: imageurl, // 当前显示图片的http链接
        urls: this.properties.imgs // 需要预览的图片http链接列表
      })
    },
    updateDataChange( options ){
      this.setData({
        options
      })
    }
  }
})