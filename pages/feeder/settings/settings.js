Page({
  data: {
    serviceTypes: [
      { 
        id: 1, 
        name: '上门喂养', 
        desc: '到客户家中喂养宠物',
        price: 80,
        enabled: true 
      },
      { 
        id: 2, 
        name: '遛狗服务', 
        desc: '带狗狗外出散步',
        price: 60,
        enabled: true 
      },
      { 
        id: 3, 
        name: '宠物洗澡', 
        desc: '为宠物提供洗澡服务',
        price: 100,
        enabled: false 
      },
      { 
        id: 4, 
        name: '补充粮水', 
        desc: '为宠物补充食物和饮水',
        price: 30,
        enabled: true 
      },
      { 
        id: 5, 
        name: '清理卫生', 
        desc: '清理宠物生活区域',
        price: 50,
        enabled: false 
      }
    ],
    startTime: '08:00',
    endTime: '20:00',
    advanceOptions: ['1小时', '2小时', '4小时', '12小时', '1天', '2天', '3天'],
    advanceIndex: 4,
    serviceRadius: 5,
    serviceAreas: [
      { id: 1, name: '朝阳区', selected: true },
      { id: 2, name: '海淀区', selected: true },
      { id: 3, name: '东城区', selected: false },
      { id: 4, name: '西城区', selected: false },
      { id: 5, name: '丰台区', selected: false },
      { id: 6, name: '石景山区', selected: false }
    ]
  },

  onLoad(options) {
    this.loadSettings();
  },

  loadSettings() {
    const savedSettings = wx.getStorageSync('feederSettings');
    if (savedSettings) {
      this.setData(savedSettings);
    }
  },

  toggleServiceType(e) {
    const id = e.currentTarget.dataset.id;
    const serviceTypes = this.data.serviceTypes.map(item => {
      if (item.id === id) {
        item.enabled = !item.enabled;
      }
      return item;
    });
    this.setData({
      serviceTypes: serviceTypes
    });
  },

  onServiceTypeChange(e) {
    const id = e.currentTarget.target.dataset.id;
    if (id) {
      const enabled = e.detail.value;
      const serviceTypes = this.data.serviceTypes.map(item => {
        if (item.id === id) {
          item.enabled = enabled;
        }
        return item;
      });
      this.setData({
        serviceTypes: serviceTypes
      });
    }
  },

  onPriceInput(e) {
    const id = e.currentTarget.dataset.id;
    const price = e.detail.value;
    const serviceTypes = this.data.serviceTypes.map(item => {
      if (item.id === id) {
        item.price = parseFloat(price) || 0;
      }
      return item;
    });
    this.setData({
      serviceTypes: serviceTypes
    });
  },

  onStartTimeChange(e) {
    this.setData({
      startTime: e.detail.value
    });
  },

  onEndTimeChange(e) {
    this.setData({
      endTime: e.detail.value
    });
  },

  onAdvanceChange(e) {
    this.setData({
      advanceIndex: e.detail.value
    });
  },

  onRadiusInput(e) {
    this.setData({
      serviceRadius: parseFloat(e.detail.value) || 0
    });
  },

  toggleArea(e) {
    const id = e.currentTarget.dataset.id;
    const serviceAreas = this.data.serviceAreas.map(item => {
      if (item.id === id) {
        item.selected = !item.selected;
      }
      return item;
    });
    this.setData({
      serviceAreas: serviceAreas
    });
  },

  saveSettings() {
    const enabledServices = this.data.serviceTypes.filter(s => s.enabled);
    
    if (enabledServices.length === 0) {
      wx.showToast({
        title: '请至少启用一项服务',
        icon: 'none'
      });
      return;
    }

    const selectedAreas = this.data.serviceAreas.filter(a => a.selected);
    if (selectedAreas.length === 0) {
      wx.showToast({
        title: '请至少选择一个服务区域',
        icon: 'none'
      });
      return;
    }

    const settings = {
      serviceTypes: this.data.serviceTypes,
      startTime: this.data.startTime,
      endTime: this.data.endTime,
      advanceIndex: this.data.advanceIndex,
      serviceRadius: this.data.serviceRadius,
      serviceAreas: this.data.serviceAreas
    };

    wx.setStorageSync('feederSettings', settings);

    wx.showToast({
      title: '设置已保存',
      icon: 'success'
    });

    setTimeout(() => {
      wx.navigateBack();
    }, 1500);
  }
})
