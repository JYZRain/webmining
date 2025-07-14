// language.js - 桌游方舟语言管理系统

const translations = {
    // 导航栏
    'nav.logo': {
        'zh': '桌游方舟',
        'en': 'BoardGame Ark'
    },
    'nav.my_collection': {
        'zh': '我的收藏',
        'en': 'My Collection'
    },
    'nav.new_recommendation': {
        'zh': '重新推荐',
        'en': 'New Quest'
    },
    'nav.save_results': {
        'zh': '收藏结果',
        'en': 'Save Results'
    },
    'nav.back_to_recommendations': {
        'zh': '返回推荐',
        'en': 'Back'
    },
    'nav.home': {
        'zh': '首页',
        'en': 'Home'
    },
    'nav.login': {
        'zh': '登录',
        'en': 'Login'
    },
    'nav.logout': {
        'zh': '登出',
        'en': 'Logout'
    },
    'nav.discover': {
        'zh': '发现游戏',
        'en': 'Discover'
    },
    'nav.profile': {
        'zh': '个人资料',
        'en': 'Profile'
    },

    // 页面标题
    'title.login': {
        'zh': '用户登录 | 桌游方舟',
        'en': 'User Login | BoardGame Ark'
    },
    'title.register': {
        'zh': '用户注册 | 桌游方舟',
        'en': 'User Registration | BoardGame Ark'
    },
    'title.profile': {
        'zh': '个人资料 | 桌游方舟',
        'en': 'Profile | BoardGame Ark'
    },
    'title.wizard': {
        'zh': '桌游方舟 | 发现你的专属桌游',
        'en': 'BoardGame Ark | Discover Your Perfect Games'
    },

    // === Wizard页面 ===
    'wizard.welcome_title': {
        'zh': '桌游方舟',
        'en': 'BoardGame Ark'
    },
    'wizard.welcome_subtitle': {
        'zh': '欢迎来到你的专属桌游推荐之旅！让我们从你熟悉或喜爱的经典游戏开始探索。',
        'en': 'Welcome to your personalized board game journey! Let\'s start with games you know or love.'
    },
    'wizard.welcome_hint': {
        'zh': '选择你认识或感兴趣的游戏（可多选，也可不选）',
        'en': 'Select games you know or find interesting (multiple choices allowed, or skip)'
    },
    'wizard.continue_explore': {
        'zh': '继续探索',
        'en': 'Continue'
    },

    // 游戏机制
    'wizard.mechanics_title': {
        'zh': '你喜欢什么样的游戏体验？',
        'en': 'What Gaming Experience Do You Enjoy?'
    },
    'wizard.mechanics_subtitle': {
        'zh': '每种游戏机制都带来不同的乐趣，选择你最感兴趣的类型',
        'en': 'Each mechanism brings unique fun - pick what sparks your interest'
    },

    'mechanic.strategy.title': {
        'zh': '策略规划师',
        'en': 'Strategic Mastermind'
    },
    'mechanic.strategy.desc': {
        'zh': '深度思考，精心规划每一步，享受运筹帷幄的成就感',
        'en': 'Think deep, plan every move, relish the chess master\'s satisfaction'
    },

    'mechanic.luck.title': {
        'zh': '幸运冒险家',
        'en': 'Fortune Seeker'
    },
    'mechanic.luck.desc': {
        'zh': '拥抱不确定性，在运气与决策间寻找刺激平衡',
        'en': 'Embrace uncertainty, find thrills between luck and choice'
    },

    'mechanic.cooperation.title': {
        'zh': '团队合作者',
        'en': 'Team Player'
    },
    'mechanic.cooperation.desc': {
        'zh': '与朋友携手并进，共同面对挑战，分享胜利喜悦',
        'en': 'Join forces with friends, face challenges together, share sweet victory'
    },

    'mechanic.cards.title': {
        'zh': '卡牌收集师',
        'en': 'Card Collector'
    },
    'mechanic.cards.desc': {
        'zh': '收集、组合、构建，在手牌管理中展现智慧',
        'en': 'Collect, combine, construct - show brilliance through card mastery'
    },

    'mechanic.territory.title': {
        'zh': '领土争夺者',
        'en': 'Territory Conqueror'
    },
    'mechanic.territory.desc': {
        'zh': '控制版图，占领要地，在空间博弈中称王',
        'en': 'Control the map, claim key spots, reign supreme in spatial warfare'
    },

    'mechanic.building.title': {
        'zh': '建造大师',
        'en': 'Master Builder'
    },
    'mechanic.building.desc': {
        'zh': '拼砌图板，构建王国，享受创造的满足感',
        'en': 'Place tiles, build kingdoms, savor creative satisfaction'
    },

    'mechanic.roleplay.title': {
        'zh': '角色扮演者',
        'en': 'Character Hero'
    },
    'mechanic.roleplay.desc': {
        'zh': '化身英雄，运用独特能力，在故事中成长',
        'en': 'Become the hero, wield unique powers, grow through epic tales'
    },

    'mechanic.reaction.title': {
        'zh': '反应达人',
        'en': 'Reflex Champion'
    },
    'mechanic.reaction.desc': {
        'zh': '考验记忆与反应，在快节奏中展现敏捷',
        'en': 'Test memory and reflexes, showcase agility in fast-paced action'
    },

    'mechanic.social.title': {
        'zh': '社交大师',
        'en': 'Social Wizard'
    },
    'mechanic.social.desc': {
        'zh': '谈判、欺骗、结盟，在人际博弈中获胜',
        'en': 'Negotiate, bluff, ally - win through social mastery'
    },

    // 游戏领域
    'wizard.domains_title': {
        'zh': '选择你的游戏领域',
        'en': 'Choose Your Gaming Realm'
    },
    'wizard.domains_subtitle': {
        'zh': '不同的游戏领域适合不同的场合和心情',
        'en': 'Different realms suit different occasions and moods'
    },

    'domain.strategy.title': {
        'zh': '策略游戏',
        'en': 'Strategy Games'
    },
    'domain.strategy.desc': {
        'zh': '深度策略，考验智慧与规划能力',
        'en': 'Deep strategy, test wisdom and planning skills'
    },

    'domain.family.title': {
        'zh': '家庭游戏',
        'en': 'Family Games'
    },
    'domain.family.desc': {
        'zh': '老少皆宜，增进家庭感情的温馨时光',
        'en': 'Fun for all ages, bonding through warm moments'
    },

    'domain.thematic.title': {
        'zh': '主题游戏',
        'en': 'Thematic Games'
    },
    'domain.thematic.desc': {
        'zh': '丰富剧情，沉浸式的故事体验',
        'en': 'Rich narratives, immersive story experiences'
    },

    'domain.party.title': {
        'zh': '聚会游戏',
        'en': 'Party Games'
    },
    'domain.party.desc': {
        'zh': '轻松欢乐，派对聚会的完美选择',
        'en': 'Light & lively, perfect party companions'
    },

    'domain.abstract.title': {
        'zh': '抽象游戏',
        'en': 'Abstract Games'
    },
    'domain.abstract.desc': {
        'zh': '纯粹策略，不被主题束缚的思维对决',
        'en': 'Pure strategy, mind duels unbound by theme'
    },

    'domain.children.title': {
        'zh': '儿童游戏',
        'en': 'Children\'s Games'
    },
    'domain.children.desc': {
        'zh': '寓教于乐，培养小朋友的思维能力',
        'en': 'Learning through play, nurturing young minds'
    },

    // 游戏设置
    'wizard.settings_title': {
        'zh': '今天的游戏设定',
        'en': 'Today\'s Gaming Setup'
    },
    'wizard.settings_subtitle': {
        'zh': '告诉我们今天的游戏情况，我们为你精准推荐',
        'en': 'Tell us about today\'s session for perfect recommendations'
    },

    'setting.players.label': {
        'zh': '今天有几个人玩游戏？',
        'en': 'How many players today?'
    },
    'setting.players.solo': {
        'zh': '独自一人',
        'en': 'Solo Quest'
    },
    'setting.players.solo.desc': {
        'zh': '享受独处时光',
        'en': 'Enjoy me-time'
    },
    'setting.players.small': {
        'zh': '小团体',
        'en': 'Small Group'
    },
    'setting.players.small.desc': {
        'zh': '2-4人的亲密聚会',
        'en': '2-4 player cozy gathering'
    },
    'setting.players.medium': {
        'zh': '中等聚会',
        'en': 'Medium Party'
    },
    'setting.players.medium.desc': {
        'zh': '5-8人的热闹时光',
        'en': '5-8 player fun time'
    },
    'setting.players.large': {
        'zh': '大型聚会',
        'en': 'Big Bash'
    },
    'setting.players.large.desc': {
        'zh': '8人以上的派对',
        'en': '8+ player party'
    },

    'setting.time.label': {
        'zh': '今天有多少时间？',
        'en': 'How much time do you have?'
    },
    'setting.time.quick': {
        'zh': '快速游戏',
        'en': 'Quick Play'
    },
    'setting.time.quick.desc': {
        'zh': '30分钟内结束',
        'en': 'Under 30 minutes'
    },
    'setting.time.standard': {
        'zh': '标准时长',
        'en': 'Standard Session'
    },
    'setting.time.standard.desc': {
        'zh': '1-2小时的经典体验',
        'en': '1-2 hour classic experience'
    },
    'setting.time.deep': {
        'zh': '深度体验',
        'en': 'Deep Dive'
    },
    'setting.time.deep.desc': {
        'zh': '2-3小时的沉浸游戏',
        'en': '2-3 hour immersion'
    },
    'setting.time.epic': {
        'zh': '史诗冒险',
        'en': 'Epic Adventure'
    },
    'setting.time.epic.desc': {
        'zh': '3小时以上的传奇之旅',
        'en': '3+ hour legendary journey'
    },

    'setting.age.label': {
        'zh': '最小的玩家多大？',
        'en': 'Youngest player\'s age?'
    },
    'setting.age.child': {
        'zh': '儿童友好',
        'en': 'Kid-Friendly'
    },
    'setting.age.child.desc': {
        'zh': '6岁以上都能玩',
        'en': 'Ages 6 and up'
    },
    'setting.age.youth': {
        'zh': '青少年',
        'en': 'Youth'
    },
    'setting.age.youth.desc': {
        'zh': '10岁以上适宜',
        'en': 'Ages 10 and up'
    },
    'setting.age.teen': {
        'zh': '少年向',
        'en': 'Teen'
    },
    'setting.age.teen.desc': {
        'zh': '12岁以上推荐',
        'en': 'Ages 12 and up'
    },
    'setting.age.mature': {
        'zh': '成人向',
        'en': 'Mature'
    },
    'setting.age.mature.desc': {
        'zh': '14岁以上成熟玩家',
        'en': 'Ages 14+ mature players'
    },

    'setting.complexity.label': {
        'zh': '今天想要什么难度？',
        'en': 'What complexity level?'
    },
    'setting.complexity.easy': {
        'zh': '轻松入门',
        'en': 'Easy Breezy'
    },
    'setting.complexity.easy.desc': {
        'zh': '简单易学，快速上手',
        'en': 'Simple rules, quick to learn'
    },
    'setting.complexity.medium': {
        'zh': '适中难度',
        'en': 'Just Right'
    },
    'setting.complexity.medium.desc': {
        'zh': '需要一些思考',
        'en': 'Some thinking required'
    },
    'setting.complexity.hard': {
        'zh': '烧脑挑战',
        'en': 'Brain Burner'
    },
    'setting.complexity.hard.desc': {
        'zh': '考验策略思维',
        'en': 'Strategic thinking challenge'
    },
    'setting.complexity.expert': {
        'zh': '大师级别',
        'en': 'Master Class'
    },
    'setting.complexity.expert.desc': {
        'zh': '极具挑战性',
        'en': 'Extremely challenging'
    },

    'wizard.magic_button': {
        'zh': '施展推荐魔法！',
        'en': 'Cast the Magic!'
    },
    'wizard.prev_step': {
        'zh': '上一步',
        'en': 'Previous'
    },

    'wizard.loading.title': {
        'zh': '魔法师正在施法中...',
        'en': 'The Wizard is Casting...'
    },
    'wizard.loading.subtitle': {
        'zh': '根据你的喜好寻找完美的桌游',
        'en': 'Finding perfect games based on your preferences'
    },

    // === Recommendations页面 ===
    'rec.main_title': {
        'zh': '猜你喜欢',
        'en': 'Made For You'
    },
    'rec.main_subtitle': {
        'zh': '基于你的偏好精心挑选，这些桌游最符合你的口味',
        'en': 'Handpicked based on your preferences - these games match your taste perfectly'
    },

    'rec.top_rated_title': {
        'zh': '高分精选',
        'en': 'Top Rated'
    },
    'rec.newest_title': {
        'zh': '新品推荐',
        'en': 'Fresh Picks'
    },
    'rec.more_matches_title': {
        'zh': '更多匹配',
        'en': 'More Matches'
    },

    'rec.view_more_top': {
        'zh': '查看更多高分游戏',
        'en': 'View More Top Games'
    },
    'rec.view_more_new': {
        'zh': '查看更多新品游戏',
        'en': 'View More New Games'
    },
    'rec.view_more_matches': {
        'zh': '查看所有匹配游戏',
        'en': 'View All Matches'
    },

    'rec.modal.more_games': {
        'zh': '更多游戏',
        'en': 'More Games'
    },
    'rec.modal.top_games': {
        'zh': '更多高分游戏',
        'en': 'More Top Rated Games'
    },
    'rec.modal.new_games': {
        'zh': '更多新品游戏',
        'en': 'More Fresh Games'
    },
    'rec.modal.all_matches': {
        'zh': '所有匹配游戏',
        'en': 'All Matching Games'
    },

    'rec.loading': {
        'zh': '正在加载推荐结果...',
        'en': 'Loading recommendations...'
    },
    'rec.no_results': {
        'zh': '暂无推荐结果',
        'en': 'No recommendations yet'
    },
    'rec.no_data': {
        'zh': '暂无数据',
        'en': 'No data available'
    },

    'rec.match_score': {
        'zh': '匹配',
        'en': 'match'
    },

    'rec.save_prompt': {
        'zh': '给这个推荐起个名字：',
        'en': 'Name this recommendation:'
    },
    'rec.save_default': {
        'zh': '推荐_',
        'en': 'Recommendation_'
    },

    'rec.confirm_new_search': {
        'zh': '确定要重新开始推荐吗？',
        'en': 'Start a new recommendation quest?'
    },

    'rec.toast.saved_cloud': {
        'zh': '推荐已保存到云端！',
        'en': 'Saved to cloud!'
    },
    'rec.toast.saved_local': {
        'zh': '推荐已保存到本地！',
        'en': 'Saved locally!'
    },
    'rec.toast.viewing_saved': {
        'zh': '正在查看保存的推荐记录',
        'en': 'Viewing saved recommendation'
    },

    // === Saved页面 ===
    'saved.title': {
        'zh': '我的收藏',
        'en': 'My Collection'
    },
    'saved.subtitle': {
        'zh': '这里保存着你之前收藏的所有推荐记录',
        'en': 'All your saved recommendations in one place'
    },

    'saved.view': {
        'zh': '查看',
        'en': 'View'
    },
    'saved.delete': {
        'zh': '删除',
        'en': 'Delete'
    },

    'saved.summary.games': {
        'zh': '推荐游戏',
        'en': 'Games'
    },
    'saved.summary.players': {
        'zh': '玩家数量',
        'en': 'Players'
    },
    'saved.summary.time': {
        'zh': '游戏时长',
        'en': 'Duration'
    },
    'saved.summary.complexity': {
        'zh': '复杂度',
        'en': 'Complexity'
    },
    'saved.summary.minutes': {
        'zh': '分钟',
        'en': 'minutes'
    },
    'saved.summary.count': {
        'zh': '款',
        'en': 'games'
    },
    'saved.summary.not_set': {
        'zh': '未设置',
        'en': 'Not set'
    },

    'saved.preview.title': {
        'zh': '推荐游戏预览：',
        'en': 'Game preview:'
    },
    'saved.preview.more': {
        'zh': '款更多...',
        'en': ' more...'
    },

    'saved.empty.icon': {
        'zh': '📖',
        'en': '📖'
    },
    'saved.empty.title': {
        'zh': '还没有收藏记录',
        'en': 'No Saved Recommendations Yet'
    },
    'saved.empty.text': {
        'zh': '去创建你的第一个桌游推荐吧！',
        'en': 'Create your first board game recommendation!'
    },
    'saved.empty.button': {
        'zh': '开始推荐',
        'en': 'Start Quest'
    },

    'saved.loading': {
        'zh': '正在加载收藏记录...',
        'en': 'Loading collection...'
    },

    'saved.error.title': {
        'zh': '加载失败',
        'en': 'Loading Failed'
    },
    'saved.error.text': {
        'zh': '无法加载收藏记录，请重试',
        'en': 'Failed to load collection, please retry'
    },
    'saved.error.button': {
        'zh': '重新加载',
        'en': 'Reload'
    },

    'saved.confirm_delete': {
        'zh': '确定要删除这个推荐记录吗？',
        'en': 'Delete this recommendation?'
    },

    'saved.toast.deleted': {
        'zh': '删除成功',
        'en': 'Deleted successfully'
    },
    'saved.toast.delete_failed': {
        'zh': '删除失败',
        'en': 'Delete failed'
    },
    'saved.toast.load_failed': {
        'zh': '获取推荐记录失败',
        'en': 'Failed to load recommendation'
    },

    'saved.new_recommendation': {
        'zh': '新推荐',
        'en': 'New Quest'
    },
    'saved.back': {
        'zh': '返回推荐',
        'en': 'Back'
    },

    'saved.toast.network_error': {
        'zh': '网络错误，请重试',
        'en': 'Network error, please retry'
    },

    // === Login页面 ===
    'login.subtitle': {
        'zh': '欢迎回来，发现更多精彩桌游',
        'en': 'Welcome back, discover amazing board games'
    },
    'login.username': {
        'zh': '用户名',
        'en': 'Username'
    },
    'login.password': {
        'zh': '密码',
        'en': 'Password'
    },
    'login.submit': {
        'zh': '登录',
        'en': 'Login'
    },
    'login.or': {
        'zh': '或',
        'en': 'or'
    },
    'login.no_account': {
        'zh': '还没有账号？',
        'en': 'Don\'t have an account?'
    },
    'login.register_link': {
        'zh': '立即注册',
        'en': 'Sign up now'
    },
    'login.back_home': {
        'zh': '返回首页',
        'en': 'Back to Home'
    },

    // Login 动态文本
    'login.logging_in': {
        'zh': '登录中...',
        'en': 'Logging in...'
    },
    'login.success': {
        'zh': '登录成功！正在跳转...',
        'en': 'Login successful! Redirecting...'
    },
    'login.error.empty_fields': {
        'zh': '请填写完整的用户名和密码',
        'en': 'Please fill in both username and password'
    },

    // === Register页面 ===
    'register.subtitle': {
        'zh': '加入我们，开启桌游探索之旅',
        'en': 'Join us and start your board game journey'
    },
    'register.email': {
        'zh': '邮箱',
        'en': 'Email'
    },
    'register.submit': {
        'zh': '注册',
        'en': 'Register'
    },

    // Register 动态文本
    'register.registering': {
        'zh': '注册中...',
        'en': 'Registering...'
    },
    'register.success': {
        'zh': '注册成功！正在跳转...',
        'en': 'Registration successful! Redirecting...'
    },
    'register.error.email_required': {
        'zh': '请输入邮箱',
        'en': 'Please enter email'
    },
    'register.error.email_invalid': {
        'zh': '请输入有效的邮箱地址',
        'en': 'Please enter a valid email address'
    },
    'register.error.failed': {
        'zh': '注册失败，请重试',
        'en': 'Registration failed, please try again'
    },
    'register.error.generic': {
        'zh': '注册错误',
        'en': 'Registration error'
    },

    // 密码强度
    'password.strength.weak': {
        'zh': '密码强度：弱',
        'en': 'Password strength: Weak'
    },
    'password.strength.medium': {
        'zh': '密码强度：中等',
        'en': 'Password strength: Medium'
    },
    'password.strength.strong': {
        'zh': '密码强度：强',
        'en': 'Password strength: Strong'
    },

    // === Profile页面 ===
    'profile.joined': {
        'zh': '加入时间',
        'en': 'Joined'
    },
    'profile.discover_new': {
        'zh': '发现新游戏',
        'en': 'Discover New Games'
    },
    'profile.saved_recommendations': {
        'zh': '收藏的推荐',
        'en': 'Saved Recommendations'
    },
    'profile.days_since_join': {
        'zh': '加入天数',
        'en': 'Days Since Joined'
    },
    'profile.favorite_category': {
        'zh': '偏好类型',
        'en': 'Favorite Category'
    },
    'profile.recent_activity': {
        'zh': '最近活动',
        'en': 'Recent Activity'
    },
    'profile.view_all': {
        'zh': '查看全部',
        'en': 'View All'
    },
    'profile.loading': {
        'zh': '加载中...',
        'en': 'Loading...'
    },
    'profile.confirm_logout': {
        'zh': '确定要登出吗？',
        'en': 'Are you sure you want to logout?'
    },
    'profile.no_activity': {
        'zh': '还没有任何活动记录',
        'en': 'No activity records yet'
    },
    'profile.error.load_stats': {
        'zh': '加载用户统计失败',
        'en': 'Failed to load user statistics'
    },

    // === 通用消息 ===
    'common.data_loading_failed': {
        'zh': '获取数据失败',
        'en': 'Failed to fetch data'
    },
    'common.delete_record_failed': {
        'zh': '删除推荐记录失败',
        'en': 'Failed to delete recommendation record'
    },
    'common.get_record_failed': {
        'zh': '获取推荐记录失败',
        'en': 'Failed to get recommendation record'
    },
    'common.confirm_delete_record': {
        'zh': '确定要删除这个推荐记录吗？',
        'en': 'Are you sure you want to delete this recommendation record?'
    },
    'common.no_data': {
        'zh': '暂无数据',
        'en': 'No data available'
    },
    'common.minutes': {
        'zh': '分钟',
        'en': 'minutes'
    },
    'common.not_set': {
        'zh': '未设置',
        'en': 'Not set'
    },
    'common.reload': {
        'zh': '重新加载',
        'en': 'Reload'
    },
    'common.unknown': {
        'zh': '未知',
        'en': 'Unknown'
    },
    'common.games_unit': {
        'zh': '款',
        'en': 'games'
    },
    'common.more_games': {
        'zh': '款更多...',
        'en': ' more...'
    },

    // === 游戏类型 ===
    'game.type.strategy': {
        'zh': '策略游戏',
        'en': 'Strategy Games'
    },
    'game.type.family': {
        'zh': '家庭游戏',
        'en': 'Family Games'
    },
    'game.type.party': {
        'zh': '聚会游戏',
        'en': 'Party Games'
    },
    'game.type.thematic': {
        'zh': '主题游戏',
        'en': 'Thematic Games'
    },
    'game.type.abstract': {
        'zh': '抽象游戏',
        'en': 'Abstract Games'
    },
    'game.type.children': {
        'zh': '儿童游戏',
        'en': 'Children\'s Games'
    },

    // === 收藏页面摘要 ===
    'saved.summary.recommended_games': {
        'zh': '推荐游戏',
        'en': 'Recommended Games'
    },
    'saved.summary.players_count': {
        'zh': '玩家数量',
        'en': 'Players'
    },
    'saved.summary.game_time': {
        'zh': '游戏时长',
        'en': 'Duration'
    },
    'saved.summary.game_complexity': {
        'zh': '复杂度',
        'en': 'Complexity'
    },
    'saved.preview.game_title': {
        'zh': '推荐游戏预览：',
        'en': 'Game Preview:'
    },
    'saved.empty.no_records': {
        'zh': '还没有收藏记录',
        'en': 'No saved records yet'
    },
    'saved.error.load_failed': {
        'zh': '加载失败',
        'en': 'Loading Failed'
    },
    'saved.error.load_failed_desc': {
        'zh': '无法加载收藏记录，请重试',
        'en': 'Cannot load saved records, please retry'
    },

    // === 个人资料页面 ===
    'profile.discover_games': {
        'zh': '去发现一些精彩的桌游吧！',
        'en': 'Go discover some amazing board games!'
    },

    // === 步骤标签 ===
    'step.games': {
        'zh': '游戏偏好',
        'en': 'Game Preferences'
    },
    'step.mechanics': {
        'zh': '机制偏好',
        'en': 'Mechanics'
    },
    'step.categories': {
        'zh': '类型偏好',
        'en': 'Categories'
    },
    'step.settings': {
        'zh': '游戏设置',
        'en': 'Game Settings'
    },
    'step.results': {
        'zh': '获取推荐',
        'en': 'Get Results'
    }
};

