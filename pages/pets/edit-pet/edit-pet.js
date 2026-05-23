Page({
  data: {
    petId: '',
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

  onLoad(options) {
    const petId = options.id;
    this.setData({
      petId: petId
    });
    this.loadPet(petId);
  },

  loadPet(petId) {
    const app = getApp();
    const pets = app.getPets();
    const pet = pets.find(p => p.id === petId);
    
    if (pet) {
      this.setData({
        petType: pet.type,
        petGender: pet.gender,
        petForm: {
          name: pet.name,
          type: pet.type,
          breed: pet.breed,
          gender: pet.gender,
          age: pet.age ? String(pet.age) : '',
          weight: pet.weight ? String(pet.weight) : '',
          isNeutered: pet.isNeutered,
          vaccinationStatus: pet.vaccinationStatus,
          healthInfo: pet.healthInfo,
          feedingNotes: pet.feedingNotes,
          behaviorNotes: pet.behaviorNotes
        }
      });
    }
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
    let pets = app.getPets();
    
    const petIndex = pets.findIndex(p => p.id === this.data.petId);
    if (petIndex !== -1) {
      pets[petIndex] = {
        ...pets[petIndex],
        name: form.name,
        type: form.type,
        breed: form.breed,
        gender: form.gender,
        age: parseFloat(form.age) || 0,
        weight: parseFloat(form.weight) || 0,
        isNeutered: form.isNeutered,
        vaccinationStatus: form.vaccinationStatus,
        healthInfo: form.healthInfo,
        feedingNotes: form.feedingNotes,
        behaviorNotes: form.behaviorNotes
      };
      
      wx.setStorageSync('pets', pets);
      app.globalData.pets = pets;
      
      wx.showToast({
        title: '保存成功',
        icon: 'success'
      });
      
      setTimeout(() => {
        wx.navigateBack();
      }, 1500);
    }
  }
})
