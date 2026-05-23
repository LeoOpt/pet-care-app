App({
  globalData: {
    userInfo: null,
    userRole: 'user',
    isFeeder: false,
    isLogin: false,
    pets: [],
    orders: [],
    balance: 0
  },

  onLaunch() {
    this.checkUserRole();
    this.initMockData();
  },

  checkUserRole() {
    const userRole = wx.getStorageSync('userRole') || 'user';
    const isFeeder = wx.getStorageSync('isFeeder') || false;
    
    this.globalData.userRole = userRole;
    this.globalData.isFeeder = isFeeder;
    
    console.log('用户角色:', userRole, '是否是服务者:', isFeeder);
  },

  switchRole(role) {
    this.globalData.userRole = role;
    this.globalData.isFeeder = (role === 'feeder');
    
    wx.setStorageSync('userRole', role);
    wx.setStorageSync('isFeeder', this.globalData.isFeeder);
    
    const targetPage = role === 'user' ? '/pages/home/home' : '/feeder/pages/home/home';
    
    wx.reLaunch({
      url: targetPage
    });
  },

  initMockData() {
    const pets = wx.getStorageSync('pets');
    if (!pets) {
      const mockPets = [
        {
          id: 'pet_001',
          name: '小橘',
          type: 'cat',
          breed: '橘猫',
          gender: 'male',
          age: 2,
          weight: 5.5,
          isNeutered: true,
          vaccinationStatus: '已全部接种',
          healthInfo: '身体健康',
          feedingNotes: '每天喂两次，早晚各30g猫粮',
          behaviorNotes: '性格温顺，喜欢蹭人',
          isDefault: true
        },
        {
          id: 'pet_002',
          name: '豆豆',
          type: 'dog',
          breed: '柯基',
          gender: 'female',
          age: 1,
          weight: 12,
          isNeutered: false,
          vaccinationStatus: '已全部接种',
          healthInfo: '身体健康，精力充沛',
          feedingNotes: '每天喂三次，每次100g狗粮',
          behaviorNotes: '活泼好动，喜欢玩球',
          isDefault: false
        }
      ];
      
      wx.setStorageSync('pets', mockPets);
      this.globalData.pets = mockPets;
    } else {
      this.globalData.pets = pets;
    }

    const orders = wx.getStorageSync('orders');
    if (!orders) {
      const mockOrders = [
        {
          id: 'order_001',
          orderNo: 'ORD20240115001',
          userId: 'user_001',
          feederId: 'feeder_001',
          feederName: '张阿姨',
          feederAvatarLetter: '张',
          status: 'pending',
          statusText: '待接单',
          statusDesc: '喂养师正在确认订单，请耐心等待',
          services: [
            { name: '上门喂养', price: 80, selected: true },
            { name: '遛狗', price: 60, selected: true }
          ],
          pets: ['小橘', '豆豆'],
          serviceTime: '2024-01-20 10:00',
          serviceAddress: '朝阳区建国路88号1号楼101室',
          remark: '小橘比较怕生，请轻声细语；豆豆喜欢玩球',
          totalAmount: 140,
          actualPaid: 140,
          createTime: '2024-01-15 14:30'
        },
        {
          id: 'order_002',
          orderNo: 'ORD20240114002',
          userId: 'user_001',
          feederId: 'feeder_002',
          feederName: '李叔叔',
          feederAvatarLetter: '李',
          status: 'processing',
          statusText: '服务中',
          statusDesc: '喂养师正在为您服务',
          services: [
            { name: '上门喂养', price: 80, selected: true }
          ],
          pets: ['小橘'],
          serviceTime: '2024-01-18 14:00',
          serviceAddress: '朝阳区建国路88号1号楼101室',
          remark: '小橘今天有点不舒服，请多注意观察',
          totalAmount: 80,
          actualPaid: 80,
          createTime: '2024-01-14 09:00'
        }
      ];
      
      wx.setStorageSync('orders', mockOrders);
      this.globalData.orders = mockOrders;
    } else {
      this.globalData.orders = orders;
    }

    const balance = wx.getStorageSync('balance');
    if (!balance) {
      wx.setStorageSync('balance', 500);
      this.globalData.balance = 500;
    } else {
      this.globalData.balance = balance;
    }
  },

  getUserRole() {
    return this.globalData.userRole;
  },

  getIsFeeder() {
    return this.globalData.isFeeder;
  },

  getPets() {
    return this.globalData.pets;
  },

  getOrders() {
    return this.globalData.orders;
  },

  getBalance() {
    return this.globalData.balance;
  }
})