// 语言管理器类
class LanguageManager {
    constructor() {
        this.currentLang = localStorage.getItem('boardgame-ark-lang') || 'zh';
        this.observers = [];
    }

    // 获取当前语言
    getCurrentLang() {
        return this.currentLang;
    }

    // 切换语言
    toggleLanguage() {
        this.currentLang = this.currentLang === 'zh' ? 'en' : 'zh';
        localStorage.setItem('boardgame-ark-lang', this.currentLang);
        this.notifyObservers();
        this.updatePageLanguage();
    }

    // 获取翻译文本
    t(key) {
        if (translations[key] && translations[key][this.currentLang]) {
            return translations[key][this.currentLang];
        }
        console.warn(`Translation missing for key: ${key}`);
        return translations[key]?.zh || key;
    }

    // 注册观察者
    addObserver(callback) {
        this.observers.push(callback);
    }

    // 通知所有观察者
    notifyObservers() {
        this.observers.forEach(callback => callback(this.currentLang));
    }

    // 更新页面语言
    updatePageLanguage() {
        // 更新所有带有 data-i18n 属性的元素
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            const translation = this.t(key);

            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                if (element.getAttribute('placeholder')) {
                    element.placeholder = translation;
                }
            } else {
                element.textContent = translation;
            }
        });

        // 更新所有带有 data-i18n-html 属性的元素（保留HTML）
        document.querySelectorAll('[data-i18n-html]').forEach(element => {
            const key = element.getAttribute('data-i18n-html');
            element.innerHTML = this.t(key);
        });

        // 更新页面标题
        if (document.title.includes('桌游方舟') || document.title.includes('BoardGame Ark')) {
            const titleParts = document.title.split('|');
            if (titleParts.length > 1) {
                const pageName = titleParts[1].trim();
                const baseTitle = this.t('nav.logo');

                // 根据页面更新标题
                let pageTitle = '';
                if (pageName.includes('推荐') || pageName.includes('Recommendations')) {
                    pageTitle = this.currentLang === 'zh' ? '专属推荐' : 'Your Recommendations';
                } else if (pageName.includes('收藏') || pageName.includes('Collection')) {
                    pageTitle = this.t('saved.title');
                } else if (pageName.includes('发现') || pageName.includes('Discover')) {
                    pageTitle = this.currentLang === 'zh' ? '发现你的专属桌游' : 'Discover Your Games';
                } else if (pageName.includes('登录') || pageName.includes('Login')) {
                    pageTitle = this.currentLang === 'zh' ? '用户登录' : 'User Login';
                } else if (pageName.includes('注册') || pageName.includes('Registration')) {
                    pageTitle = this.currentLang === 'zh' ? '用户注册' : 'User Registration';
                } else if (pageName.includes('个人资料') || pageName.includes('Profile')) {
                    pageTitle = this.currentLang === 'zh' ? '个人资料' : 'Profile';
                }

                document.title = `${baseTitle} | ${pageTitle}`;
            }
        }

        // 更新 HTML lang 属性
        document.documentElement.lang = this.currentLang;
    }
}

