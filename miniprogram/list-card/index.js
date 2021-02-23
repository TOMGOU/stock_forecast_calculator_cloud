Component({
  externalClasses: ['x-class'],
  options: {
    multipleSlots: true
  },
  properties: {
      title: {
        type: String,
        value: ''
      },
      plate: {
        type: String,
        value: ''
      },
      priceText: {
        type: String,
        value: ''
      },
      imgText: {
        type: String,
        value: ''
      },
      bottomShow: {
        type: Boolean,
        value: false
      },
      headerShow: {
        type: Boolean,
        value: true
      },
      imgUrl: {
        type: String,
        value: ''
      },
      showImg: {
        type: Boolean,
        value: true
      }
  }
});
