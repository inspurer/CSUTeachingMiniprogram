Page({
  data: {
    inputPassword: false,
    account: '',
    password: '',
    isLogining: false
  },
  onLoad: function() {
    var that = this;
    if (!wx.getStorageSync("openId")) {
      wx.cloud.callFunction({
        name: 'getOpenid',
        complete: res => {
          console.log('云函数获取到的openid: ', res.result.openId)
          wx.setStorageSync('openId', res.result.openId);
        }
      })
    }
    let account = wx.getStorageSync("account")
    let password = wx.getStorageSync("password")
    if(account&&password){
      that.setData({
        account:account,
        password:password
      })
    }


  },
  pwdFocus() {
    this.setData({
      inputPassword: true
    })
  },
  pwdBlur() {
    this.setData({
      inputPassword: false
    })
  },
  bindAccountInput(e) {
    this.setData({
      account: e.detail.value
    })
  },
  bindPasswordInput(e) {
    this.setData({
      password: e.detail.value
    })
  },
  bindIdentity() {
    var that = this
    that.setData({
      isLogining: true
    })
    if (!that.data.account || that.data.account.length < 10) {
      that.setData({
        isLogining: false
      })
      wx.showToast({
        title: '账号格式不对',
        icon: 'loading'
      })
      return
    } else if (!that.data.password) {
      that.setData({
        isLogining: false
      })
      wx.showToast({
        title: '请输入密码',
        icon: 'loading'
      })
      return
    }

    wx.request({
      url: 'https://xt98.tech:987/login',
      data: {
        account: that.data.account,
        password: that.data.password,
        openId: wx.getStorageSync("openId")
      },
      method: 'POST',
      header: {
        'Content-Type': 'application/json'
      }, // 设置请求的 header
      success: function(res) {
        // success
        console.log('ssss', res)
        if(res.data.code==601){
          wx.showToast({
            title: '密码/账号错误',
            icon: 'loading'
          })
        }
        else if (res.data.code == 600) {
          wx.setStorageSync('account', that.data.account)
          wx.setStorageSync('password', that.data.password)
          wx.switchTab({
            url: '../score/score',
          })
        } else if (res.data.code == 603) {
          wx.showModal({
            title: '温馨提示',
            content: '您需要先注册，这将在服务器上保留您的账号密码等信息，确认注册？',
            cancelText: '服务条款',
            confirmText: '确定注册',
            confirmColor: '#7cba23',
            success(res) {
              if (res.confirm) {
                wx.request({
                  url: 'https://xt98.tech:987/regist',
                  data: {
                    account: that.data.account,
                    password: that.data.password,
                    openId: wx.getStorageSync("openId")
                  },
                  method: 'POST',
                  header: {
                    'Content-Type': 'application/json'
                  }, // 设置请求的 header
                  success: function (res) {
                    if (res.data.code == 700) {
                      wx.setStorageSync('account', that.data.account)
                      wx.setStorageSync('password', that.data.password)

                      wx.switchTab({
                        url: '../score/score',
                      })
                    }
                  }
                })
              } else if (res.cancel) {
              }
            }
          })
          // 要先注册
        } else if(res.data.code==602){
          wx.showToast({
            title: '密码错误',
            icon: 'loading'
          })
        }else{
          wx.showToast({
            title: '微信账号错误',
            icon: 'loading'
          })
        }
      },
      fail: function() {
        console.log('fff')
        // fail
      },
      complete: function() {
        console.log('cccc')
        // complete
        that.setData({
          isLogining: false
        })
      }
    })

  },

  reset:function(e){
    console.log(e)
    wx.showToast({
      title: '尚未开放该功能',
      icon: 'loading'
    })
  },

  answer:function(e){
    wx.navigateTo({
      url: '../about/about',
    })
  },

  onShareAppMessage: function () {
    var name = wx.getStorageSync("name")
    if(name){
      return {
        title: '中南教务通',
        desc: name+'邀您一起加入中南教务通!',
      }
    }else{
      return {
        title: '中南教务通',
        desc: '邀您一起加入中南教务通!',
      }
    }

  },

  onShow: function(){
    
  }

})