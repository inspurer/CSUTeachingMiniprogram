//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    colorArrays: ["#85B8CF", "#90C652", "#D8AA5A", "#FC9F9D", "#0A9A84", "#61BC69", "#12AEF3", "#E29AAD"],
    kblist: [
      { "weekday": 1, "start": 1, "occupy": 2, "name": "高等哲学@铁三-404" },
      { "weekday": 1, "start": 3, "occupy": 2, "name": "高等哲学@铁三-404" },
      { "weekday": 1, "start": 7, "occupy": 2, "name": "高等哲学@铁三-404" },
      { "weekday": 2, "start": 1, "occupy": 2, "name": "高等哲学@铁三-404" },
      { "weekday": 2, "start": 5, "occupy": 2, "name": "高等哲学@铁三-404" },
      { "weekday": 2, "start": 7, "occupy": 2, "name": "高等哲学@铁三-404" },
      { "weekday": 3, "start": 1, "occupy": 2, "name": "高等哲学@铁三-404" },
      { "weekday": 4, "start": 1, "occupy": 2, "name": "高等哲学@铁三-404" },
      { "weekday": 4, "start": 3, "occupy": 2, "name": "高等哲学@铁三-404" },
      { "weekday": 4, "start": 5, "occupy": 2, "name": "高等哲学@铁三-404" },
      { "weekday": 4, "start": 7, "occupy": 2, "name": "高等哲学@铁三-404" },
      { "weekday": 5, "start": 7, "occupy": 2, "name": "高等哲学@铁三-404" },
      { "weekday": 6, "start": 1, "occupy": 2, "name": "高等哲学@铁三-404" },
      { "weekday": 6, "start": 3, "occupy": 2, "name": "高等哲学@铁三-404" },
      { "weekday": 6, "start": 5, "occupy": 2, "name": "高等哲学@铁三-404" },
      { "weekday": 6, "start": 7, "occupy": 2, "name": "高等哲学@铁三-404" },

      { "weekday": 7, "start": 1, "occupy": 2, "name": "高等哲学@铁三404" },
      { "weekday": 7, "start": 7, "occupy": 2, "name": "高等哲学@铁三404" },





    ]
  },
  onLoad: function () {
    console.log('onLoad')
    this.queryKB()
  },

  detail:function(e){
    console.log(e)
    let that = this
    let period = e.currentTarget.dataset.period
    let teacher = e.currentTarget.dataset.teacher
    wx.showModal({
      title: '课程详情',
      content: '任课教师：'+teacher+'\n开课周：'+period,
      cancelText: '我看完了',
      confirmText: '我也是',
      confirmColor: '#7cba23',
      success(res) {
        if (res.confirm) {
        } else if (res.cancel) {
        }
      }
    })
  },

  queryKB: function(){
    var that = this;
    wx.request({
      url: 'https://xt98.tech:987/querytable',
      data: {
        account: wx.getStorageSync("account"),
      },
      method: 'POST',
      header: {
        'Content-Type': 'application/json'
      }, // 设置请求的 header
      success: function (res) {
        // success
        console.log('ssss', res)
        if(res.data.code==1){
          that.setData({
            kblist:res.data.data
          })
        }
      },
      fail: function () {
        console.log('fff')
        // fail
      },
      complete: function () {
        console.log('cccc')
        // complete
        that.setData({
          isLogining: false
        })
      }
    })
  }
})
