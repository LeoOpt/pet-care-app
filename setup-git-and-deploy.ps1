# ========================================
# 宠物上门喂养小程序 - Git 初始化和推送脚本
# ========================================

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "宠物上门喂养小程序 - 临时节点部署" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# 检查 git 是否可用
try {
    $gitVersion = git --version 2>&1
    if ($LASTEXITCODE -ne 0) {
        throw "Git not found"
    }
    Write-Host "[OK] Git 已安装: $gitVersion" -ForegroundColor Green
} catch {
    Write-Host "[错误] 未找到 git 命令" -ForegroundColor Red
    Write-Host "请先安装 Git: https://git-scm.com/download/win" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "安装后请重启 PowerShell/命令行窗口" -ForegroundColor Yellow
    Read-Host "按 Enter 键退出"
    exit 1
}

Write-Host ""

# 配置 git 用户（如果是第一次使用）
Write-Host "[1/7] 配置 Git 用户信息..." -ForegroundColor Cyan

# 检查是否已经配置
$userName = git config user.name
if ([string]::IsNullOrEmpty($userName)) {
    Write-Host "请输入你的用户名（用于提交记录）:" -ForegroundColor Yellow
    $inputName = Read-Host
    if (-not [string]::IsNullOrWhiteSpace($inputName)) {
        git config user.name $inputName
    }
    
    Write-Host "请输入你的邮箱:" -ForegroundColor Yellow
    $inputEmail = Read-Host
    if (-not [string]::IsNullOrWhiteSpace($inputEmail)) {
        git config user.email $inputEmail
    }
    Write-Host "[OK] Git 用户信息已配置" -ForegroundColor Green
} else {
    Write-Host "[OK] Git 用户已配置: $userName" -ForegroundColor Green
}

Start-Sleep -Seconds 1

# 初始化仓库
Write-Host ""
Write-Host "[2/7] 初始化 Git 仓库..." -ForegroundColor Cyan

if (Test-Path ".git") {
    Write-Host "[跳过] Git 仓库已存在" -ForegroundColor Yellow
} else {
    git init
    if ($LASTEXITCODE -ne 0) {
        Write-Host "[错误] Git 初始化失败" -ForegroundColor Red
        Read-Host "按 Enter 键退出"
        exit 1
    }
    Write-Host "[OK] Git 仓库已初始化" -ForegroundColor Green
}

Start-Sleep -Seconds 1

# 创建分支
Write-Host ""
Write-Host "[3/7] 创建临时分支..." -ForegroundColor Cyan

$branchName = "temp-node-deployment"

# 切换到新分支（如果已存在则切换）
git checkout -b $branchName 2>$null
if ($LASTEXITCODE -ne 0) {
    Write-Host "分支已存在，切换到分支..." -ForegroundColor Yellow
    git checkout $branchName
}

Write-Host "[OK] 当前分支: $branchName" -ForegroundColor Green

Start-Sleep -Seconds 1

# 添加文件
Write-Host ""
Write-Host "[4/7] 添加项目文件..." -ForegroundColor Cyan

git add .
$status = git status --porcelain

if ($status.Count -eq 0) {
    Write-Host "[跳过] 没有新文件需要添加" -ForegroundColor Yellow
} else {
    Write-Host "[OK] 已添加 $($status.Count) 个文件" -ForegroundColor Green
}

Start-Sleep -Seconds 1

# 创建提交
Write-Host ""
Write-Host "[5/7] 创建提交..." -ForegroundColor Cyan

$commitMsg = "feat: 部署宠物上门喂养小程序到临时节点"

git commit -m $commitMsg 2>&1 | Out-Null

if ($LASTEXITCODE -ne 0) {
    # 可能没有变更需要提交
    $hasChanges = git status --porcelain
    if ($hasChanges.Count -eq 0) {
        Write-Host "[跳过] 没有新变更需要提交（所有文件已提交）" -ForegroundColor Yellow
    } else {
        Write-Host "[警告] 提交时出现问题" -ForegroundColor Yellow
    }
} else {
    Write-Host "[OK] 提交成功" -ForegroundColor Green
}

Start-Sleep -Seconds 1

# 配置远程仓库
Write-Host ""
Write-Host "[6/7] 配置远程仓库..." -ForegroundColor Cyan

$remoteUrl = git remote get-url origin 2>$null

if ($LASTEXITCODE -eq 0 -and -not [string]::IsNullOrEmpty($remoteUrl)) {
    Write-Host "[跳过] 远程仓库已配置: $remoteUrl" -ForegroundColor Yellow
} else {
    Write-Host "请输入远程仓库地址（示例: https://github.com/LeoOpt/pet-care-app.git）:" -ForegroundColor Yellow
    $inputUrl = Read-Host
    
    if (-not [string]::IsNullOrWhiteSpace($inputUrl)) {
        git remote add origin $inputUrl
        Write-Host "[OK] 远程仓库已添加" -ForegroundColor Green
    } else {
        Write-Host "[跳过] 未配置远程仓库" -ForegroundColor Yellow
    }
}

Start-Sleep -Seconds 1

# 推送
Write-Host ""
Write-Host "[7/7] 推送到远程仓库..." -ForegroundColor Cyan

$remoteUrl = git remote get-url origin 2>$null

if ($LASTEXITCODE -ne 0 -or [string]::IsNullOrEmpty($remoteUrl)) {
    Write-Host "[跳过] 没有配置远程仓库，无法推送" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "========================================" -ForegroundColor Cyan
    Write-Host "✅ 本地 Git 配置完成！" -ForegroundColor Green
    Write-Host "========================================" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "下一步：请先配置远程仓库，然后执行：" -ForegroundColor Yellow
    Write-Host "  git push -u origin $branchName" -ForegroundColor Cyan
    Write-Host ""
} else {
    Write-Host "正在推送到: $remoteUrl" -ForegroundColor Cyan
    
    # 尝试推送
    git push -u origin $branchName 2>&1 | Tee-Object -Variable pushResult
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host ""
        Write-Host "========================================" -ForegroundColor Green
        Write-Host "🎉 部署成功！" -ForegroundColor Green
        Write-Host "========================================" -ForegroundColor Green
        Write-Host ""
        Write-Host "分支 $branchName 已推送到远程仓库" -ForegroundColor Cyan
        Write-Host ""
        Write-Host "你可以在以下地址查看：" -ForegroundColor Yellow
        Write-Host "  $remoteUrl" -ForegroundColor White
        Write-Host ""
    } else {
        Write-Host ""
        Write-Host "========================================" -ForegroundColor Yellow
        Write-Host "⚠️  推送遇到问题" -ForegroundColor Yellow
        Write-Host "========================================" -ForegroundColor Yellow
        Write-Host ""
        Write-Host "可能的原因：" -ForegroundColor Red
        Write-Host "  - 仓库地址不正确" -ForegroundColor White
        Write-Host "  - 没有推送权限（需要先在 GitHub 添加 SSH key）" -ForegroundColor White
        Write-Host "  - 网络连接问题" -ForegroundColor White
        Write-Host ""
        Write-Host "请检查后手动执行：" -ForegroundColor Yellow
        Write-Host "  git push -u origin $branchName" -ForegroundColor Cyan
        Write-Host ""
    }
}

Write-Host ""
Read-Host "按 Enter 键退出"
