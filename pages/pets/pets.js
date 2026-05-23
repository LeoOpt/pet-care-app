Page({
  data: {
    pets: []
  },

  onLoad() {
    this.loadPets();
  },

  onShow() {
    this.loadPets();
  },

  loadPets() {
    const app = getApp();
    const pets = app.getPets();
    this.setData({
      pets: pets
    });
  },

  goToAddPet() {
    wx.navigateTo({
      url: '/pages/pets/add-pet/add-pet'
    });
  },

  goToEditPet(e) {
    const petId = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/pets/edit-pet/edit-pet?id=' + petId
    });
  },

  deletePet(e) {
    const petId = e.currentTarget.dataset.id;
    
    wx.showModal({
      title: '确认删除',
      content: '确定要删除这个宠物吗？',
      success: (res) => {
        if (res.confirm) {
          const app = getApp();
          let pets = app.getPets();
          pets = pets.filter(pet => pet.id !== petId);
          wx.setStorageSync('pets', pets);
          app.globalData.pets = pets;
          
          wx.showToast({
            title: '删除成功',
            icon: 'success'
          });
          
          this.loadPets();
        }
      }
    });
  },

  setDefaultPet(e) {
    const petId = e.currentTarget.dataset.id;
    const app = getApp();
    let pets = app.getPets();
    
    pets = pets.map(pet => {
      pet.isDefault = (pet.id === petId);
      return pet;
    });
    
    wx.setStorageSync('pets', pets);
    app.globalData.pets = pets;
    
    wx.showToast({
      title: '设置成功',
      icon: 'success'
    });
    
    this.loadPets();
  }
})
