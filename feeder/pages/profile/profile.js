Page({
  data: {
    userInfo: {
      nickName: '服务者',
      avatarLetter: '服',
      phone: '138****8888',
      rating: 4.8,
      totalOrders: 45,
      totalIncome: 8500,
      balance: 2350
    },
    stats: {
      todayOrders: 3,
      todayIncome: 280,
      weekOrders: 18,
      weekIncome: 1680,
      monthOrders: 45,
      monthIncome: 8500,
      totalOrders: 320,
      avgRating: 4.8,
      activeDays: 89
    },
    isVerified: false,
    certificationStatus: 'pending'
  },

  onLoad() {
    this.checkCertification();
  },

  onShow() {
    this.checkUserRole();
  },

  checkUserRole() {
    const app = getApp();
    const userRole = app.getUserRole();
    
    if (userRole === 'user') {
      wx.showModal({
        title: '提示',
        content: '当前为用户模式，是否切换为服务者模式？',
        success: (res) => {
          if (res.confirm) {
            app.switchRole('feeder');
          }
        }
      });
    }
  },

  checkCertification() {
    const isVerified = wx.getStorageSync('isVerified') || false;
    this.setData({
      isVerified: isVerified
    });
  },

  goToIncome() {
    wx.navigateTo({
      url: '/feeder/pages/income/income'
    });
  },

  goToSettings() {
    wx.navigateTo({
      url: '/feeder/pages/settings/settings'
    });
  },

  goToMyOrders() {
    wx.navigateTo({
      url: '/feeder/pages/my-orders/my-orders'
    });
  },

  goToRegister() {
    wx.navigateTo({
      url: '/pages/auth/register-feeder/register-feeder'
    });
  },

  switchToUser() {
    const app = getApp();
    app.switchRole('user');
  }
})
