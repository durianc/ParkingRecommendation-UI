<script setup>
	// <script setup> 中不需要直接引入组件，路由管理会自动加载组件
</script>

<template>
	<div id="app">
		<!-- 导航链接 -->
		<nav>
			<router-link to="/">首页</router-link>
			<router-link to="/user-preferences">用户偏好设置</router-link>
			<router-link to="/parking-recommendations">获取推荐结果</router-link>
			<router-link to="/driving-route-planner">驾车路径规划</router-link>
		</nav>

		<!-- 动态渲染内容 -->
		<router-view />
	</div>
</template>

<style>
	:root {
	  --primary-color: #4CAF50; /* 主颜色：绿色 */
	  --secondary-color: #ffffff; /* 次颜色：白色 */
	  --accent-color: #f0f0f0; /* 点缀颜色 */
	  --text-color: #333333; /* 文本颜色 */
	}
	#app {
		font-family: Avenir, Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		text-align: center;
		margin-top: 20px;
		/* 删除 color 设置，避免影响全局 */
	}

	nav {
		margin-bottom: 20px;
	}

	nav a {
		margin: 0 15px;
		text-decoration: none;
		/* 更精确地限定样式范围 */
		color: var(--primary-color, #42b983);
	}

	nav a.router-link-exact-active {
		font-weight: bold;
		color: var(--text-color, #35495e);
	}
	

</style>