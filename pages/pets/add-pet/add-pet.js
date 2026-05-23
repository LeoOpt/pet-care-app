Page({
  data: {
    petType: 'cat',
    petGender: 'male',
    petForm: {
      name: '',
      type: 'cat',
      breed: '',
      gender: 'male',
      age: '',
      weight: '',
      isNeutered: false,
      vaccinationStatus: '',
      healthInfo: '',
      feedingNotes: '',
      behaviorNotes: ''
    }
  },

  onLoad() {
    wx.setNavigationBarTitle({
      title: '添加宠物'
    });
  },

  onPetTypeChange(e) {
    const type = e.currentTarget.dataset.type;
    this.setData({
      petType: type,
      'petForm.type': type
    });
  },

  onPetGenderChange(e) {
    const gender = e.currentTarget.dataset.gender;
    this.setData({
      petGender: gender,
      'petForm.gender': gender
    });
  },

  onInputChange(e) {
    const field = e.currentTarget.dataset.field;
    this.setData({
      ['petForm.' + field]: e.detail.value
    });
  },

  onSwitchChange(e) {
    this.setData({
      'petForm.isNeutered': e.detail.value
    });
  },

  savePet() {
    const form = this.data.petForm;
    
    if (!form.name) {
      wx.showToast({
        title: '请输入宠物名称',
        icon: 'none'
      });
      return;
    }

    if (!form.breed) {
      wx.showToast({
        title: '请输入宠物品种',
        icon: 'none'
      });
      return;
    }

    const app = getApp();
    let pets = app.getPets() || [];
    
    const newPet = {
      id: 'pet_' + Date.now(),
      name: form.name,
      type: form.type,
      breed: form.breed,
      gender: form.gender,
      age: form.age || 0,
      weight: form.weight || 0,
      isNeutered: form.isNeutered,
      vaccinationStatus: form.vaccinationStatus || '未知',
      healthInfo: form.healthInfo || '身体健康',
      feedingNotes: form.feedingNotes || '',
      behaviorNotes: form.behaviorNotes || '',
      isDefault: pets.length === 0
    };
    
    pets.push(newPet);
    wx.setStorageSync('pets', pets);
    app.globalData.pets = pets;
    
    wx.showToast({
      title: '添加成功',
      icon: 'success'
    });
    
    setTimeout(() => {
      wx.navigateBack();
    }, 1500);
  }
})
