Page({
  data: {
    currentTab: 0,
    tabs: ['进行中', '已完成'],
    orders: [
      {
        id: 'ORD20240118001',
        ownerName: '王小明',
        ownerAvatar: '',
        ownerAvatarLetter: '王',
        ownerPhone: '139****8888',
        services: ['上门喂养', '遛狗'],
        serviceTime: '2024-01-20 10:00',
        serviceAddress: '朝阳区建国路88号1号楼101室',
        pets: ['小橘', '豆豆'],
        status: 'processing',
        statusText: '进行中',
        statusDesc: '请按时到达客户地址开始服务',
        price: 140
      },
      {
        id: 'ORD20240117002',
        ownerName: '李女士',
        ownerAvatar: '',
        ownerAvatarLetter: '李',
        ownerPhone: '138****6666',
        services: ['上门喂养'],
        serviceTime: '2024-01-19 14:00',
        serviceAddress: '海淀区中关村大街12号2单元502室',
        pets: ['咪咪'],
        status: 'processing',
        statusText: '进行中',
        statusDesc: '服务进行中，请完成服务后确认',
        price: 80
      },
      {
        id: 'ORD20240115003',
        ownerName: '张先生',
        ownerAvatar: '',
        ownerAvatarLetter: '张',
        ownerPhone: '137****5555',
        services: ['宠物洗澡'],
        serviceTime: '2024-01-17 09:00',
        serviceAddress: '东城区王府井大街66号3单元201室',
        pets: ['旺财'],
        status: 'completed',
        statusText: '已完成',
        statusDesc: '服务已完成，感谢您的服务',
        price: 100
      },
      {
        id: 'ORD20240110004',
        ownerName: '陈小姐',
        ownerAvatar: '',
        ownerAvatarLetter: '陈',
        ownerPhone: '136****4444',
        services: ['上门喂养', '补充粮水'],
        serviceTime: '2024-01-12 11:00',
        serviceAddress: '西城区金融街8号5单元401室',
        pets: ['小白'],
        status: 'completed',
        statusText: '已完成',
        statusDesc: '服务已完成，感谢您的服务',
        price: 110
      }
    ],
    showEmptyAll: false,
    showEmptyProcessing: false,
    showEmptyCompleted: false
  },

  onLoad() {
    console.log('接单者订单列表加载');
    this.updateEmptyStates();
  },

  onTabChange(e) {
    const index = e.currentTarget.dataset.index;
    this.setData({
      currentTab: index
    });
    this.updateEmptyStates();
  },

  updateEmptyStates() {
    const { currentTab, orders } = this.data;
    
    const hasProcessingOrders = orders.some(o => o.status === 'processing');
    const hasCompletedOrders = orders.some(o => o.status === 'completed');
    
    this.setData({
      showEmptyAll: orders.length === 0,
      showEmptyProcessing: currentTab === 0 && !hasProcessingOrders,
      showEmptyCompleted: currentTab === 1 && !hasCompletedOrders
    });
  },

  onOrderTap(e) {
    const orderId = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/feeder/pages/order-detail/order-detail?id=' + orderId
    });
  }
})
