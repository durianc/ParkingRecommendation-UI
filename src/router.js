// src/router.js
import { createRouter, createWebHistory } from 'vue-router';
import Home from './components/Home.vue';
import UserPreferences from './components/UserPreferences.vue';
import DrivingRoutePlanner from './components/DrivingRoutePlanner.vue';
import ParkingRecommendations from './components/ParkingRecommend.vue'; // 引入停车位推荐组件

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
    path: '/parking-recommendations', // 停车位推荐页面
    name: 'ParkingRecommendations',
    component: ParkingRecommendations,
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
