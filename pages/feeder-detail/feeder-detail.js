// pages/feeder-detail/feeder-detail.js
Page({
  data: {
    feederId: null,
    feeder: {
      id: 1,
      name: '李小红',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop',
      bio: '养宠5年经验，自家有一只金毛和一只猫，非常喜欢小动物。专业宠物护理，细心耐心。',
      services: ['上门喂养', '遛狗', '宠物洗澡'],
      pricePerHour: 50,
      rating: 4.9,
      reviewCount: 128,
      isVerified: true,
      tags: ['认证喂养师', '5年经验', '有养宠经历']
    },
    reviews: [
      { id: 1, userName: '宠主A', rating: 5, content: '非常专业，对猫咪很好，下次还会找她！', time: '2024-05-18' },
      { id: 2, userName: '宠主B', rating: 5, content: '服务很到位，准时上门，很放心', time: '2024-05-15' }
    ]
  },

  onLoad(options) {
    if (options.id) {
      this.setData({ feederId: options.id })
    }
  },

  handleContact() {
    wx.showToast({ title: '联系功能开发中', icon: 'none' })
  },

  handleBook() {
    wx.navigateTo({ url: '/pages/publish/publish' })
  }
})
