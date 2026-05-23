// pages/home/home.js
Page({
  data: {
    // 服务类型
    services: [
      { id: 1, name: '上门喂养', icon: '🐾' },
      { id: 2, name: '遛狗', icon: '🕐' },
      { id: 3, name: '宠物洗澡', icon: '🛁' },
      { id: 4, name: '更多服务', icon: '🔍' }
    ],
    // 喂养师列表
    feeders: [
      {
        id: 1,
        name: '李小红',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop',
        bio: '养宠5年经验，自家有一只金毛和一只猫，非常喜欢小动物',
        services: ['上门喂养', '遛狗', '宠物洗澡'],
        pricePerHour: 50,
        rating: 4.9,
        reviewCount: 128,
        isVerified: true
      },
      {
        id: 2,
        name: '王小花',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop',
        bio: '专业宠物护理师，持证上岗，可处理各类宠物',
        services: ['上门喂养', '遛狗', '宠物洗澡', '宠物医疗护理'],
        pricePerHour: 65,
        rating: 4.8,
        reviewCount: 86,
        isVerified: true
      }
    ]
  },

  onLoad() {
    console.log('首页加载')
  },

  // 点击服务类型
  handleServiceClick(e) {
    const service = e.currentTarget.dataset.service
    console.log('选择服务:', service)
    wx.navigateTo({
      url: '/pages/publish/publish'
    })
  },

  // 点击喂养师卡片
  handleFeederClick(e) {
    const id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: `/pages/feeder-detail/feeder-detail?id=${id}`
    })
  },

  // 搜索
  handleSearch() {
    wx.showToast({
      title: '搜索功能开发中',
      icon: 'none'
    })
  }
})
