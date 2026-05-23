Page({
  data: {
    step: 1,
    formData: {
      realName: '',
      idCard: '',
      idCardFront: '',
      idCardBack: '',
      certificationType: '',
      certificationNo: '',
      certifications: []
    }
  },

  onLoad() {
    wx.setNavigationBarTitle({
      title: '实名认证'
    });
  },

  onInputChange(e) {
    const field = e.currentTarget.dataset.field;
    this.setData({
      ['formData.' + field]: e.detail.value
    });
  },

  onCertificationTypeChange(e) {
    const type = e.currentTarget.dataset.type;
    this.setData({
      'formData.certificationType': type
    });
  },

  chooseImage(e) {
    const type = e.currentTarget.dataset.type;
    wx.chooseImage({
      count: 1,
      success: (res) => {
        this.setData({
          ['formData.' + type]: res.tempFilePaths[0]
        });
      }
    });
  },

  nextStep() {
    if (this.data.step === 1) {
      if (!this.data.formData.realName) {
        wx.showToast({
          title: '请输入真实姓名',
          icon: 'none'
        });
        return;
      }

      if (!this.data.formData.idCard) {
        wx.showToast({
          title: '请输入身份证号码',
          icon: 'none'
        });
        return;
      }

      if (this.data.formData.idCard.length !== 18) {
        wx.showToast({
          title: '身份证号码格式不正确',
          icon: 'none'
        });
        return;
      }
    }

    if (this.data.step === 2) {
      if (!this.data.formData.idCardFront) {
        wx.showToast({
          title: '请上传身份证正面照片',
          icon: 'none'
        });
        return;
      }

      if (!this.data.formData.idCardBack) {
        wx.showToast({
          title: '请上传身份证背面照片',
          icon: 'none'
        });
        return;
      }
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

  submitCertification() {
    wx.showLoading({
      title: '提交中...'
    });

    setTimeout(() => {
      wx.hideLoading();
      wx.setStorageSync('isVerified', true);
      wx.setStorageSync('feederInfo', {
        realName: this.data.formData.realName,
        idCard: this.data.formData.idCard,
        certificationType: this.data.formData.certificationType,
        certifiedAt: new Date().toISOString()
      });

      wx.showToast({
        title: '认证提交成功',
        icon: 'success'
      });

      setTimeout(() => {
        wx.navigateBack();
      }, 1500);
    }, 2000);
  }
})
