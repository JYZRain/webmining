#!/bin/bash
# 桌游方舟推荐系统 - Heroku快速部署脚本

echo "🚀 桌游方舟推荐系统 - Heroku部署脚本"
echo "================================"

# 检查是否安装了Heroku CLI
if ! command -v heroku &> /dev/null
then
    echo "❌ 请先安装Heroku CLI"
    echo "macOS: brew install heroku/brew/heroku"
    echo "Windows: https://devcenter.heroku.com/articles/heroku-cli"
    exit 1
fi

# 检查是否已登录Heroku
if ! heroku auth:whoami &> /dev/null
then
    echo "📝 请先登录Heroku"
    heroku login
fi

# 获取应用名称
read -p "请输入应用名称（留空将自动生成）: " app_name

# 创建Heroku应用
if [ -z "$app_name" ]; then
    echo "📱 创建Heroku应用..."
    heroku create
else
    echo "📱 创建Heroku应用: $app_name"
    heroku create "$app_name"
fi

# 生成随机密钥
secret_key=$(openssl rand -base64 32)
echo "🔑 配置环境变量..."
heroku config:set SECRET_KEY="$secret_key"
heroku config:set FLASK_ENV=production

# 初始化Git（如果还没有）
if [ ! -d ".git" ]; then
    echo "📦 初始化Git仓库..."
    git init
fi

# 添加所有文件
echo "📋 添加项目文件..."
git add .

# 提交代码
echo "💾 提交代码..."
git commit -m "Initial deployment of 桌游方舟推荐系统"

# 部署到Heroku
echo "🚀 部署到Heroku..."
git push heroku main

# 打开应用
echo "✅ 部署完成！"
echo "🌐 正在打开应用..."
heroku open

echo "📊 查看应用状态: heroku ps"
echo "📄 查看日志: heroku logs --tail"
echo "⚙️  管理应用: heroku dashboard" 