# 🚀 将代码部署到 GitHub

## 方法一：使用命令行（推荐）

### 前置准备
1. 在 GitHub 上创建新仓库：https://github.com/new
2. 不要勾选 "Initialize this repository with a README"

### 执行步骤

#### 1️⃣ 如果您在本地有这个项目
在您的项目根目录下打开终端，然后执行：

```bash
# 添加远程仓库（替换 YOUR_USERNAME 为您的 GitHub 用户名）
git remote add origin https://github.com/YOUR_USERNAME/pet-care-app.git

# 重命名分支为 main
git branch -M main

# 推送代码
git push -u origin main
```

#### 2️⃣ 如果您需要先把代码下载到本地
1. 点击右上角的 "Code" 按钮下载 ZIP
2. 解压到您喜欢的位置
3. 在解压后的文件夹中打开终端
4. 执行上述命令

---

## 方法二：使用 GitHub Desktop（更简单）

1. 下载 GitHub Desktop：https://desktop.github.com/
2. 打开 GitHub Desktop
3. 选择 "File" → "Add Local Repository"
4. 选择您的项目文件夹
5. 点击 "Publish repository" 按钮
6. 填写仓库名称，选择 Public 或 Private
7. 点击 "Publish Repository"

---

## 方法三：直接在 GitHub 网页上创建

如果您想快速体验，可以：
1. 在 GitHub 上创建新仓库时，勾选 "Add a README file"
2. 创建后点击 "Add file" → "Upload files"
3. 把项目文件拖进去
4. 提交更改

---

## 📝 注意事项

- 替换 `YOUR_USERNAME` 为您真实的 GitHub 用户名
- 如果是私有仓库，确保您有访问权限
- 如果遇到权限问题，需要配置 GitHub 个人访问令牌

---

## 🔗 有用链接
- GitHub 注册：https://github.com/signup
- GitHub Desktop：https://desktop.github.com/
- Git 入门教程：https://guides.github.com/introduction/git-handbook/
