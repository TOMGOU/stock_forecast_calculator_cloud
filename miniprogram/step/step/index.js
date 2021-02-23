Component({
    externalClasses: ['x-class'],
    properties : {
        status : {
            type : String,
            //wait、process、finish、error
            value : ''
        },
        title : {
            type : String,
            value : ''
        },
        content : {
            type : String,
            value : ''
        },
        icon : {
            type : String,
            value : ''
        },
        iconSize : {
            type : Number,
            value : 14
        },
        iconColor: {
            type: String,
            value: ''
        },
        itemType: {
            type : String,
            value : ''
        },
        propOptions: {
            type: Object,
            value: {},
            observer: 'propOptionsChange'
        }
    },
    options: {
        // 在组件定义时的选项中启用多slot支持
        multipleSlots: true
    },
    relations : {
        '../steps/index' : {
            type : 'parent'
        },
        '../ticket-step/index': {
            type: 'parent'
        }
    },
    data : {
        //step length
        len : 1,
        //current in step index
        index : 0,
        //parent component select current index
        current : 0,
        //css direction
        direction : 'horizontal'
    },
    methods : {
        propOptionsChange(opts) {
            if (opts && Object.keys(opts).length > 0) {
                this.updateDataChange(opts)
            }
        },
        updateDataChange( options ){
            this.setData({
                len : options.len,
                index : options.index,
                current : options.current,
                direction : options.direction
            })
        }
    }

})
