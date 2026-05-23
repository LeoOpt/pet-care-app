Page({
  data: {
    searchKeyword: '',
    serviceTypes: [
      { id: 1, name: '上门喂养', icon: 'home', color: '#FF9D5C', desc: '专业喂养' },
      { id: 2, name: '遛狗服务', icon: 'walk', color: '#4CAF50', desc: '遛狗陪玩' },
      { id: 3, name: '宠物洗澡', icon: 'bath', color: '#2196F3', desc: '清洁护理' },
      { id: 4, name: '更多服务', icon: 'more', color: '#9C27B0', desc: '更多选择' }
    ],
    feeders: []
  },

  onLoad() {
    this.loadFeeders();
  },

  onShow() {
    this.checkUserRole();
  },

  checkUserRole() {
    const app = getApp();
    const userRole = app.getUserRole();
    
    if (userRole === 'feeder') {
      wx.showModal({
        title: '提示',
        content: '当前为服务者模式，是否切换为用户模式？',
        success: (res) => {
          if (res.confirm) {
            app.switchRole('user');
          }
        }
      });
    }
  },

  loadFeeders() {
    const mockFeeders = [
      {
        id: 'feeder_001',
        name: '张阿姨',
        avatarLetter: '张',
        rating: 4.9,
        reviewCount: 328,
        intro: '资深宠物爱好者，擅长照顾各类宠物，有多年养宠经验',
        tags: ['猫咪专业', '狗狗照料', '爱心满满'],
        price: 80,
        distance: '1.2km',
        isVerified: true
      },
      {
        id: 'feeder_002',
        name: '李叔叔',
        avatarLetter: '李',
        rating: 4.8,
        reviewCount: 256,
        intro: '退休教师，喜欢小动物，对宠物有耐心和责任心',
        tags: ['大型犬', '宠物陪伴', '准时守约'],
        price: 100,
        distance: '2.5km',
        isVerified: true
      },
      {
        id: 'feeder_003',
        name: '王小姐',
        avatarLetter: '王',
        rating: 4.7,
        reviewCount: 189,
        intro: '宠物美容师出身，专业技能强，服务细心周到',
        tags: ['美容护理', '猫咪洗澡', '精品服务'],
        price: 120,
        distance: '3.1km',
        isVerified: false
      },
      {
        id: 'feeder_004',
        name: '陈先生',
        avatarLetter: '陈',
        rating: 4.9,
        reviewCount: 412,
        intro: '动物医学专业背景，擅长宠物健康护理',
        tags: ['健康护理', '喂药打针', '经验丰富'],
        price: 90,
        distance: '1.8km',
        isVerified: true
      }
    ];
    
    this.setData({
      feeders: mockFeeders
    });
  },

  onSearch(e) {
    const keyword = e.detail.value;
    this.setData({
      searchKeyword: keyword
    });
    
    if (!keyword) {
      wx.showToast({
        title: '请输入搜索关键词',
        icon: 'none'
      });
    } else {
      wx.showToast({
        title: '搜索功能开发中',
        icon: 'none'
      });
    }
  },

  onServiceTap(e) {
    const { id, name } = e.currentTarget.dataset;
    
    if (id === 4) {
      wx.showToast({
        title: '更多服务即将上线',
        icon: 'none'
      });
    } else {
      wx.navigateTo({
        url: '/pages/publish/publish?serviceType=' + id
      });
    }
  },

  onFeederTap(e) {
    const feederId = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/order-detail/order-detail?feederId=' + feederId
    });
  },

  goToPublish() {
    const app = getApp();
    const pets = app.getPets();
    
    if (pets.length === 0) {
      wx.showModal({
        title: '提示',
        content: '您还没有添加宠物，请先添加宠物',
        confirmText: '去添加',
        success: (res) => {
          if (res.confirm) {
            wx.navigateTo({
              url: '/pages/pets/add-pet/add-pet'
            });
          }
        }
      });
    } else {
      wx.navigateTo({
        url: '/pages/publish/publish'
      });
    }
  }
})
