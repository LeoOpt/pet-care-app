Page({
  data: {
    todayDate: '',
    todayIncome: 0,
    todayOrders: 0,
    monthIncome: 0,
    currentFilter: 0,
    filterOptions: ['全部', '附近优先', '高收入', '上门喂养', '遛狗服务', '宠物洗澡'],
    availableOrders: [
      {
        id: 'ORD001',
        orderId: 'ORD20240120001',
        userName: '小明',
        userAvatarLetter: '明',
        location: '朝阳区·1.2km',
        distance: '1.2km',
        services: ['上门喂养'],
        serviceTime: '2024-01-20 10:00',
        duration: '1小时',
        petCount: 1,
        price: 80
      },
      {
        id: 'ORD002',
        orderId: 'ORD20240120002',
        userName: '小红',
        userAvatarLetter: '红',
        location: '海淀区·2.5km',
        distance: '2.5km',
        services: ['上门喂养', '遛狗服务'],
        serviceTime: '2024-01-20 14:00',
        duration: '2小时',
        petCount: 2,
        price: 180
      },
      {
        id: 'ORD003',
        orderId: 'ORD20240120003',
        userName: '小白',
        userAvatarLetter: '白',
        location: '东城区·3.1km',
        distance: '3.1km',
        services: ['宠物洗澡'],
        serviceTime: '2024-01-21 09:00',
        duration: '1.5小时',
        petCount: 1,
        price: 120
      },
      {
        id: 'ORD004',
        orderId: 'ORD20240120004',
        userName: '李',
        userAvatarLetter: '李',
        location: '西城区·4.0km',
        distance: '4.0km',
        services: ['上门喂养'],
        serviceTime: '2024-01-21 15:00',
        duration: '1小时',
        petCount: 1,
        price: 80
      }
    ],
    hasPendingOrders: false,
    pendingCount: 0
  },

  onLoad() {
    this.initTodayDate();
    this.loadIncomeData();
    this.updatePendingCount();
  },

  onShow() {
    this.checkFeederRole();
  },

  onPullDownRefresh() {
    this.loadIncomeData();
    wx.stopPullDownRefresh();
  },

  initTodayDate() {
    const now = new Date();
    const month = now.getMonth() + 1;
    const day = now.getDate();
    this.setData({
      todayDate: month + '月' + day + '日'
    });
  },

  loadIncomeData() {
    const mockIncomeData = {
      todayIncome: 260,
      todayOrders: 3,
      monthIncome: 5680
    };

    this.setData({
      todayIncome: mockIncomeData.todayIncome,
      todayOrders: mockIncomeData.todayOrders,
      monthIncome: mockIncomeData.monthIncome
    });
  },

  checkFeederRole() {
    const app = getApp();
    const userRole = app.getUserRole();
    
    if (userRole !== 'feeder') {
      wx.showModal({
        title: '提示',
        content: '当前为用户模式，是否切换为服务者模式？',
        success: (res) => {
          if (res.confirm) {
            app.switchRole('feeder');
          } else {
            wx.navigateBack();
          }
        }
      });
    }
  },

  updatePendingCount() {
    const unacceptedOrders = this.data.availableOrders.filter(order => !order.isAccepted);
    this.setData({
      hasPendingOrders: unacceptedOrders.length > 0,
      pendingCount: unacceptedOrders.length
    });
  },

  getMockOrders() {
    return [
      {
        id: 'ORD001',
        orderId: 'ORD20240120001',
        userName: '小明',
        userAvatarLetter: '明',
        location: '朝阳区·1.2km',
        distance: '1.2km',
        services: ['上门喂养'],
        serviceTime: '2024-01-20 10:00',
        duration: '1小时',
        petCount: 1,
        price: 80
      },
      {
        id: 'ORD002',
        orderId: 'ORD20240120002',
        userName: '小红',
        userAvatarLetter: '红',
        location: '海淀区·2.5km',
        distance: '2.5km',
        services: ['上门喂养', '遛狗服务'],
        serviceTime: '2024-01-20 14:00',
        duration: '2小时',
        petCount: 2,
        price: 180
      },
      {
        id: 'ORD003',
        orderId: 'ORD20240120003',
        userName: '小白',
        userAvatarLetter: '白',
        location: '东城区·3.1km',
        distance: '3.1km',
        services: ['宠物洗澡'],
        serviceTime: '2024-01-21 09:00',
        duration: '1.5小时',
        petCount: 1,
        price: 120
      },
      {
        id: 'ORD004',
        orderId: 'ORD20240120004',
        userName: '李',
        userAvatarLetter: '李',
        location: '西城区·4.0km',
        distance: '4.0km',
        services: ['上门喂养'],
        serviceTime: '2024-01-21 15:00',
        duration: '1小时',
        petCount: 1,
        price: 80
      }
    ];
  },

  onFilterChange(e) {
    const index = e.currentTarget.dataset.index;
    const filterName = this.data.filterOptions[index];
    
    this.setData({
      currentFilter: index
    });

    let filteredOrders = this.getMockOrders();
    
    switch(filterName) {
      case '全部':
        break;
      case '附近优先':
        filteredOrders = filteredOrders.sort((a, b) => {
          const distA = parseFloat(a.distance);
          const distB = parseFloat(b.distance);
          return distA - distB;
        });
        break;
      case '高收入':
        filteredOrders = filteredOrders.sort((a, b) => b.price - a.price);
        break;
      case '上门喂养':
        filteredOrders = filteredOrders.filter(order => 
          order.services.includes('上门喂养')
        );
        break;
      case '遛狗服务':
        filteredOrders = filteredOrders.filter(order => 
          order.services.includes('遛狗服务')
        );
        break;
      case '宠物洗澡':
        filteredOrders = filteredOrders.filter(order => 
          order.services.includes('宠物洗澡')
        );
        break;
    }

    this.setData({
      availableOrders: filteredOrders
    });
    this.updatePendingCount();
  },

  onOrderDetail(e) {
    const orderId = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/feeder/pages/order-detail/order-detail?id=' + orderId
    });
  },

  onAcceptOrder(e) {
    const orderId = e.currentTarget.dataset.id;
    
    wx.showModal({
      title: '确认接单',
      content: '确定要接受此订单吗？',
      success: (res) => {
        if (res.confirm) {
          const orders = this.data.availableOrders.map(order => {
            if (order.id === orderId) {
              return { ...order, isAccepted: true };
            }
            return order;
          });

          this.setData({
            availableOrders: orders
          });

          wx.showToast({
            title: '接单成功',
            icon: 'success',
            duration: 2000
          });
          
          this.updatePendingCount();
        }
      }
    });
  },

  onQuickAccept() {
    const unacceptedOrders = this.data.availableOrders.filter(order => !order.isAccepted);
    
    if (unacceptedOrders.length === 0) {
      wx.showToast({
        title: '暂无可接订单',
        icon: 'none'
      });
      return;
    }

    wx.showModal({
      title: '一键接单',
      content: '确定要一次接受所有 ' + unacceptedOrders.length + ' 个订单吗？',
      success: (res) => {
        if (res.confirm) {
          const orders = this.data.availableOrders.map(order => {
            return { ...order, isAccepted: true };
          });

          this.setData({
            availableOrders: orders
          });

          wx.showToast({
            title: '批量接单成功',
            icon: 'success',
            duration: 2000
          });
          
          this.updatePendingCount();
        }
      }
    });
  }
})
