# 临时节点部署指南

## 📋 前置要求

1. **Git 已安装**
   - 下载地址：https://git-scm.com/download/win
   - 安装时选择添加到 PATH

2. **远程 Git 仓库已准备**
   - GitHub / GitLab / Gitee / 其他 Git 托管平台

---

## 🚀 快速开始（推荐）

### 方法一：使用自动化脚本（Windows）

1. 双击运行 `deploy-to-temp-node.bat`
2. 脚本会自动完成：
   - ✅ 初始化 git 仓库
   - ✅ 创建临时分支
   - ✅ 添加文件
   - ✅ 创建提交
3. 按照脚本提示添加远程仓库并推送

### 方法二：手动操作

#### 1. 初始化 Git 仓库

```bash
cd e:\code\SOLO_pets
git init
```

#### 2. 创建临时分支

```bash
git checkout -b temp-node-deployment
```

#### 3. 配置用户信息（如果是第一次使用）

```bash
git config user.name "你的名字"
git config user.email "你的邮箱"
```

#### 4. 添加文件

```bash
git add .
```

#### 5. 创建提交

```bash
git commit -m "feat: 部署宠物上门喂养小程序到临时节点"
```

#### 6. 关联远程仓库

```bash
# 替换为你的实际仓库地址
git remote add origin https://github.com/你的用户名/你的仓库名.git
```

#### 7. 推送到远程

```bash
git push -u origin temp-node-deployment
```

---

## 📦 项目结构

```
SOLO_pets/
├── app.js                    # 应用入口
├── app.json                  # 应用配置
├── app.wxss                  # 全局样式
├── project.config.json       # 项目配置
├── pages/                    # 用户端页面
│   ├── home/                 # 首页
│   ├── publish/              # 发布需求
│   ├── pets/                 # 宠物管理
│   ├── orders/               # 订单管理
│   ├── order-detail/         # 订单详情
│   ├── profile/              # 个人中心
│   └── auth/                 # 认证相关
├── feeder/                   # 服务者端页面
│   └── pages/
│       ├── home/             # 接单首页
│       ├── my-orders/        # 我的订单
│       ├── order-detail/     # 订单详情
│       ├── income/           # 收入统计
│       ├── settings/         # 服务设置
│       └── profile/          # 个人中心
├── deploy-to-temp-node.bat   # 部署脚本（新增）
└── .gitignore                # Git 忽略文件（新增）
```

---

## 🔧 常见问题

### Q: Git 命令找不到怎么办？

A: 请先安装 Git 并重启终端：https://git-scm.com/download/win

### Q: 如何验证是否推送成功？

A: 登录你的 Git 托管平台，查看是否有 `temp-node-deployment` 分支

### Q: 远程仓库地址在哪里找？

A: 在 GitHub/GitLab 等平台的项目首页，找到 "Clone" 或 "Code" 按钮，复制 HTTPS 或 SSH 地址

### Q: 推送到其他分支名可以吗？

A: 可以！只需要把命令中的 `temp-node-deployment` 替换为你想要的分支名

---

## 📝 后续操作

推送成功后，你可以：

1. 在临时节点上拉取代码：
   ```bash
   git clone -b temp-node-deployment <仓库地址>
   ```

2. 或者在已有的仓库中切换分支：
   ```bash
   git fetch
   git checkout temp-node-deployment
   ```

---

## 📞 需要帮助？

如果遇到问题，请检查：
- Git 是否已正确安装
- 网络连接是否正常
- 远程仓库地址是否正确
- 是否有仓库的推送权限
