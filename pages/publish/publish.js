// pages/publish/publish.js
Page({
  data: {
    selectedPets: [],
    selectedServices: [],
    serviceTypes: ['上门喂养', '遛狗', '宠物洗澡', '其他服务'],
    pets: [
      { id: 1, name: '毛毛', type: 'dog', breed: '金毛', age: 3, avatar: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=150&h=150&fit=crop' },
      { id: 2, name: '咪咪', type: 'cat', breed: '英短蓝猫', age: 2, avatar: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=150&h=150&fit=crop' }
    ],
    startDate: '',
    endDate: '',
    address: '',
    notes: ''
  },

  onLoad() {
    const today = new Date()
    const tomorrow = new Date(today.getTime() + 24 * 60 * 60 * 1000)
    const dayAfter = new Date(today.getTime() + 48 * 60 * 60 * 1000)
    
    this.setData({
      startDate: tomorrow.toISOString().split('T')[0],
      endDate: dayAfter.toISOString().split('T')[0]
    })
  },

  // 选择宠物
  togglePet(e) {
    const id = e.currentTarget.dataset.id
    const selected = this.data.selectedPets.includes(id)
    const selectedPets = selected 
      ? this.data.selectedPets.filter(petId => petId !== id)
      : [...this.data.selectedPets, id]
    
    this.setData({ selectedPets })
  },

  // 选择服务类型
  toggleService(e) {
    const service = e.currentTarget.dataset.service
    const selected = this.data.selectedServices.includes(service)
    const selectedServices = selected 
      ? this.data.selectedServices.filter(s => s !== service)
      : [...this.data.selectedServices, service]
    
    this.setData({ selectedServices })
  },

  // 选择开始日期
  onStartDateChange(e) {
    this.setData({ startDate: e.detail.value })
  },

  // 选择结束日期
  onEndDateChange(e) {
    this.setData({ endDate: e.detail.value })
  },

  // 输入地址
  onAddressInput(e) {
    this.setData({ address: e.detail.value })
  },

  // 输入备注
  onNotesInput(e) {
    this.setData({ notes: e.detail.value })
  },

  // 提交需求
  handleSubmit() {
    if (!this.data.selectedPets.length) {
      wx.showToast({ title: '请选择宠物', icon: 'none' })
      return
    }
    if (!this.data.selectedServices.length) {
      wx.showToast({ title: '请选择服务类型', icon: 'none' })
      return
    }
    if (!this.data.startDate || !this.data.endDate) {
      wx.showToast({ title: '请选择服务时间', icon: 'none' })
      return
    }
    if (!this.data.address) {
      wx.showToast({ title: '请输入服务地址', icon: 'none' })
      return
    }

    wx.showModal({
      title: '确认提交',
      content: '您确定要发布这个需求吗？',
      success: (res) => {
        if (res.confirm) {
          wx.showLoading({ title: '提交中...' })
          setTimeout(() => {
            wx.hideLoading()
            wx.showToast({ title: '发布成功', icon: 'success' })
            setTimeout(() => {
              wx.navigateBack()
            }, 1500)
          }, 1000)
        }
      }
    })
  }
})
