@echo off
echo ========================================
echo 宠物上门喂养小程序 - 临时节点部署脚本
echo ========================================
echo.

REM 检查 git 是否安装
where git >nul 2>nul
if %errorlevel% neq 0 (
    echo [错误] 未找到 git 命令，请先安装 git
    echo 下载地址: https://git-scm.com/download/win
    pause
    exit /b 1
)

echo [1/6] 检查 git 环境... OK
echo.

REM 初始化 git 仓库（如果还没有）
if not exist ".git" (
    echo [2/6] 初始化 git 仓库...
    git init
    if %errorlevel% neq 0 (
        echo [错误] git init 失败
        pause
        exit /b 1
    )
    echo OK
) else (
    echo [2/6] git 仓库已存在，跳过初始化
)
echo.

REM 创建临时分支
set BRANCH_NAME=temp-node-deployment
echo [3/6] 创建分支: %BRANCH_NAME%
git checkout -b %BRANCH_NAME% 2>nul
if %errorlevel% neq 0 (
    echo 分支已存在，切换到分支...
    git checkout %BRANCH_NAME%
)
if %errorlevel% neq 0 (
    echo [错误] 无法创建或切换到分支
    pause
    exit /b 1
)
echo OK
echo.

REM 添加所有文件
echo [4/6] 添加项目文件...
git add .
if %errorlevel% neq 0 (
    echo [警告] 添加文件时出现问题，但继续...
)
echo OK
echo.

REM 创建提交
set COMMIT_MSG=feat: 部署宠物上门喂养小程序到临时节点
echo [5/6] 创建提交...
git commit -m "%COMMIT_MSG%" 2>nul
if %errorlevel% neq 0 (
    echo [提示] 没有新文件变更，使用当前状态
)
echo OK
echo.

echo ========================================
echo ✅ 本地分支准备完成！
echo ========================================
echo.
echo 当前分支: %BRANCH_NAME%
echo.
echo 请执行以下步骤完成部署：
echo 1. 添加远程仓库（如果还没有）:
echo    git remote add origin ^<你的仓库地址^>
echo.
echo 2. 推送到远程仓库:
echo    git push -u origin %BRANCH_NAME%
echo.
echo 或者，如果你想自定义远程仓库和分支名，
echo 请修改本脚本或直接使用 git 命令操作。
echo.
pause
