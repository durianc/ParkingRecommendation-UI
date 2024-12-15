<template>
  <div class="home-page">
    <header class="header">
      <h1>基于神经协同过滤的停车位推荐方法</h1>
      <p>智能化、个性化的停车位推荐系统</p>
    </header>

    <section class="content-section">
      <div class="content-card">
        <h2>方法概述</h2>
        <p>
          本方法通过结合神经网络和协同过滤技术，针对停车位推荐问题提出了一种智能化、个性化的解决方案。利用用户偏好信息、位置信息，采用改进后的神经图匹配协同过滤（GMCF）算法，并结合Neo4j图数据库、qdrant向量数据库以及高德API，实现精准的推荐结果和前端可视化展示。
        </p>
      </div>

      <div class="content-card">
        <h2>方法优势</h2>
        <ul>
          <li>个性化推荐：基于改进的神经图匹配协同过滤方法，分析用户偏好，生成高度个性化的推荐结果。</li>
          <li>实时动态更新：采用Neo4j图数据库和qdrant技术，优化数据存储与检索效率。</li>
          <li>前端可视化：利用高德API进行推荐车位的可视化展示和驾车路径规划，用户可以直观地查看推荐停车位的位置及前往路线。</li>
        </ul>
      </div>

      <div class="content-card">
        <h2>应用场景</h2>
        <ul>
          <li>大城市或拥挤区域的停车位推荐。</li>
          <li>结合导航系统的智能停车推荐。</li>
          <li>为停车场提供智能化管理决策支持。</li>
        </ul>
      </div>
    </section>

    <!-- 项目成员 -->
    <section class="members-section">
      <h2>项目成员</h2>
      <div class="members-list">
        <div class="member-card leader-card">
          <strong>陈威宇</strong> <!-- 只展示名字 -->
        </div>
        <div class="member-card">张铭心</div>
        <div class="member-card">肖晗涵</div>
        <div class="member-card">洪巧君</div>
        <div class="member-card">梅明胜</div>
      </div>
    </section>

    <!-- 指导老师 -->
    <section class="teacher-section">
      <h2>指导老师</h2>
      <div class="members-list">
        <div class="member-card teacher-card">
          <strong>廖龙龙</strong> <!-- 只展示名字 -->
        </div>
      </div>
    </section>
  </div>
</template>

<script>
	export default {
		name: 'HomePage',
	};
</script>

<style scoped>
	/* 基础页面样式 */
	* {
	  box-sizing: border-box;
	  margin: 0;
	  padding: 0;
	}
	
	body {
	  font-family: 'Roboto', sans-serif;
	}
	
	.home-page {
	  display: flex;
	  flex-direction: column;
	  align-items: center;
	  padding: 20px;
	  background: linear-gradient(135deg, #e0f7fa, #f1f8e9);
	  min-height: 100vh;
	}
	
	/* 顶部标题样式 */
	.header {
	  text-align: center;
	  margin-bottom: 40px;
	}
	
	.header h1 {
	  font-size: 36px;
	  color: #2c3e50;
	  margin-bottom: 10px;
	}
	
	.header p {
	  font-size: 18px;
	  color: #7f8c8d;
	}
	
	/* 内容卡片布局 */
	.content-section {
	  display: grid;
	  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
	  gap: 20px;
	  width: 100%;
	  max-width: 1200px;
	  margin-bottom: 40px;
	}
	
	.content-card {
	  background-color: #ffffff;
	  border-radius: 10px;
	  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
	  padding: 20px;
	  transition: transform 0.3s ease;
	  text-align: left;
	}
	
	.content-card:hover {
	  transform: translateY(-5px);
	}
	
	.content-card h2 {
	  font-size: 24px;
	  color: #34495e;
	  margin-bottom: 10px;
	}
	
	.content-card p, .content-card ul {
	  font-size: 16px;
	  color: #7f8c8d;
	  line-height: 1.6;
	}
	
	ul {
	  list-style-type: circle;
	  margin-left: 20px;
	}
	
	/* 项目成员部分 */
	.members-section,
	.teacher-section {
	  text-align: center;
	  margin-top: 40px;
	}
	
	.members-section h2,
	.teacher-section h2 {
	  font-size: 28px;
	  color: #2c3e50;
	  margin-bottom: 20px;
	}
	
	.members-list {
	  display: flex;
	  justify-content: center;
	  gap: 15px;
	  flex-wrap: wrap;
	}
	
	/* 成员卡片样式 */
	.member-card {
	  background-color: #ecf0f1;
	  border-radius: 10px;
	  padding: 15px 20px;
	  font-size: 18px;
	  color: #34495e;
	  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
	  width: 160px;
	  text-align: center; /* 改为居中对齐 */
	  display: flex;
	  align-items: center;
	  justify-content: center;
	  transition: background-color 0.3s ease;
	}
	
	.member-card:hover {
	  background-color: #bdc3c7;
	}
	
	/* 组长卡片样式 */
	.leader-card {
	  background-color: #00aaff;
	  color: #fff;
	  font-weight: bold;
	}
	
	/* 指导老师卡片样式 */
	.teacher-card {
	  background-color: #f39c12;  /* 橙色突出指导老师 */
	  color: #fff;
	  font-weight: bold;
	  text-align: center;
	}

</style>