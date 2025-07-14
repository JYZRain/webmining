# enhanced_recommendation.py
import pandas as pd
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.preprocessing import MultiLabelBinarizer, MinMaxScaler
from scipy.sparse import hstack, csr_matrix
import requests
import logging
import re
import time
from typing import List, Dict, Any, Tuple, Optional

logger = logging.getLogger(__name__)


class EnhancedRecommendationSystem:
    """增强版桌游推荐系统"""

    def __init__(self):
        self.df = None
        self.feature_matrix = None
        self.mlb_mechanics = None
        self.mlb_domains = None
        self.scaler = None
        self.mechanism_mapping = self._create_mechanism_mapping()

    # 在 enhanced_recommendation.py 的 _create_mechanism_mapping 方法中更新为：

    def _create_mechanism_mapping(self) -> Dict[str, List[str]]:
        """创建游戏机制分类映射"""
        return {
            'strategy': [
                'Worker Placement', 'Action Points', 'Resource Management', 'Tech Trees / Tech Tracks',
                'Income', 'Market', 'Economic', 'Investment', 'Auction/Bidding', 'Trading',
                'Turn Order: Progressive', 'Turn Order: Stat-Based', 'Score-and-Reset Game'
            ],
            'luck': [
                'Dice Rolling', 'Push Your Luck', 'Roll / Spin and Move', 'Bag Building',
                'Random Production', 'Die Icon Resolution', 'Chit-Pull System'
            ],
            'cooperation': [
                'Cooperative Game', 'Team-Based Game', 'Semi-Cooperative Game', 'Traitor Game',
                'Communication Limits', 'Hidden Movement', 'Deduction'
            ],
            'cards': [
                'Card Drafting', 'Hand Management', 'Set Collection', 'Deck Construction',
                'Deck Building', 'Deck Bag and Pool Building', 'Card Play Conflict Resolution',
                'Drafting', 'Multi-Use Cards', 'Once-Per-Game Abilities'
            ],
            'territory': [
                'Area Majority / Influence', 'Area Movement', 'Grid Movement', 'Point to Point Movement',
                'Area-Impulse', 'Enclosure', 'Zone of Control', 'Area Enclosure'
            ],
            'building': [
                'Tile Placement', 'Pattern Building', 'Modular Board', 'Map Addition',
                'Puzzle', 'Polyomino Placement', 'Construction', 'Network and Route Building'
            ],
            'roleplay': [
                'Variable Player Powers', 'Simulation', 'Role Playing', 'Character Customization',
                'Legacy Game', 'Campaign / Battle Card Driven', 'Scenario / Mission / Campaign Game',
                'Storytelling', 'Player Judge'
            ],
            'reaction': [
                'Memory', 'Real Time', 'Speed Matching', 'Action / Dexterity',
                'Flicking', 'Stacking and Balancing', 'Singing'
            ],
            'social': [
                'Negotiation', 'Bluffing', 'Voting', 'Alliances', 'Social Deduction',
                'Bribery', 'Player Elimination', 'Party Game', 'Deduction',
                'Hidden Roles', 'I Cut You Choose', 'Take That'
            ]
        }


    def load_and_preprocess_data(self, filepath: str):
        """加载和预处理数据"""
        try:
            # 尝试不同编码
            for encoding in ['latin1', 'windows-1252', 'utf-8']:
                try:
                    self.df = pd.read_csv(filepath, delimiter=',', encoding=encoding)
                    self.df.set_index('ID', inplace=True)
                    logger.info(f"成功使用 {encoding} 编码加载数据")
                    break
                except UnicodeDecodeError:
                    continue

            if self.df is None:
                raise ValueError("无法用任何编码读取数据文件")

            # 数据清洗
            self.df = self.df.dropna(subset=['Name'])

            # 处理多值字段
            self.df['Mechanics'] = self.df['Mechanics'].apply(
                lambda x: x.split(', ') if pd.notnull(x) and isinstance(x, str) else []
            )
            self.df['Domains'] = self.df['Domains'].apply(
                lambda x: x.split(', ') if pd.notnull(x) and isinstance(x, str) else []
            )

            # 添加归类机制
            self.df['Mechanism_Categories'] = self.df['Mechanics'].apply(self._categorize_mechanisms)

            # 编码分类特征
            self.mlb_mechanics = MultiLabelBinarizer(sparse_output=True)
            mechanics_encoded = self.mlb_mechanics.fit_transform(self.df['Mechanics'])

            self.mlb_domains = MultiLabelBinarizer(sparse_output=True)
            domains_encoded = self.mlb_domains.fit_transform(self.df['Domains'])

            # 标准化数值特征
            numerical_cols = ['Min Players', 'Max Players', 'Play Time', 'Min Age', 'Complexity']

            # 填充缺失值
            for col in numerical_cols:
                if col in self.df.columns:
                    self.df[col] = self.df[col].fillna(self.df[col].median())

            self.scaler = MinMaxScaler()
            numerical_scaled = self.scaler.fit_transform(self.df[numerical_cols])
            numerical_sparse = csr_matrix(numerical_scaled)

            # 组合特征矩阵
            self.feature_matrix = hstack([mechanics_encoded, domains_encoded, numerical_sparse])

            logger.info(f"数据预处理完成，共 {len(self.df)} 个游戏，特征维度 {self.feature_matrix.shape[1]}")

        except Exception as e:
            logger.error(f"数据加载失败: {e}")
            raise

    def _categorize_mechanisms(self, mechanics: List[str]) -> List[str]:
        """将具体机制归类到大类别"""
        categories = []
        for category, mechanism_list in self.mechanism_mapping.items():
            if any(mech in mechanism_list for mech in mechanics):
                categories.append(category)
        return categories

    def _parse_player_preference(self, player_pref: str) -> Tuple[int, int]:
        """解析玩家数量偏好"""
        if player_pref == '1':
            return 1, 1
        elif player_pref == '2-4':
            return 2, 4
        elif player_pref == '5-8':
            return 5, 8
        elif player_pref == '8+':
            return 8, 12
        else:
            return 2, 4

    def _parse_time_preference(self, time_pref: str) -> int:
        """解析时间偏好"""
        time_map = {
            '30': 30,
            '90': 90,
            '180': 180,
            '240': 240
        }
        return time_map.get(str(time_pref), 90)

    def _parse_age_preference(self, age_pref: str) -> int:
        """解析年龄偏好"""
        age_map = {
            '6': 6,
            '10': 10,
            '12': 12,
            '14': 14
        }
        return age_map.get(str(age_pref), 12)

    def _parse_complexity_preference(self, complexity_pref: str) -> float:
        """解析复杂度偏好"""
        complexity_map = {
            '1.5': 1.5,
            '2.5': 2.5,
            '3.5': 3.5,
            '4.5': 4.5
        }
        return complexity_map.get(str(complexity_pref), 2.5)

    def get_classic_games_by_selection(self, selected_games: List[str]) -> List[int]:
        """根据用户选择的经典游戏获取游戏ID"""
        if not selected_games:
            return []

        game_indices = []
        for game_name in selected_games:
            matches = self.df[self.df['Name'].str.lower().str.contains(
                game_name.lower(), na=False, regex=False
            )]
            if not matches.empty:
                # 选择最匹配的（名称最短的）
                best_match = matches.loc[matches['Name'].str.len().idxmin()]
                game_indices.append(self.df.index.get_loc(best_match.name))

        return game_indices

    def build_preference_vector(self, preferences: Dict[str, Any]) -> np.ndarray:
        """根据用户偏好构建特征向量"""
        try:
            # 解析偏好
            selected_mechanisms = preferences.get('selectedMechanics', [])
            selected_domains = preferences.get('selectedDomains', [])
            game_settings = preferences.get('gameSettings', {})

            # 解析游戏设置
            min_players, max_players = self._parse_player_preference(
                game_settings.get('players', '2-4')
            )
            play_time = self._parse_time_preference(game_settings.get('time', '90'))
            min_age = self._parse_age_preference(game_settings.get('age', '12'))
            complexity = self._parse_complexity_preference(game_settings.get('complexity', '2.5'))

            # 创建向量
            user_vector = np.zeros(self.feature_matrix.shape[1])

            # 设置机制偏好
            if selected_mechanisms:
                # 将类别映射到具体机制
                preferred_mechanics = []
                for category in selected_mechanisms:
                    if category in self.mechanism_mapping:
                        preferred_mechanics.extend(self.mechanism_mapping[category])

                # 在编码器中查找对应的机制
                for mech in preferred_mechanics:
                    if mech in self.mlb_mechanics.classes_:
                        idx = np.where(self.mlb_mechanics.classes_ == mech)[0][0]
                        user_vector[idx] = 1.0

            # 设置领域偏好
            if selected_domains:
                for domain in selected_domains:
                    if domain in self.mlb_domains.classes_:
                        idx = np.where(self.mlb_domains.classes_ == domain)[0][0] + len(self.mlb_mechanics.classes_)
                        user_vector[idx] = 1.0

            # 设置数值偏好
            numerical_features = np.array([[min_players, max_players, play_time, min_age, complexity]])
            numerical_scaled = self.scaler.transform(numerical_features)[0]

            num_categorical = len(self.mlb_mechanics.classes_) + len(self.mlb_domains.classes_)
            user_vector[num_categorical:] = numerical_scaled

            return user_vector

        except Exception as e:
            logger.error(f"构建偏好向量时出错: {e}")
            raise

    def calculate_weighted_score(self, similarity_scores: np.ndarray,
                                 rating_weight: float = 0.3,
                                 popularity_weight: float = 0.2) -> np.ndarray:
        """计算加权推荐分数"""
        try:
            # 标准化相似度分数
            similarity_normalized = (similarity_scores - similarity_scores.min()) / \
                                    (similarity_scores.max() - similarity_scores.min() + 1e-8)

            # 标准化评分
            ratings = self.df['Rating Average'].fillna(0).values
            rating_normalized = (ratings - ratings.min()) / (ratings.max() - ratings.min() + 1e-8)

            # 标准化评分人数（作为流行度指标）
            users_rated = self.df['Users Rated'].fillna(0).values
            popularity_normalized = (users_rated - users_rated.min()) / \
                                    (users_rated.max() - users_rated.min() + 1e-8)

            # 计算加权分数
            similarity_weight = 1.0 - rating_weight - popularity_weight
            weighted_scores = (similarity_weight * similarity_normalized +
                               rating_weight * rating_normalized +
                               popularity_weight * popularity_normalized)

            return weighted_scores

        except Exception as e:
            logger.error(f"计算加权分数时出错: {e}")
            return similarity_scores

    def get_enhanced_recommendations(self, preferences: Dict[str, Any],
                                     N: int = 12) -> List[Dict[str, Any]]:
        """获取增强推荐结果"""
        try:
            # 构建用户偏好向量
            user_vector = self.build_preference_vector(preferences)

            # 计算相似度
            similarity_scores = cosine_similarity(
                user_vector.reshape(1, -1),
                self.feature_matrix
            ).flatten()

            # 获取选中的经典游戏
            selected_games = preferences.get('selectedGames', [])
            if selected_games:
                classic_indices = self.get_classic_games_by_selection(selected_games)
                # 如果用户选择了经典游戏，增加这些游戏相似游戏的权重
                for idx in classic_indices:
                    classic_similarity = cosine_similarity(
                        self.feature_matrix[idx:idx + 1],
                        self.feature_matrix
                    ).flatten()
                    similarity_scores = 0.7 * similarity_scores + 0.3 * classic_similarity

            # 计算加权分数
            weighted_scores = self.calculate_weighted_score(similarity_scores)

            # 获取推荐结果 - 分层筛选策略
            top_indices = np.argsort(weighted_scores)[::-1][:N * 4]  # 获取更多候选

            recommendations = []
            
            # 第一轮：优先选择评分人数>=500的游戏
            for idx in top_indices:
                if len(recommendations) >= N:
                    break

                game = self.df.iloc[idx]

                # 跳过数据不完整的游戏
                if pd.isna(game['Name']) or pd.isna(game.get('Rating Average', 0)):
                    continue
                    
                # 优先选择评分人数>=500的游戏
                if game.get('Users Rated', 0) >= 500:
                    rec = {
                        'id': int(game.name),  # BGG ID
                        'name': str(game['Name']),
                        'rating': float(game.get('Rating Average', 0)),
                        'year': int(game.get('Year Published', 0)) if pd.notna(game.get('Year Published')) else 0,
                        'similarity_score': float(similarity_scores[idx]),
                        'weighted_score': float(weighted_scores[idx]),
                        'match_score': min(100, max(0, int(weighted_scores[idx] * 100))),
                        'min_players': int(game.get('Min Players', 0)) if pd.notna(game.get('Min Players')) else 0,
                        'max_players': int(game.get('Max Players', 0)) if pd.notna(game.get('Max Players')) else 0,
                        'play_time': int(game.get('Play Time', 0)) if pd.notna(game.get('Play Time')) else 0,
                        'min_age': int(game.get('Min Age', 0)) if pd.notna(game.get('Min Age')) else 0,
                        'complexity': float(game.get('Complexity', 0)) if pd.notna(
                            game.get('Complexity')) else 0,
                        'mechanics': game.get('Mechanics', []),
                        'domains': game.get('Domains', []),
                        'users_rated': int(game.get('Users Rated', 0)) if pd.notna(game.get('Users Rated')) else 0
                    }
                    recommendations.append(rec)
            
            # 第二轮：如果还没有足够的推荐，降低到评分人数>=100的游戏
            if len(recommendations) < N:
                for idx in top_indices:
                    if len(recommendations) >= N:
                        break

                    game = self.df.iloc[idx]

                    # 跳过数据不完整的游戏
                    if pd.isna(game['Name']) or pd.isna(game.get('Rating Average', 0)):
                        continue
                        
                    # 跳过已经添加的游戏
                    if any(rec['id'] == int(game.name) for rec in recommendations):
                        continue
                        
                    # 选择评分人数>=100的游戏
                    if game.get('Users Rated', 0) >= 100:
                        rec = {
                            'id': int(game.name),  # BGG ID
                            'name': str(game['Name']),
                            'rating': float(game.get('Rating Average', 0)),
                            'year': int(game.get('Year Published', 0)) if pd.notna(game.get('Year Published')) else 0,
                            'similarity_score': float(similarity_scores[idx]),
                            'weighted_score': float(weighted_scores[idx]),
                            'match_score': min(100, max(0, int(weighted_scores[idx] * 100))),
                            'min_players': int(game.get('Min Players', 0)) if pd.notna(game.get('Min Players')) else 0,
                            'max_players': int(game.get('Max Players', 0)) if pd.notna(game.get('Max Players')) else 0,
                            'play_time': int(game.get('Play Time', 0)) if pd.notna(game.get('Play Time')) else 0,
                            'min_age': int(game.get('Min Age', 0)) if pd.notna(game.get('Min Age')) else 0,
                            'complexity': float(game.get('Complexity', 0)) if pd.notna(
                                game.get('Complexity')) else 0,
                            'mechanics': game.get('Mechanics', []),
                            'domains': game.get('Domains', []),
                            'users_rated': int(game.get('Users Rated', 0)) if pd.notna(game.get('Users Rated')) else 0
                        }
                        recommendations.append(rec)

            logger.info(f"生成了 {len(recommendations)} 个推荐结果")
            return recommendations

        except Exception as e:
            logger.error(f"获取推荐时出错: {e}")
            return []

    def get_top_rated_games(self, N: int = 4) -> List[Dict[str, Any]]:
        """获取高评分游戏"""
        try:
            # 过滤条件：评分>=7.5，评分人数>=1000
            high_rated = self.df[
                (self.df['Rating Average'] >= 7.5) &
                (self.df['Users Rated'] >= 1000)
                ].copy()

            # 按评分排序
            high_rated = high_rated.sort_values('Rating Average', ascending=False)

            recommendations = []
            for _, game in high_rated.head(N).iterrows():
                rec = {
                    'id': int(game.name),
                    'name': str(game['Name']),
                    'rating': float(game['Rating Average']),
                    'year': int(game.get('Year Published', 0)) if pd.notna(game.get('Year Published')) else 0,
                    'users_rated': int(game.get('Users Rated', 0)) if pd.notna(game.get('Users Rated')) else 0
                }
                recommendations.append(rec)

            return recommendations

        except Exception as e:
            logger.error(f"获取高评分游戏时出错: {e}")
            return []

    def get_newest_games(self, N: int = 4) -> List[Dict[str, Any]]:
        """获取最新游戏"""
        try:
            # 按年份排序，取最新的
            newest = self.df[self.df['Year Published'] >= 2015].copy()
            newest = newest.sort_values('Year Published', ascending=False)

            recommendations = []
            for _, game in newest.head(N).iterrows():
                rec = {
                    'id': int(game.name),
                    'name': str(game['Name']),
                    'rating': float(game.get('Rating Average', 0)),
                    'year': int(game.get('Year Published', 0)) if pd.notna(game.get('Year Published')) else 0,
                    'users_rated': int(game.get('Users Rated', 0)) if pd.notna(game.get('Users Rated')) else 0
                }
                recommendations.append(rec)

            return recommendations

        except Exception as e:
            logger.error(f"获取最新游戏时出错: {e}")
            return []


