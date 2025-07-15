# 桌游方舟 - 智能推荐系统

## 项目概述

这是一个基于机器学习的桌游推荐系统，提供多步骤引导式用户体验，能够根据用户偏好生成个性化的桌游推荐。

## 新系统特性

### 🎯 多步骤引导体验
- **经典游戏选择**: 从用户熟悉的游戏开始建立偏好档案
- **机制偏好**: 8大游戏机制分类，简化选择过程
- **领域选择**: 策略、家庭、聚会等不同游戏场景
- **情境设置**: 人数、时间、年龄、复杂度的生动化表达

### 🔥 智能推荐算法
- **加权评分系统**: 结合相似度、评分、流行度的综合打分
- **机制归类映射**: 将100+具体机制归类为8大核心类别
- **经典游戏增强**: 基于用户选择的经典游戏优化推荐
- **多层推荐**: 主推荐、高分精选、新品推荐、更多匹配

### 🎨 现代化界面
- **卡片式布局**: 视觉优先的游戏展示
- **BGG图片集成**: 自动获取BoardGameGeek官方图片
- **响应式设计**: 完美适配桌面和移动设备
- **动画效果**: 流畅的交互动画和视觉反馈

## 项目结构

```
boardgame-recommendation/
├── app.py                          # Flask主应用
├── enhanced_recommendation.py       # 增强推荐算法
├── data/
│   └── BGG_Data_Set.csv            # BoardGameGeek数据集
├── templates/
│   ├── wizard.html                 # 多步骤引导页面
│   └── recommendations.html        # 推荐结果页面
├── static/
│   ├── css/
│   │   └── style.css              # 样式文件
│   └── js/
│       └── app.js                 # 前端逻辑
├── requirements.txt                # Python依赖
└── README.md                      # 项目说明
```

## 安装部署

### 1. 环境准备

```bash
# 创建虚拟环境
python -m venv boardgame_env
source boardgame_env/bin/activate  # Linux/Mac
# 或
boardgame_env\Scripts\activate     # Windows

# 安装依赖
pip install -r requirements.txt
```

### 2. 数据准备

将BGG数据集文件放置在项目根目录或`data/`文件夹中：
- 文件名: `BGG_Data_Set.csv`
- 编码: Latin1或Windows-1252
- 包含字段: ID, Name, Year Published, Min Players, Max Players, Play Time, Min Age, Users Rated, Rating Average, BGG Rank, Complexity Average, Owned Users, Mechanics, Domains

### 3. 配置设置

在`app.py`中修改配置：

```python
# 设置密钥（生产环境使用环境变量）
app.secret_key = 'your-secret-key-here'

# 数据文件路径
data_path = 'data/BGG_Data_Set.csv'
```

### 4. 启动应用

```bash
python app.py
```

应用将在 `http://localhost:5000` 启动

## API文档

### 推荐相关API

#### 获取经典游戏列表
```http
GET /api/classic-games
```

返回高评分经典游戏列表，用于第一步选择。

#### 生成推荐
```http
POST /api/recommendations
Content-Type: application/json

{
  "selectedGames": ["Gloomhaven", "Pandemic"],
  "selectedMechanics": ["strategy", "cooperation"],
  "selectedDomains": ["Strategy Games"],
  "gameSettings": {
    "players": "2-4",
    "time": "90",
    "age": "12",
    "complexity": "2.5"
  }
}
```

返回个性化推荐结果。

#### 获取更多游戏
```http
GET /api/games/more/{category}?page=1&per_page=20
```

分类：`rating`（高评分）、`newest`（最新）、`matches`（更多匹配）

### 工具API

#### 游戏搜索
```http
GET /api/games/search?q=pandemic&limit=10
```

#### 获取游戏图片
```http
GET /api/game-image/{game_id}
```

#### 健康检查
```http
GET /health
```

## 机制归类系统

系统将BGG的100+游戏机制归类为8大核心类别：

