Page({
  data: {
    order: null
  },

  onLoad(options) {
    const orderId = options.id;
    this.loadOrder(orderId);
  },

  loadOrder(orderId) {
    const app = getApp();
    const orders = app.getOrders();
    const order = orders.find(o => o.id === orderId);
    
    if (order) {
      this.setData({
        order: order
      });
    }
  },

  contactFeeder() {
    wx.makePhoneCall({
      phoneNumber: '13800008888',
      success: () => {
        console.log('拨打电话成功');
      }
    });
  },

  cancelOrder() {
    wx.showModal({
      title: '确认取消',
      content: '确定要取消此订单吗？',
      success: (res) => {
        if (res.confirm) {
          const app = getApp();
          let orders = app.getOrders();
          const orderIndex = orders.findIndex(o => o.id === this.data.order.id);
          
          if (orderIndex !== -1) {
            orders[orderIndex].status = 'cancelled';
            orders[orderIndex].statusText = '已取消';
            orders[orderIndex].statusDesc = '订单已取消';
            
            wx.setStorageSync('orders', orders);
            app.globalData.orders = orders;
            
            wx.showToast({
              title: '订单已取消',
              icon: 'success'
            });
            
            this.loadOrder(this.data.order.id);
          }
        }
      }
    });
  },

  confirmComplete() {
    wx.showModal({
      title: '确认完成',
      content: '确认服务已完成吗？',
      success: (res) => {
        if (res.confirm) {
          const app = getApp();
          let orders = app.getOrders();
          const orderIndex = orders.findIndex(o => o.id === this.data.order.id);
          
          if (orderIndex !== -1) {
            orders[orderIndex].status = 'completed';
            orders[orderIndex].statusText = '已完成';
            orders[orderIndex].statusDesc = '服务已完成，感谢您的使用';
            
            wx.setStorageSync('orders', orders);
            app.globalData.orders = orders;
            
            wx.showToast({
              title: '已确认完成',
              icon: 'success'
            });
            
            this.loadOrder(this.data.order.id);
          }
        }
      }
    });
  },

  rateOrder() {
    wx.showToast({
      title: '评价功能开发中',
      icon: 'none'
    });
  }
})
