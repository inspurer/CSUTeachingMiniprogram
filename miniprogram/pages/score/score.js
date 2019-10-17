
Page({
  data: {
    openId: '',
    name: '赵子龙',
    totalCredit: 145,
    average: 99,
    rank: 1,
    isSubed: 0,
    noNotice:true,
    notice_content: '跑马灯跑马灯跑马灯跑马灯跑马灯跑马灯跑马灯跑马灯跑马灯',
    recommand: '暂无推荐'

  },

  changeSwitch: function (e) {
    var that = this
    var isSubed = 1
    if(e.detail.value==false){
      isSubed = 0
    }
    that.setData({
      isSubed:isSubed
    })
    console.log(e.detail.value, that.data.isSubed)
    wx.request({
      url: 'https://xt98.tech:987/changesub',
      data: {
        account: wx.getStorageSync("account"),
        isSubed: isSubed
      },
      method: 'POST',
      header: {
        'Content-Type': 'application/json'
      }, // 设置请求的 header
      success: function (res) {
        // success
        console.log('ssss', res)

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
  },


  queryUserinfo: function () {
    var that = this
    wx.request({
      url: 'https://xt98.tech:987/queryuserinfo',
      data: {
        openId: wx.getStorageSync("openId")
      },
      method: 'POST',
      header: {
        'Content-Type': 'application/json'
      }, // 设置请求的 header
      success: function (res) {
        // success
        console.log('ssss', res)
        if (res.data.code == 800) {
          that.queryRecommand()
          that.setData({
            name: res.data.data.name,
            totalCredit: res.data.data.totalCredit,
            average: res.data.data.average,
            rank: res.data.data.rank,
            isSubed: res.data.data.isSubed
          })
          wx.setStorageSync("name", res.data.data.name)
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
  },

  queryNotice: function () {
    var that = this
    wx.request({
      url: 'https://xt98.tech:987/getnotice',
  
      method: 'POST',
      header: {
        'Content-Type': 'application/json'
      }, // 设置请求的 header
      success: function (res) {
        // success
        console.log('ssss', res)
        if (res.data.code == 1) {
          that.setData({
            noNotice: false,
            notice_content: res.data.content,
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
  },

  queryRecommand: function () {
    var that = this
    wx.request({
      url: 'https://xt98.tech:987/getrecommand',

      method: 'POST',
      header: {
        'Content-Type': 'application/json'
      }, // 设置请求的 header
      success: function (res) {
        // success
        console.log('ssss', res)
        if (res.data.code == 1) {
          that.queryNotice()
          that.setData({
            recommand: res.data.content,
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
  },

  onShow: function () {

  },

  onHide: function () {
  },

  scoreList: function (e) {
    wx.navigateTo({
      url: '../scoreList/scoreList',
    })
  },

  onLoad: function () {

    this.queryUserinfo()
 
  }

})