// 创建全局实例
const langManager = new LanguageManager();

// 创建语言切换按钮
function createLanguageToggle() {
    const toggle = document.createElement('button');
    toggle.className = 'language-toggle';
    toggle.innerHTML = langManager.getCurrentLang() === 'zh' ? 'EN' : '中';
    toggle.setAttribute('aria-label', 'Toggle language');

    toggle.addEventListener('click', () => {
        langManager.toggleLanguage();
        toggle.innerHTML = langManager.getCurrentLang() === 'zh' ? 'EN' : '中';
    });

    return toggle;
}

// 在 DOM 加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
    // 检查是否已经存在语言切换按钮，避免重复添加
    const existingToggle = document.querySelector('.language-toggle');
    if (!existingToggle) {
        // 尝试添加语言切换按钮到导航栏
        const navActions = document.querySelector('.nav-actions');
        if (navActions) {
            const langToggle = createLanguageToggle();
            navActions.insertBefore(langToggle, navActions.firstChild);
        } else {
            // 如果没有导航栏（如wizard页面），添加到进度条容器
            const progressContainer = document.querySelector('.progress-container');
            if (progressContainer) {
                const langToggle = createLanguageToggle();
                langToggle.style.position = 'fixed';
                langToggle.style.top = '1rem';
                langToggle.style.right = '1rem';
                langToggle.style.zIndex = '1001';
                document.body.appendChild(langToggle);
            }
        }
    }

    // 初始化页面语言
    langManager.updatePageLanguage();

    // 监听语言变化
    langManager.addObserver((newLang) => {
        console.log('Language changed to:', newLang);
    });
});

// 导出给其他模块使用
window.langManager = langManager;