class BGGImageService:
    """BGG图片服务 - 优化版"""

    def __init__(self):
        self.base_url = "https://boardgamegeek.com/xmlapi2"
        self.session = requests.Session()
        self.session.headers.update({
            'User-Agent': 'BoardGameRecommendationSystem/1.0'
        })
        self.image_cache = {}  # 添加简单缓存

    def get_game_image_url(self, game_id: int, retries: int = 3) -> Optional[str]:
        """获取游戏图片URL - 优化版"""

        # 检查缓存
        if game_id in self.image_cache:
            return self.image_cache[game_id]

        try:
            url = f"{self.base_url}/thing?id={game_id}&type=boardgame"

            for attempt in range(retries):
                try:
                    response = self.session.get(url, timeout=10)

                    if response.status_code == 200:
                        # 解析XML响应获取图片URL
                        import xml.etree.ElementTree as ET
                        root = ET.fromstring(response.content)

                        item = root.find('.//item')
                        if item is not None:
                            image = item.find('image')
                            if image is not None and image.text:
                                image_url = image.text.strip()

                                # 验证URL格式
                                if image_url.startswith('http') and (
                                        'geekdo-images.com' in image_url or 'boardgamegeek.com' in image_url):
                                    # 缓存结果
                                    self.image_cache[game_id] = image_url
                                    logger.info(f"成功获取游戏 {game_id} 的图片URL: {image_url}")
                                    return image_url

                    # BGG API有时返回202，需要等待
                    if response.status_code == 202:
                        logger.info(f"BGG API返回202，等待处理游戏 {game_id}")
                        time.sleep(2)
                        continue

                except requests.RequestException as e:
                    logger.warning(f"请求游戏 {game_id} 图片时出错 (尝试 {attempt + 1}): {e}")

                # 如果失败，等待后重试
                if attempt < retries - 1:
                    time.sleep(1)

            logger.warning(f"无法获取游戏 {game_id} 的图片URL")
            # 缓存空结果避免重复请求
            self.image_cache[game_id] = None
            return None

        except Exception as e:
            logger.error(f"获取BGG图片时出错: {e}")
            return None

    def get_multiple_image_urls(self, game_ids: List[int], max_concurrent: int = 3) -> Dict[int, str]:
        """批量获取游戏图片URL - 优化版"""
        results = {}

        # 分批处理，避免过于频繁的请求
        for i in range(0, len(game_ids), max_concurrent):
            batch = game_ids[i:i + max_concurrent]

            for game_id in batch:
                image_url = self.get_game_image_url(game_id)
                if image_url:
                    results[game_id] = image_url
                time.sleep(0.5)  # 避免请求过于频繁

            # 批次间等待
            if i + max_concurrent < len(game_ids):
                time.sleep(1)

        return results

    def preload_popular_games(self):
        """预加载热门游戏图片"""
        popular_game_ids = [
            174430,  # Gloomhaven
            167791,  # Terraforming Mars
            161936,  # Pandemic Legacy
            169786,  # Scythe
            120677,  # Terra Mystica
            31260,  # Agricola
        ]

        logger.info("开始预加载热门游戏图片...")
        self.get_multiple_image_urls(popular_game_ids)
        logger.info(f"预加载完成，缓存了 {len([v for v in self.image_cache.values() if v])} 个图片URL")


