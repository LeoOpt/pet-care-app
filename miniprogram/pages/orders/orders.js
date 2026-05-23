// pages/orders/orders.js
Page({
  data: {
    activeTab: 0,
    tabs: ['全部', '待接单', '进行中', '已完成'],
    orders: [
      {
        id: 1,
        orderNo: '202405200001',
        feederName: '李小红',
        feederAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop',
        services: ['上门喂养', '遛狗'],
        startTime: '2024-05-22 09:00',
        status: '进行中',
        statusType: 'ongoing',
        price: 180
      },
      {
        id: 2,
        orderNo: '202405180002',
        feederName: '王小花',
        feederAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop',
        services: ['宠物洗澡'],
        startTime: '2024-05-19 14:00',
        status: '已完成',
        statusType: 'completed',
        price: 80
      }
    ]
  },

  onLoad() {
    console.log('订单页面加载')
  },

  handleTabChange(e) {
    const index = e.currentTarget.dataset.index
    this.setData({ activeTab: index })
  },

  handleOrderDetail(e) {
    const id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: `/pages/order-detail/order-detail?id=${id}`
    })
  }
})
