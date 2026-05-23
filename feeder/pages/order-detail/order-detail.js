Page({
  data: {
    order: null
  },

  onLoad(options) {
    const orderId = options.id;
    this.loadOrder(orderId);
  },

  loadOrder(orderId) {
    const mockOrder = {
      id: orderId,
      orderNo: 'ORD20240115001',
      userInfo: {
        name: '宠物主人',
        avatarLetter: '宠',
        phone: '138****8888'
      },
      status: 'pending',
      statusText: '待服务',
      statusDesc: '等待服务开始',
      services: [
        { name: '上门喂养', price: 80 },
        { name: '遛狗', price: 60 }
      ],
      pets: ['小橘', '豆豆'],
      serviceTime: '2024-01-20 10:00',
      serviceAddress: '朝阳区建国路88号1号楼101室',
      remark: '小橘比较怕生，请轻声细语；豆豆喜欢玩球',
      feeDetails: {
        serviceFee: 140,
        totalAmount: 140
      },
      createTime: '2024-01-15 14:30'
    };
    
    this.setData({
      order: mockOrder
    });
  },

  contactUser() {
    wx.makePhoneCall({
      phoneNumber: '13800008888',
      success: () => {
        console.log('拨打电话成功');
      }
    });
  },

  startService() {
    wx.showModal({
      title: '开始服务',
      content: '确认开始服务吗？',
      success: (res) => {
        if (res.confirm) {
          wx.showToast({
            title: '服务已开始',
            icon: 'success'
          });
          
          // 更新订单状态
          if (this.data.order) {
            this.setData({
              'order.status': 'processing',
              'order.statusText': '服务中',
              'order.statusDesc': '服务进行中'
            });
          }
        }
      }
    });
  },

  completeService() {
    wx.showModal({
      title: '完成服务',
      content: '确认服务已完成吗？',
      success: (res) => {
        if (res.confirm) {
          wx.showToast({
            title: '服务已完成',
            icon: 'success'
          });
          
          // 更新订单状态
          if (this.data.order) {
            this.setData({
              'order.status': 'completed',
              'order.statusText': '已完成',
              'order.statusDesc': '服务已完成'
            });
          }
        }
      }
    });
  }
})
