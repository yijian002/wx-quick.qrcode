//index.js
//获取应用实例
const app = getApp()

let CACHE_QRCODE_LIST = 'qkqrcode_user_list';

Page({
    data: {
        hasUserInfo: false,
        userInfo: {},
        qrcodeList: []
    },
    cameraQrcode: function() {
        wx.scanCode({
            onlyFromCamera: true,
            success: (res) => {
                // console.log(res.result);
                this.data.qrcodeList = [{ content: res.result }].concat(this.data.qrcodeList);
                this.setData({ qrcodeList: this.data.qrcodeList });
                wx.setStorage({
                    key: CACHE_QRCODE_LIST,
                    data: this.data.qrcodeList,
                })
            }
        });
    },
    onLoad: function() {
        if (app.globalData.userInfo) {
            this.setData({
                userInfo: app.globalData.userInfo,
                hasUserInfo: true
            })
        } else {
            app.userInfoReadyCallback = res => {
                this.setData({
                    userInfo: res.userInfo,
                    hasUserInfo: true
                })
            }
        }

        wx.getStorage({
            key: CACHE_QRCODE_LIST,
            success: function(res) {
                this.setData({
                    qrcodeList: res || []
                });
            }
        })

    }
})
