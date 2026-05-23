# 快速修复脚本 - 请在 PowerShell 中运行
# 路径: e:\code\SOLO_pets\setup-git-and-deploy.ps1

# ========================================
# 重要：请按顺序执行以下步骤！
# ========================================

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Git 部署修复脚本" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# 确保在正确目录
Set-Location "e:\code\SOLO_pets"
Write-Host "[1] 已切换到项目目录" -ForegroundColor Green
Write-Host "    路径: $(Get-Location)" -ForegroundColor Gray

Start-Sleep -Seconds 1

# 步骤 1: 初始化 git（如果还没有）
Write-Host ""
Write-Host "[2] 初始化 Git 仓库..." -ForegroundColor Cyan

if (-not (Test-Path ".git")) {
    git init
    Write-Host "[OK] Git 仓库已初始化" -ForegroundColor Green
} else {
    Write-Host "[跳过] Git 仓库已存在" -ForegroundColor Yellow
}

Start-Sleep -Seconds 1

# 步骤 2: 配置用户（如果还没有）
Write-Host ""
Write-Host "[3] 配置 Git 用户..." -ForegroundColor Cyan

$hasConfig = git config user.name 2>$null
if ([string]::IsNullOrEmpty($hasConfig)) {
    Write-Host "请输入用户名:" -ForegroundColor Yellow
    $name = Read-Host
    git config user.name $name
    
    Write-Host "请输入邮箱:" -ForegroundColor Yellow
    $email = Read-Host
    git config user.email $email
    Write-Host "[OK] 用户已配置" -ForegroundColor Green
} else {
    Write-Host "[OK] 用户已配置: $hasConfig" -ForegroundColor Green
}

Start-Sleep -Seconds 1

# 步骤 3: 创建分支
Write-Host ""
Write-Host "[4] 创建分支 'temp-node-deployment'..." -ForegroundColor Cyan

git checkout -b temp-node-deployment 2>&1 | Out-Null
if ($LASTEXITCODE -ne 0) {
    Write-Host "[提示] 分支已存在，切换到该分支..." -ForegroundColor Yellow
    git checkout temp-node-deployment
}
Write-Host "[OK] 当前分支: $(git branch --show-current)" -ForegroundColor Green

Start-Sleep -Seconds 1

# 步骤 4: 添加所有文件
Write-Host ""
Write-Host "[5] 添加项目文件..." -ForegroundColor Cyan

git add .
Write-Host "[OK] 文件已添加" -ForegroundColor Green

Start-Sleep -Seconds 1

# 步骤 5: 创建提交
Write-Host ""
Write-Host "[6] 创建提交..." -ForegroundColor Cyan

git commit -m "feat: 部署宠物上门喂养小程序到临时节点"
if ($LASTEXITCODE -ne 0) {
    Write-Host "[提示] 没有新变更（可能已提交过）" -ForegroundColor Yellow
} else {
    Write-Host "[OK] 提交成功" -ForegroundColor Green
}

Start-Sleep -Seconds 1

# 步骤 6: 检查远程仓库
Write-Host ""
Write-Host "[7] 检查远程仓库配置..." -ForegroundColor Cyan

$origin = git remote get-url origin 2>$null
if ($LASTEXITCODE -ne 0) {
    Write-Host "[需要] 添加远程仓库" -ForegroundColor Red
    Write-Host "请输入你的 GitHub 仓库地址:" -ForegroundColor Yellow
    Write-Host "（例如: https://github.com/LeoOpt/pet-care-app.git）" -ForegroundColor Gray
    $repoUrl = Read-Host
    if (-not [string]::IsNullOrWhiteSpace($repoUrl)) {
        git remote add origin $repoUrl
        Write-Host "[OK] 远程仓库已添加" -ForegroundColor Green
    }
} else {
    Write-Host "[OK] 远程仓库: $origin" -ForegroundColor Green
}

Start-Sleep -Seconds 1

# 步骤 7: 推送
Write-Host ""
Write-Host "[8] 推送到远程仓库..." -ForegroundColor Cyan

$origin = git remote get-url origin 2>$null
if ($LASTEXITCODE -ne 0) {
    Write-Host "[跳过] 没有远程仓库，无法推送" -ForegroundColor Yellow
} else {
    git push -u origin temp-node-deployment
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host ""
        Write-Host "========================================" -ForegroundColor Green
        Write-Host "🎉 部署成功！" -ForegroundColor Green
        Write-Host "========================================" -ForegroundColor Green
    } else {
        Write-Host ""
        Write-Host "========================================" -ForegroundColor Red
        Write-Host "❌ 推送失败" -ForegroundColor Red
        Write-Host "========================================" -ForegroundColor Red
        Write-Host ""
        Write-Host "常见问题：" -ForegroundColor Yellow
        Write-Host "1. 请确保仓库地址正确" -ForegroundColor White
        Write-Host "2. 请确保有仓库的推送权限" -ForegroundColor White
        Write-Host "3. 如果使用 SSH，可能需要配置 SSH key" -ForegroundColor White
    }
}

Write-Host ""
Read-Host "按 Enter 键退出"
