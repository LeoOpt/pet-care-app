# 宠物上门喂养微信小程序

这是一个完整的宠物上门喂养微信小程序，使用微信原生小程序框架开发。

## 项目结构

```
├── app.js                 # 小程序入口文件
├── app.json               # 小程序全局配置
├── app.wxss               # 小程序全局样式
├── sitemap.json           # 站点地图配置
├── pages/                 # 页面目录
│   ├── home/              # 首页
│   │   ├── home.js
│   │   ├── home.json
│   │   ├── home.wxml
│   │   └── home.wxss
│   ├── publish/           # 发布需求页
│   │   ├── publish.js
│   │   ├── publish.json
│   │   ├── publish.wxml
│   │   └── publish.wxss
│   ├── feeder-detail/     # 喂养师详情页
│   │   ├── feeder-detail.js
│   │   ├── feeder-detail.json
│   │   ├── feeder-detail.wxml
│   │   └── feeder-detail.wxss
│   ├── orders/            # 订单列表页
│   │   ├── orders.js
│   │   ├── orders.json
│   │   ├── orders.wxml
│   │   └── orders.wxss
│   ├── order-detail/      # 订单详情页
│   │   ├── order-detail.js
│   │   ├── order-detail.json
│   │   ├── order-detail.wxml
│   │   └── order-detail.wxss
│   └── profile/           # 个人中心页
│       ├── profile.js
│       ├── profile.json
│       ├── profile.wxml
│       └── profile.wxss
├── components/            # 组件目录（预留）
├── utils/                 # 工具函数目录（预留）
└── images/                # 图片资源目录（预留）
```

## 功能介绍

### 1. 首页 (Home)
- 搜索喂养师或服务
- 服务类型快速入口（上门喂养、遛狗、宠物洗澡、更多服务）
- 热门喂养师列表
- 喂养师卡片展示（头像、姓名、评分、评价数、简介、服务标签、价格）

### 2. 发布需求 (Publish)
- 选择服务的宠物
- 选择服务类型（支持多选）
- 选择服务时间
- 输入服务地址
- 填写备注信息
- 提交需求

### 3. 喂养师详情 (Feeder Detail)
- 喂养师详细信息展示
- 个人简介、服务项目、收费标准
- 用户评价列表
- 联系喂养师
- 预约服务

### 4. 订单列表 (Orders)
- Tab切换：全部、待接单、进行中、已完成
- 订单卡片展示（订单号、喂养师、服务内容、时间、状态、价格）
- 点击进入订单详情

### 5. 订单详情 (Order Detail)
- 订单状态展示
- 订单基本信息
- 喂养师信息
- 服务信息（项目、宠物、时间、地址、备注）
- 费用明细
- 取消订单

### 6. 个人中心 (Profile)
- 用户信息展示
- 发布需求快捷入口
- 功能菜单（我的订单、我的宠物、消息中心、设置、帮助中心）

## 如何使用

### 1. 准备工作
- 下载并安装 [微信开发者工具](https://developers.weixin.qq.com/miniprogram/dev/devtools/download.html)
- 注册微信小程序账号并获取 AppID（如果需要真机调试）

### 2. 导入项目
1. 打开微信开发者工具
2. 选择「小程序」项目类型
3. 点击「导入项目」
4. 选择项目根目录
5. 填写项目名称
6. 填写 AppID（如果没有，可以选择「测试号」）
7. 点击「导入」

### 3. 预览和调试
- 在微信开发者工具中可以直接预览
- 点击「编译」按钮查看效果
- 使用「预览」功能在真机上查看
- 使用「真机调试」功能进行真机调试

## 技术说明

### 框架
- 微信原生小程序框架
- 不依赖第三方框架，纯原生实现

### 样式
- 使用 WXSS (WeiXin Style Sheets)
- 使用 rpx (responsive pixel) 单位实现响应式布局
- 主题色：#FF9D5C（暖橙色）
- 背景色：#FFF9F0（浅米色）

### 文件说明
- `.js`：页面逻辑
- `.json`：页面配置
- `.wxml`：页面结构（类似 HTML）
- `.wxss`：页面样式（类似 CSS）

## 后续开发建议

### 1. 后端对接
- 用户登录和授权
- 喂养师数据接口
- 订单管理接口
- 消息推送接口

### 2. 功能增强
- 真实的图片上传功能
- 地图选点功能
- 在线支付功能
- 实时聊天功能
- 评价系统

### 3. 性能优化
- 图片懒加载
- 列表分页加载
- 缓存优化

## 注意事项

1. 本项目是前端演示项目，数据均为 mock 数据
2. images 目录下的图标文件需要根据实际情况添加
3. 如需正式发布，需要申请微信小程序认证
4. 后端接口需要根据业务需求自行开发

## 许可证

MIT License
