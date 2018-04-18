
//获取应用实例
const app = getApp()

var util = require('../../utils/util.js')
var config = require('../../utils/config.js')

var list = [];

Page({
    data: {
        hasUserInfo: false,
        userInfo: {},
        list: list
    },
    tapCamera: function() {
        var _this = this
        wx.chooseImage({
            count: 1,
            sizeType: ['original'],
            sourceType: ['camera'],
            success: (res) => {
                console.log(res.tempFilePaths[0])
                _this.setData({
                    list: list.push({ pic: res.tempFilePaths[0] })
                })
            }
        })
    },
    onLoad: () => {
        // wx.getStorage({
        //     key: config.CACHE.list_qrcodes,
        //     success: (res) => {
        //         console.log(res)
        //         qrcode_list = res.data || []
        //         // console.log(qrcode_list)
        //         this.setData({ qrcodeList: setList(qrcode_list) });
        //     }
        // })
    },
    onReady: () => {
    }
})
