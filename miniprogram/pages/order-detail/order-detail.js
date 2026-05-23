// pages/order-detail/order-detail.js
Page({
  data: {
    orderId: null,
    order: {
      orderNo: '202405200001',
      status: '进行中',
      statusType: 'ongoing',
      feederName: '李小红',
      feederAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop',
      services: ['上门喂养', '遛狗'],
      petNames: ['毛毛', '咪咪'],
      startTime: '2024-05-22 09:00',
      endTime: '2024-05-25 18:00',
      address: '北京市朝阳区某某街道某某小区 1号楼 101室',
      notes: '毛毛需要每天遛两次，每次30分钟，早晚各一次。咪咪需要每天换猫粮和水，清理猫砂。',
      price: {
        serviceFee: 150,
        otherFee: 30,
        total: 180
      },
      createTime: '2024-05-20 14:30'
    }
  },

  onLoad(options) {
    if (options.id) {
      this.setData({ orderId: options.id })
    }
  },

  handleContact() {
    wx.showToast({ title: '联系功能开发中', icon: 'none' })
  },

  handleCancel() {
    wx.showModal({
      title: '确认取消',
      content: '您确定要取消这个订单吗？',
      success: (res) => {
        if (res.confirm) {
          wx.showToast({ title: '订单已取消', icon: 'success' })
        }
      }
    })
  }
})
