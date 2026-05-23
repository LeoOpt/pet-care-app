Page({
  data: {
    userInfo: {
      nickName: '宠物主人',
      avatarLetter: '宠',
      phone: '138****8888'
    },
    stats: {
      orders: 0,
      pets: 0,
      balance: 0
    },
    menuItems: [
      {
        id: 'orders',
        icon: '📋',
        name: '我的订单',
        arrow: true
      },
      {
        id: 'pets',
        icon: '🐾',
        name: '我的宠物',
        arrow: true
      },
      {
        id: 'balance',
        icon: '💰',
        name: '我的钱包',
        arrow: true,
        badge: '余额'
      },
      {
        id: 'coupons',
        icon: '🎫',
        name: '优惠券',
        arrow: true
      }
    ],
    otherItems: [
      {
        id: 'settings',
        icon: '⚙️',
        name: '设置',
        arrow: true
      },
      {
        id: 'help',
        icon: '❓',
        name: '帮助中心',
        arrow: true
      },
      {
        id: 'about',
        icon: 'ℹ️',
        name: '关于我们',
        arrow: true
      }
    ]
  },

  onLoad() {
    this.loadUserData();
  },

  onShow() {
    this.loadUserData();
  },

  loadUserData() {
    const app = getApp();
    const pets = app.getPets();
    const orders = app.getOrders();
    const balance = app.getBalance();
    
    this.setData({
      'stats.orders': orders.length,
      'stats.pets': pets.length,
      'stats.balance': balance
    });
  },

  onMenuTap(e) {
    const menuId = e.currentTarget.dataset.id;
    
    switch (menuId) {
      case 'orders':
        wx.switchTab({
          url: '/pages/orders/orders'
        });
        break;
      case 'pets':
        wx.navigateTo({
          url: '/pages/pets/pets'
        });
        break;
      case 'balance':
        wx.showToast({
          title: '钱包功能开发中',
          icon: 'none'
        });
        break;
      case 'coupons':
        wx.showToast({
          title: '优惠券功能开发中',
          icon: 'none'
        });
        break;
      case 'settings':
        wx.showToast({
          title: '设置功能开发中',
          icon: 'none'
        });
        break;
      case 'help':
        wx.showToast({
          title: '帮助中心功能开发中',
          icon: 'none'
        });
        break;
      case 'about':
        wx.showToast({
          title: '关于我们功能开发中',
          icon: 'none'
        });
        break;
    }
  },

  goToPublish() {
    wx.navigateTo({
      url: '/pages/publish/publish'
    });
  },

  switchToFeeder() {
    wx.showModal({
      title: '切换为服务者',
      content: '确定要切换到服务者模式吗？',
      success: (res) => {
        if (res.confirm) {
          const app = getApp();
          app.switchRole('feeder');
        }
      }
    });
  },

  onAvatarTap() {
    wx.chooseImage({
      count: 1,
      success: (res) => {
        console.log('选择头像:', res.tempFilePaths);
      }
    });
  }
})
