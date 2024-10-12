// src/router.js
import { createRouter, createWebHistory } from 'vue-router';
import DrivingRoutePlanner from './components/DrivingRoutePlanner.vue';
import UserPreferences from './components/UserPreferences.vue';
import Home from './components/Home.vue';
const routes = [
  {
    path: '/', // 默认首页
    name: 'Home',
    component: Home,
  },
  {
    path: '/user-preferences', // 用户偏好页面
    name: 'UserPreferences',
    component: UserPreferences,
  },
  {
    path: '/driving-route-planner', // 驾车路径规划页面
    name: 'DrivingRoutePlanner',
    component: DrivingRoutePlanner,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
