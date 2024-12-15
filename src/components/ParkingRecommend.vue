<template>
	<div class="container">
		<h1>推荐的停车位</h1>
		<div v-if="loading" class="loading">
			加载中...
		</div>
		<div v-else-if="recommendations.length">
			<div class="cards-container">
				<div 
					class="card" 
					v-for="parking in recommendations" 
					:key="parking.id" 
					@click="showDetails(parking)"
					@mouseenter="hover = true" 
					@mouseleave="hover = false"
				>
					<h2>{{ parking.parking_type }}</h2>
					<p>距离：{{ parking.driving_distance }} 米</p>
					<p>费用：{{ parking.fee }} 元/小时</p>
				</div>
			</div>
		</div>
		<div v-else class="no-results">
			没有找到匹配的推荐结果。
		</div>

		<!-- 侧边栏 -->
		<transition name="slide">
			<div v-if="selectedParking" class="sidebar">
				<div class="sidebar-header">
					<h2>{{ selectedParking.parking_type }} - 详情</h2>
					<span class="close" @click="closeSidebar">&times;</span>
				</div>
				<div class="sidebar-content">
					<p><strong>费用：</strong>{{ selectedParking.fee }} 元/小时</p>
					<p><strong>距离：</strong>{{ selectedParking.driving_distance }} 米</p>
					<p><strong>发现时间：</strong>{{ selectedParking.found_time }}</p>
					<p><strong>停车场规模：</strong>{{ selectedParking.parking_space_size }}</p>
					<p><strong>近电梯：</strong>{{ selectedParking.near_elevator ? '是' : '否' }}</p>
					<p><strong>有监控：</strong>{{ selectedParking.has_surveillance ? '是' : '否' }}</p>
					<p><strong>经度：</strong>{{ selectedParking.longitude }}</p>
					<p><strong>纬度：</strong>{{ selectedParking.latitude }}</p>
					<p><strong>评分：</strong>{{ selectedParking.grade }}</p>
				</div>
			</div>
		</transition>
	</div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const recommendations = ref([]);
const loading = ref(true);
const selectedParking = ref(null);

const userId = new URLSearchParams(window.location.search).get('userId');
if (!userId) {
	alert('userId 参数缺失');
}

const fetchRecommendations = async () => {
	if (!userId) return;
	loading.value = true;
	try {
		const response = await axios.get(`/recommendations/${userId}`);
		recommendations.value = response.data;
	} catch (error) {
		console.error('获取推荐停车位失败:', error);
	} finally {
		loading.value = false;
	}
};

const showDetails = (parking) => {
	selectedParking.value = parking;
};

const closeSidebar = () => {
	selectedParking.value = null;
};

onMounted(fetchRecommendations);
</script>

<style scoped>
:root {
	--primary-color: #4CAF50;
	--secondary-color: #ffffff;
	--accent-color: #f0f0f0;
	--text-color: #333333;
	--hover-shadow: rgba(76, 175, 80, 0.2);
	--transition-duration: 0.3s;
}

.container {
	max-width: 1200px;
	margin: 0 auto;
	padding: 20px;
	font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
	color: var(--text-color);
}

h1 {
	text-align: center;
	color: var(--primary-color);
	margin-bottom: 30px;
}

.loading, .no-results {
	text-align: center;
	font-size: 1.2em;
	color: var(--text-color);
}

.cards-container {
	display: flex;
	flex-wrap: wrap;
	justify-content: space-around;
	gap: 20px;
}

.card {
	background-color: var(--secondary-color);
	border: 1px solid #ddd;
	border-radius: 10px;
	padding: 20px;
	width: 30%;
	box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
	transition: transform var(--transition-duration), box-shadow var(--transition-duration);
	cursor: pointer;
	position: relative;
	overflow: hidden;
}

.card:hover {
	transform: translateY(-5px);
	box-shadow: 0 4px 15px var(--hover-shadow);
}

.card h2 {
	color: var(--primary-color);
	margin-bottom: 10px;
}

.card p {
	margin: 5px 0;
}

.sidebar {
	position: fixed;
	top: 0;
	right: 0;
	width: 35%;
	height: 100%;
	background-color: var(--secondary-color);
	box-shadow: -2px 0 10px rgba(0, 0, 0, 0.1);
	z-index: 1000;
	padding: 30px;
	animation: slideIn 0.3s forwards;
}

.sidebar-header {
	display: flex;
	justify-content: space-between;
	align-items: center;
	border-bottom: 2px solid var(--primary-color);
	padding-bottom: 15px;
	margin-bottom: 20px;
}

.sidebar-header h2 {
	color: var(--primary-color);
}

.sidebar-content p {
	margin: 15px 0;
	line-height: 1.6;
}

.sidebar-content p strong {
	color: var(--primary-color);
}

.close {
	font-size: 28px;
	color: #888;
	cursor: pointer;
	transition: color var(--transition-duration);
}

.close:hover {
	color: var(--text-color);
}

@keyframes slideIn {
	from {
		transform: translateX(100%);
	}
	to {
		transform: translateX(0);
	}
}

@keyframes slideOut {
	from {
		transform: translateX(0);
	}
	to {
		transform: translateX(100%);
	}
}

.slide-enter-active, .slide-leave-active {
	transition: transform 0.3s ease;
}

.slide-enter-from {
	transform: translateX(100%);
}

.slide-enter-to {
	transform: translateX(0);
}

.slide-leave-from {
	transform: translateX(0);
}

.slide-leave-to {
	transform: translateX(100%);
}

/* 响应式设计 */
@media (max-width: 992px) {
	.card {
		width: 45%;
	}
}

@media (max-width: 600px) {
	.card {
		width: 100%;
	}
	
	.sidebar {
		width: 100%;
	}
}
</style>
