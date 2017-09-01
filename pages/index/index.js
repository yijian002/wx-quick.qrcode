
//获取应用实例
const app = getApp()

var util = require('../../utils/util.js')
var config = require('../../utils/config.js')

const setList = list => {
    let nlist = {};
    for(let i = 0, len = list.length; i < len; i++) {
        let k = '' + list[i].year + list[i].month + list[i].day
        if (!nlist[k]) {
            nlist[k] = [];
        }
        nlist[k].push(list[i]);
    }

    let arr = [];
    for (let k in nlist) {
        arr.push(nlist[k]);
    }
    // console.log(arr)
    return arr;
    
}

var qrcode_list = [];

Page({
    data: {
        hasUserInfo: false,
        userInfo: {},
        qrcodeList: []
    },
    cameraQrcode: () => {
        wx.scanCode({
            onlyFromCamera: true,
            success: (res) => {
              qrcode_list = [{ 
                content: res.result,
                year: times.getFullYear(),
                month: times.getMonth() + 1,
                day: util.formatNumber(times.getDate()),
                time: util.formatNumber(times.getHours()) + ':' + util.formatNumber(times.getMinutes())
              }].concat(qrcode_list);

              this.setData({ qrcodeList: setList(qrcode_list) });
              wx.setStorage({
                key: config.CACHE.list_qrcodes,
                data: qrcode_list
              })
            }
        });
    },
    onLoad: () => {
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

    },
    onReady: () => {
        wx.getStorage({
            key: config.CACHE.list_qrcodes,
            success: function (res) {
                qrcode_list = res.data || []
                console.log(qrcode_list)
                this.setData({ qrcodeList: setList(qrcode_list) });
            }
        })
    }
})
