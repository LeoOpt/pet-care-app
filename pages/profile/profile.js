// pages/profile/profile.js
Page({
  data: {
    userInfo: {
      nickname: '宠主小明',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop',
      orderCount: 5,
      petCount: 2
    },
    menuItems: [
      { icon: '📋', text: '我的订单', path: '/pages/orders/orders' },
      { icon: '🐾', text: '我的宠物', path: '' },
      { icon: '💬', text: '消息中心', path: '' },
      { icon: '⚙️', text: '设置', path: '' },
      { icon: '❓', text: '帮助中心', path: '' }
    ]
  },

  onLoad() {
    console.log('个人中心加载')
  },

  handleMenuItemTap(e) {
    const path = e.currentTarget.dataset.path
    if (path) {
      wx.navigateTo({ url: path })
    } else {
      wx.showToast({ title: '功能开发中', icon: 'none' })
    }
  },

  handlePublishNeed() {
    wx.navigateTo({ url: '/pages/publish/publish' })
  }
})
