Page({
  data: {
    currentTab: 0,
    tabs: ['全部', '待支付', '待接单', '进行中', '已完成'],
    orders: []
  },

  onLoad() {
    this.loadOrders();
  },

  onShow() {
    this.loadOrders();
  },

  loadOrders() {
    const app = getApp();
    const orders = app.getOrders();
    this.setData({
      orders: orders
    });
  },

  onTabChange(e) {
    const index = e.currentTarget.dataset.index;
    this.setData({
      currentTab: index
    });
  },

  onOrderTap(e) {
    const orderId = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/order-detail/order-detail?id=' + orderId
    });
  },

  goToPets() {
    wx.navigateTo({
      url: '/pages/pets/pets'
    });
  },

  getFilteredOrders() {
    const { currentTab, orders } = this.data;
    
    if (currentTab === 0) {
      return orders;
    }
    
    const statusMap = {
      1: 'unpaid',
      2: 'pending',
      3: 'processing',
      4: 'completed'
    };
    
    return orders.filter(order => order.status === statusMap[currentTab]);
  }
})
