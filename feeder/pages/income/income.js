Page({
  data: {
    currentTab: 0,
    tabs: ['今日', '本周', '本月'],
    summary: {
      today: 256.00,
      week: 1280.50,
      month: 5680.00,
      total: 28560.00,
      withdrawable: 5680.00
    },
    incomeList: [
      {
        id: 'INC20240120001',
        orderId: 'ORD20240120001',
        ownerName: '李女士',
        ownerAvatarLetter: '李',
        services: ['上门喂养', '遛狗'],
        serviceTime: '2024-01-20 10:00',
        amount: 140.00,
        status: 'completed',
        statusText: '已到账'
      },
      {
        id: 'INC20240119002',
        orderId: 'ORD20240119002',
        ownerName: '王先生',
        ownerAvatarLetter: '王',
        services: ['上门喂养'],
        serviceTime: '2024-01-19 14:00',
        amount: 80.00,
        status: 'completed',
        statusText: '已到账'
      },
      {
        id: 'INC20240118003',
        orderId: 'ORD20240118003',
        ownerName: '张小姐',
        ownerAvatarLetter: '张',
        services: ['宠物洗澡'],
        serviceTime: '2024-01-18 09:00',
        amount: 100.00,
        status: 'completed',
        statusText: '已到账'
      },
      {
        id: 'INC20240117004',
        orderId: 'ORD20240117004',
        ownerName: '陈先生',
        ownerAvatarLetter: '陈',
        services: ['上门喂养', '补充粮水'],
        serviceTime: '2024-01-17 11:00',
        amount: 120.00,
        status: 'completed',
        statusText: '已到账'
      }
    ],
    todayList: [],
    weekList: [],
    monthList: []
  },

  onLoad() {
    console.log('收入统计页面加载');
    this.initIncomeData();
  },

  initIncomeData() {
    const allList = this.data.incomeList;
    const today = new Date();
    const todayStr = this.formatDate(today);
    
    const todayList = allList.filter(item => {
      return item.serviceTime.startsWith(todayStr);
    });
    
    const weekStart = new Date(today);
    weekStart.setDate(today.getDate() - today.getDay());
    const weekList = allList.filter(item => {
      const itemDate = new Date(item.serviceTime);
      return itemDate >= weekStart && itemDate <= today;
    });
    
    const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);
    const monthList = allList.filter(item => {
      const itemDate = new Date(item.serviceTime);
      return itemDate >= monthStart && itemDate <= today;
    });
    
    this.setData({
      todayList,
      weekList,
      monthList
    });
  },

  formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  },

  onTabChange(e) {
    const index = e.currentTarget.dataset.index;
    this.setData({
      currentTab: index
    });
  },

  onIncomeTap(e) {
    const incomeId = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/feeder/pages/order-detail/order-detail?id=' + incomeId
    });
  },

  onWithdrawTap() {
    const withdrawable = this.data.summary.withdrawable;
    
    if (withdrawable <= 0) {
      wx.showToast({
        title: '暂无可提现金额',
        icon: 'none'
      });
      return;
    }

    wx.showModal({
      title: '提现确认',
      content: `确定要提现 ¥${withdrawable.toFixed(2)} 到您的账户吗？`,
      success: (res) => {
        if (res.confirm) {
          wx.showLoading({
            title: '处理中...'
          });
          
          setTimeout(() => {
            wx.hideLoading();
            wx.showToast({
              title: '提现申请已提交',
              icon: 'success'
            });
            
            this.setData({
              'summary.withdrawable': 0
            });
          }, 1500);
        }
      }
    });
  },

  onWithdrawHistoryTap() {
    wx.showToast({
      title: '提现记录功能开发中',
      icon: 'none'
    });
  },

  getDisplayList() {
    const { currentTab, todayList, weekList, monthList } = this.data;
    
    switch (currentTab) {
      case 0:
        return todayList;
      case 1:
        return weekList;
      case 2:
        return monthList;
      default:
        return [];
    }
  },

  getCurrentAmount() {
    const { currentTab, summary } = this.data;
    
    switch (currentTab) {
      case 0:
        return summary.today;
      case 1:
        return summary.week;
      case 2:
        return summary.month;
      default:
        return 0;
    }
  }
})
