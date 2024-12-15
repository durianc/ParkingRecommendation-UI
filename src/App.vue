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
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 20px;
}

nav {
  margin-bottom: 20px;
}

nav a {
  margin: 0 15px;
  color: #42b983;
  text-decoration: none;
}

nav a.router-link-exact-active {
  font-weight: bold;
  color: #35495e;
}
</style>
