#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
桌游方舟推荐系统 - 快速部署脚本
支持多个部署平台的一键部署
"""

import os
import sys
import subprocess
import secrets
import webbrowser
from pathlib import Path

def check_command(command):
    """检查命令是否存在"""
    try:
        subprocess.run([command, '--version'], 
                      capture_output=True, check=True)
        return True
    except (subprocess.CalledProcessError, FileNotFoundError):
        return False

def run_command(command, shell=False):
    """运行命令并处理输出"""
    try:
        result = subprocess.run(command, shell=shell, 
                              capture_output=True, text=True)
        if result.returncode == 0:
            return True, result.stdout
        else:
            return False, result.stderr
    except Exception as e:
        return False, str(e)

def deploy_to_heroku():
    """部署到Heroku"""
    print("🚀 开始部署到Heroku...")
    
    # 检查Heroku CLI
    if not check_command('heroku'):
        print("❌ 请先安装Heroku CLI")
        print("📥 下载地址: https://devcenter.heroku.com/articles/heroku-cli")
        return False
    
    # 检查登录状态
    success, output = run_command(['heroku', 'auth:whoami'])
    if not success:
        print("📝 请先登录Heroku")
        os.system('heroku login')
    
    # 获取应用名称
    app_name = input("请输入应用名称（留空将自动生成）: ").strip()
    
    # 创建应用
    if app_name:
        success, output = run_command(['heroku', 'create', app_name])
    else:
        success, output = run_command(['heroku', 'create'])
    
    if not success:
        print(f"❌ 创建应用失败: {output}")
        return False
    
    print("✅ Heroku应用创建成功")
    
    # 生成密钥
    secret_key = secrets.token_urlsafe(32)
    
    # 配置环境变量
    env_commands = [
        ['heroku', 'config:set', f'SECRET_KEY={secret_key}'],
        ['heroku', 'config:set', 'FLASK_ENV=production']
    ]
    
    for cmd in env_commands:
        success, output = run_command(cmd)
        if not success:
            print(f"❌ 配置环境变量失败: {output}")
            return False
    
    print("🔑 环境变量配置完成")
    
    # 初始化Git
    if not os.path.exists('.git'):
        os.system('git init')
    
    # 添加文件并提交
    os.system('git add .')
    os.system('git commit -m "Initial deployment of 桌游方舟推荐系统"')
    
    # 部署
    print("🚀 正在部署...")
    success, output = run_command(['git', 'push', 'heroku', 'main'])
    
    if success:
        print("✅ 部署成功！")
        os.system('heroku open')
        return True
    else:
        print(f"❌ 部署失败: {output}")
        return False

def deploy_to_railway():
    """部署到Railway"""
    print("🚂 Railway部署指南")
    print("1. 前往 https://railway.app/")
    print("2. 使用GitHub账号登录")
    print("3. 点击 'New Project' → 'Deploy from GitHub repo'")
    print("4. 选择您的仓库")
    print("5. 在设置中添加环境变量:")
    print(f"   - SECRET_KEY: {secrets.token_urlsafe(32)}")
    print("   - FLASK_ENV: production")
    print("6. 设置构建配置:")
    print("   - Root Directory: webmining")
    print("   - Start Command: gunicorn app:app")
    
    webbrowser.open('https://railway.app/')

def deploy_to_render():
    """部署到Render"""
    print("🎨 Render部署指南")
    print("1. 前往 https://render.com/")
    print("2. 注册账号")
    print("3. 点击 'New +' → 'Web Service'")
    print("4. 连接GitHub仓库")
    print("5. 配置服务:")
    print("   - Name: boardgame-ark")
    print("   - Environment: Python 3")
    print("   - Build Command: pip install -r requirements.txt")
    print("   - Start Command: gunicorn app:app")
    print("   - Root Directory: webmining")
    print("6. 添加环境变量:")
    print(f"   - SECRET_KEY: {secrets.token_urlsafe(32)}")
    print("   - FLASK_ENV: production")
    
    webbrowser.open('https://render.com/')

def main():
    """主函数"""
    print("🎯 桌游方舟推荐系统 - 快速部署工具")
    print("=" * 50)
    
    # 检查是否在正确的目录
    if not os.path.exists('app.py'):
        print("❌ 请确保在webmining目录中运行此脚本")
        return
    
    print("请选择部署平台:")
    print("1. Heroku (推荐 - 自动部署)")
    print("2. Railway (高性能)")
    print("3. Render (稳定)")
    print("4. 查看完整部署指南")
    
    choice = input("请输入选项 (1-4): ").strip()
    
    if choice == '1':
        deploy_to_heroku()
    elif choice == '2':
        deploy_to_railway()
    elif choice == '3':
        deploy_to_render()
    elif choice == '4':
        if os.path.exists('部署指南.md'):
            if sys.platform == 'win32':
                os.system('start 部署指南.md')
            elif sys.platform == 'darwin':
                os.system('open 部署指南.md')
            else:
                os.system('xdg-open 部署指南.md')
        else:
            print("❌ 未找到部署指南文件")
    else:
        print("❌ 无效选项")

if __name__ == '__main__':
    main() 