Page({
  data: {
    serviceTypes: [
      { id: 1, name: '上门喂养', price: 80, enabled: true },
      { id: 2, name: '遛狗服务', price: 60, enabled: true },
      { id: 3, name: '宠物洗澡', price: 100, enabled: false },
      { id: 4, name: '补充粮水', price: 30, enabled: false },
      { id: 5, name: '清理卫生', price: 50, enabled: false }
    ],
    serviceTime: {
      startHour: '09',
      startMinute: '00',
      endHour: '21',
      endMinute: '00'
    },
    serviceArea: {
      radius: 5,
      regions: ['朝阳区', '海淀区', '西城区']
    }
  },

  onLoad() {
    this.loadSettings();
  },

  loadSettings() {
    const savedSettings = wx.getStorageSync('feederSettings');
    if (savedSettings) {
      this.setData(savedSettings);
    }
  },

  toggleService(e) {
    const id = e.currentTarget.dataset.id;
    const serviceTypes = this.data.serviceTypes.map(service => {
      if (service.id === id) {
        service.enabled = !service.enabled;
      }
      return service;
    });
    
    this.setData({
      serviceTypes: serviceTypes
    });
  },

  onPriceChange(e) {
    const id = e.currentTarget.dataset.id;
    const value = e.detail.value;
    
    const serviceTypes = this.data.serviceTypes.map(service => {
      if (service.id === id) {
        service.price = Number(value) || 0;
      }
      return service;
    });
    
    this.setData({
      serviceTypes: serviceTypes
    });
  },

  onServiceTimeChange(e) {
    const field = e.currentTarget.dataset.field;
    const value = e.detail.value;
    
    this.setData({
      [`serviceTime.${field}`]: value
    });
  },

  onServiceAreaChange(e) {
    const field = e.currentTarget.dataset.field;
    const value = e.detail.value;
    
    this.setData({
      [`serviceArea.${field}`]: Number(value) || 0
    });
  },

  saveSettings() {
    const settings = {
      serviceTypes: this.data.serviceTypes,
      serviceTime: this.data.serviceTime,
      serviceArea: this.data.serviceArea
    };
    
    wx.setStorageSync('feederSettings', settings);
    
    wx.showToast({
      title: '保存成功',
      icon: 'success'
    });
    
    setTimeout(() => {
      wx.navigateBack();
    }, 1500);
  }
})