### 策略规划师 (Strategy)
- Worker Placement, Action Points, Resource Management, Tech Trees, Income, Market, Economic, Investment, Auction/Bidding, Trading

### 幸运冒险家 (Luck)  
- Dice Rolling, Push Your Luck, Roll / Spin and Move, Bag Building, Random Production

### 团队合作者 (Cooperation)
- Cooperative Game, Team-Based Game, Semi-Cooperative Game, Traitor Game, Communication Limits

### 卡牌收集师 (Cards)
- Card Drafting, Hand Management, Set Collection, Deck Construction, Deck Building

### 领土争夺者 (Territory)
- Area Majority / Influence, Area Movement, Grid Movement, Point to Point Movement, Area-Impulse

### 建造大师 (Building)
- Tile Placement, Pattern Building, Modular Board, Map Addition, Puzzle, Network and Route Building

### 角色扮演者 (Roleplay)
- Variable Player Powers, Simulation, Role Playing, Legacy Game, Storytelling

### 反应达人 (Reaction)
- Memory, Real Time, Speed Matching, Action / Dexterity, Flicking

## 推荐算法详解

### 加权评分公式
```
最终分数 = 0.5 × 相似度分数 + 0.3 × 评分分数 + 0.2 × 流行度分数
```

### 相似度计算
1. 基于用户偏好构建特征向量
2. 使用余弦相似度计算游戏相似性
3. 如选择经典游戏，增加相似游戏权重

### 个性化增强
- 经典游戏选择影响：增加类似游戏的推荐权重
- 机制偏好：直接映射到具体游戏机制
- 数值偏好：标准化后计算欧几里得距离

## 部署建议

### 生产环境
1. **Web服务器**: 使用Gunicorn + Nginx
2. **数据库**: 考虑将CSV数据迁移到PostgreSQL
3. **缓存**: 使用Redis缓存推荐结果
4. **监控**: 集成日志监控和性能监控

### 性能优化
1. **数据预处理**: 启动时预计算特征矩阵
2. **图片缓存**: 缓存BGG图片URL，减少API调用
3. **推荐缓存**: 缓存相似偏好的推荐结果
4. **异步处理**: 图片获取使用异步任务

### 扩展方向
1. **用户系统**: 添加用户注册和历史记录
2. **社交功能**: 好友推荐和游戏评论
3. **移动应用**: 开发React Native或Flutter应用
4. **AI增强**: 集成更先进的深度学习模型

## 开发依赖

```txt
Flask==2.3.3
pandas==2.0.3
numpy==1.24.3
scikit-learn==1.3.0
scipy==1.11.1
requests==2.31.0
lxml==4.9.3
gunicorn==21.2.0
python-dotenv==1.0.0
```

## BGG图片集成

系统自动从BoardGameGeek获取游戏图片：

```python
# BGG API调用示例
url = f"https://boardgamegeek.com/xmlapi2/thing?id={game_id}&type=boardgame"
```

如果获取失败，自动使用占位符图片，保证用户体验不受影响。

## 故障排除

### 常见问题

1. **数据加载失败**
   - 检查CSV文件路径和编码
   - 确认文件格式和列名

2. **推荐结果为空**
   - 检查用户偏好数据完整性
   - 验证特征矩阵构建过程

3. **BGG图片无法加载**
   - 检查网络连接
   - 确认BGG API响应状态

### 日志查看
```bash
# 查看应用日志
tail -f app.log

# 启用调试模式
export FLASK_DEBUG=1
python app.py
```

## 贡献指南

欢迎提交Bug报告、功能请求和代码贡献！

1. Fork本项目
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 创建Pull Request

## 许可证

本项目采用MIT许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 联系方式

- 项目主页: [GitHub Repository]
- 问题反馈: [GitHub Issues]
- 技术交流: [Discussion Forum]

---

**桌游方舟** - 让每个人都能找到心仪的桌游 🎲✨