# 示例使用
# 在enhanced_recommendation.py的 if __name__ == "__main__": 部分修改为：

if __name__ == "__main__":
    # 设置日志
    logging.basicConfig(level=logging.INFO)

    # 创建推荐系统实例
    recommender = EnhancedRecommendationSystem()

    try:
        # 加载数据
        recommender.load_and_preprocess_data('data/BGG_Data_Set.csv')

        # 创建图片服务并预加载热门游戏
        image_service = BGGImageService()
        image_service.preload_popular_games()

        # 测试推荐
        test_preferences = {
            'selectedGames': ['Gloomhaven', 'Pandemic'],
            'selectedMechanics': ['strategy', 'cooperation'],
            'selectedDomains': ['Strategy Games', 'Thematic Games'],
            'gameSettings': {
                'players': '2-4',
                'time': '90',
                'age': '12',
                'complexity': '2.5'
            }
        }

        recommendations = recommender.get_enhanced_recommendations(test_preferences, N=12)

        print("推荐结果:")
        for i, rec in enumerate(recommendations):
            print(f"{i + 1}. {rec['name']} - 匹配度: {rec['match_score']}%, 评分: {rec['rating']}")

        # 测试图片加载
        if recommendations:
            sample_ids = [rec['id'] for rec in recommendations[:3]]
            print(f"\n测试加载前3个游戏的图片...")
            images = image_service.get_multiple_image_urls(sample_ids)
            for game_id, image_url in images.items():
                print(f"游戏 {game_id}: {image_url}")

    except Exception as e:
        print(f"测试失败: {e}")