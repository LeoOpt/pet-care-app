Page({
  data: {
    step: 1,
    pets: [],
    selectedPets: [],
    serviceTypes: [
      { id: 1, name: '上门喂养', price: 80, selected: true },
      { id: 2, name: '遛狗服务', price: 60, selected: false },
      { id: 3, name: '宠物洗澡', price: 100, selected: false },
      { id: 4, name: '补充粮水', price: 30, selected: false },
      { id: 5, name: '清理卫生', price: 50, selected: false }
    ],
    selectedServices: [],
    serviceDate: '',
    serviceTime: '',
    serviceAddress: '',
    remark: '',
    totalAmount: 80
  },

  onLoad(options) {
    const app = getApp();
    const pets = app.getPets();
    this.setData({
      pets: pets,
      selectedPets: pets.length > 0 ? [pets[0].id] : []
    });

    if (options.serviceType) {
      const serviceId = parseInt(options.serviceType);
      const services = this.data.serviceTypes.map(s => {
        s.selected = (s.id === serviceId);
        return s;
      });
      this.setData({
        serviceTypes: services,
        selectedServices: [serviceId]
      });
      this.calculateTotal();
    }
  },

  onPetSelect(e) {
    const petId = e.currentTarget.dataset.id;
    const selectedPets = this.data.selectedPets;
    const index = selectedPets.indexOf(petId);
    
    if (index > -1) {
      selectedPets.splice(index, 1);
    } else {
      selectedPets.push(petId);
    }
    
    this.setData({
      selectedPets: selectedPets
    });
  },

  onServiceSelect(e) {
    const serviceId = e.currentTarget.dataset.id;
    const services = this.data.serviceTypes.map(s => {
      if (s.id === serviceId) {
        s.selected = !s.selected;
      }
      return s;
    });
    
    const selectedServices = services.filter(s => s.selected).map(s => s.id);
    
    this.setData({
      serviceTypes: services,
      selectedServices: selectedServices
    });
    
    this.calculateTotal();
  },

  onDateChange(e) {
    this.setData({
      serviceDate: e.detail.value
    });
  },

  onTimeChange(e) {
    this.setData({
      serviceTime: e.detail.value
    });
  },

  onAddressInput(e) {
    this.setData({
      serviceAddress: e.detail.value
    });
  },

  onRemarkInput(e) {
    this.setData({
      remark: e.detail.value
    });
  },

  chooseLocation() {
    wx.chooseLocation({
      success: (res) => {
        this.setData({
          serviceAddress: res.address || res.name
        });
      }
    });
  },

  calculateTotal() {
    const total = this.data.serviceTypes
      .filter(s => s.selected)
      .reduce((sum, s) => sum + s.price, 0);
    
    this.setData({
      totalAmount: total
    });
  },

  nextStep() {
    if (this.data.step === 1 && this.data.selectedPets.length === 0) {
      wx.showToast({
        title: '请选择至少一只宠物',
        icon: 'none'
      });
      return;
    }

    if (this.data.step === 2 && this.data.selectedServices.length === 0) {
      wx.showToast({
        title: '请选择至少一项服务',
        icon: 'none'
      });
      return;
    }

    if (this.data.step === 3) {
      if (!this.data.serviceDate || !this.data.serviceTime) {
        wx.showToast({
          title: '请选择服务时间',
          icon: 'none'
        });
        return;
      }
    }

    if (this.data.step === 4 && !this.data.serviceAddress) {
      wx.showToast({
        title: '请输入服务地址',
        icon: 'none'
      });
      return;
    }

    this.setData({
      step: this.data.step + 1
    });
  },

  prevStep() {
    this.setData({
      step: this.data.step - 1
    });
  },

  submitOrder() {
    const app = getApp();
    let orders = app.getOrders() || [];
    
    const selectedPetsData = this.data.pets.filter(p => this.data.selectedPets.includes(p.id));
    const selectedServicesData = this.data.serviceTypes.filter(s => s.selected);
    
    const newOrder = {
      id: 'order_' + Date.now(),
      orderNo: 'ORD' + Date.now(),
      userId: 'user_001',
      feederId: '',
      feederName: '待分配',
      feederAvatarLetter: '待',
      status: 'pending',
      statusText: '待接单',
      statusDesc: '喂养师正在确认订单，请耐心等待',
      services: selectedServicesData.map(s => ({ name: s.name, price: s.price })),
      pets: selectedPetsData.map(p => p.name),
      serviceTime: this.data.serviceDate + ' ' + this.data.serviceTime,
      serviceAddress: this.data.serviceAddress,
      remark: this.data.remark,
      totalAmount: this.data.totalAmount,
      actualPaid: this.data.totalAmount,
      createTime: new Date().toISOString().slice(0, 16).replace('T', ' ')
    };
    
    orders.unshift(newOrder);
    wx.setStorageSync('orders', orders);
    app.globalData.orders = orders;
    
    wx.showToast({
      title: '订单提交成功',
      icon: 'success'
    });
    
    setTimeout(() => {
      wx.switchTab({
        url: '/pages/orders/orders'
      });
    }, 1500);
  }
})
