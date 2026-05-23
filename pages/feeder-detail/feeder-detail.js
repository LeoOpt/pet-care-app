Page({
  data: {
    feeder: {
      id: 1,
      name: '张阿姨',
      avatar: '',
      avatarLetter: '张',
      rating: 4.9,
      reviewCount: 328,
      intro: '资深宠物爱好者，擅长照顾各类宠物，有多年养宠经验。对待每一只小动物都像对待自己的孩子一样，有耐心、有爱心。',
      tags: ['猫咪专业', '狗狗照料', '爱心满满', '经验丰富'],
      price: 80,
      distance: '1.2km',
      services: [
        { name: '上门喂养', price: 80, unit: '次' },
        { name: '遛狗服务', price: 60, unit: '次' },
        { name: '宠物洗澡', price: 100, unit: '次' },
        { name: '补充粮水', price: 30, unit: '次' },
        { name: '清理卫生', price: 50, unit: '次' }
      ],
      certifications: ['宠物护理证书', '急救培训证书', '身份认证']
    },
    reviews: [
      {
        id: 1,
        userName: '李小姐',
        avatar: '',
        avatarLetter: '李',
        rating: 5,
        content: '张阿姨非常细心，对我家猫咪照顾得很好！还会主动拍照汇报情况，非常满意！',
        date: '2024-01-15'
      },
      {
        id: 2,
        userName: '王先生',
        avatar: '',
        avatarLetter: '王',
        rating: 5,
        content: '服务态度很好，准时到达，工作认真负责。下次还会选择张阿姨！',
        date: '2024-01-10'
      },
      {
        id: 3,
        userName: '陈女士',
        avatar: '',
        avatarLetter: '陈',
        rating: 4,
        content: '整体不错，就是时间稍微有点赶。不过阿姨人很好，下次还会预约的。',
        date: '2024-01-05'
      }
    ],
    selectedServiceIndex: 0
  },

  onLoad(options) {
    const feederId = options.id || 1;
    console.log('喂养师ID:', feederId);
  },

  onServiceSelect(e) {
    const index = e.currentTarget.dataset.index;
    this.setData({
      selectedServiceIndex: index
    });
  },

  contactFeeder() {
    wx.showToast({
      title: '联系功能开发中',
      icon: 'none'
    });
  },

  bookService() {
    const feeder = this.data.feeder;
    const selectedService = feeder.services[this.data.selectedServiceIndex];
    
    wx.showModal({
      title: '确认预约',
      content: `确定预约 ${feeder.name} 的${selectedService.name}服务吗？`,
      success: (res) => {
        if (res.confirm) {
          wx.navigateTo({
            url: '/pages/publish/publish'
          });
        }
      }
    });
  }
})
