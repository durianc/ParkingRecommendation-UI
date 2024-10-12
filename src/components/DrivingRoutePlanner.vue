<template>
  <div id="container">
    <!-- 高德地图容器 -->
    <div id="map"></div>

    <!-- 侧边栏 -->
    <div id="panel">
      <h3>驾车路线</h3>
      <div id="routeInfo">
        <p v-if="distance !== null">距离：{{ (distance / 1000).toFixed(2) }} 公里</p>
        <p v-if="timeInMinutes !== null">预计行驶时间：{{ timeInMinutes }} 分钟</p>
      </div>
      <button id="refresh" @click="refreshLocation">刷新定位</button>
      <button id="manualMark" @click="enableManualMark">手动选择位置</button>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, nextTick } from 'vue';

// 定义响应式变量
const map = ref(null);
const userPosition = ref(null);
const distance = ref(null);
const timeInMinutes = ref(null);
const parkingLotPosition = [119.198453, 26.056812]; // 假设这是停车场的经纬度
const manualMarkEnabled = ref(false); // 是否启用手动标点

// 定位成功回调
const onLocationSuccess = (result) => {
  userPosition.value = [result.position.lng, result.position.lat];
  console.log('当前位置:', userPosition.value);

  // 规划路线
  planRoute(parkingLotPosition);
};

// 定位失败回调
const onLocationError = (result) => {
  console.error('定位失败:', result.message);
  // 使用 IP 定位作为备用
  alert('无法获取当前位置，使用IP定位。');

  // 启用基于 IP 的定位
  AMap.plugin('AMap.CitySearch', () => {
    const citySearch = new AMap.CitySearch();
    citySearch.getLocalCity((status, result) => {
      if (status === 'complete' && result.info === 'OK' && result.bounds) {
        userPosition.value = result.bounds.getCenter();
        console.log('IP定位当前位置:', userPosition.value);

        // 规划路线
        planRoute(parkingLotPosition);
      } else {
        alert('IP定位失败，请尝试手动选择位置。');
      }
    });
  });
};

// 刷新定位
const refreshLocation = () => {
  AMap.plugin('AMap.Geolocation', function () {
    const geolocation = new AMap.Geolocation({
      enableHighAccuracy: true,
      timeout: 10000,
      showButton: true,
      buttonPosition: 'RB',
      buttonOffset: new AMap.Pixel(10, 20),
      zoomToAccuracy: true,
    });
    map.value.addControl(geolocation);

    geolocation.getCurrentPosition((status, result) => {
      if (status === 'complete') {
        onLocationSuccess(result);
      } else {
        onLocationError(result);
      }
    });
  });
};

// 规划驾车路线
const planRoute = (parkingLotPosition) => {
  AMap.plugin('AMap.Driving', () => {
    const driving = new AMap.Driving({
      map: map.value,
      panel: 'panel', // 将详细路线信息展示在侧边栏
    });

    // 驾车路线搜索
    driving.search(userPosition.value, parkingLotPosition, (status, result) => {
      if (status === 'complete' && result.routes && result.routes.length) {
        const route = result.routes[0];
        distance.value = route.distance;
        timeInMinutes.value = Math.ceil(route.time / 60); // 时间转换为分钟
      } else {
        alert('驾车路线规划失败，请检查目的地是否正确。');
      }
    });
  });
};

// 启用手动标点功能
const enableManualMark = () => {
  manualMarkEnabled.value = true;
  alert('请点击地图以选择您的位置。');
};

// 地图点击事件，用于手动标点
const onMapClick = (e) => {
  if (manualMarkEnabled.value) {
    userPosition.value = [e.lnglat.getLng(), e.lnglat.getLat()];
    console.log('用户手动选择的位置:', userPosition.value);
    // 在地图上添加标记
    addMarker(userPosition.value);

    // 规划路线
    planRoute(parkingLotPosition);

    // 禁用手动标点
    manualMarkEnabled.value = false;
  }
};

// 在地图上添加标记
const addMarker = (position) => {
  new AMap.Marker({
    map: map.value,
    position,
  });
};

// 初始化地图并获取定位
onMounted(() => {
  nextTick(() => {
    map.value = new AMap.Map('map', {
      zoom: 12,
      resizeEnable: true,
    });

    // 初始化定位插件
    AMap.plugin('AMap.Geolocation', function () {
      const geolocation = new AMap.Geolocation({
        enableHighAccuracy: true,
        timeout: 10000,
        showButton: true,
        buttonPosition: 'RB',
        buttonOffset: new AMap.Pixel(10, 20),
        zoomToAccuracy: true,
      });
      map.value.addControl(geolocation);

      geolocation.getCurrentPosition((status, result) => {
        if (status === 'complete') {
          onLocationSuccess(result);
        } else {
          onLocationError(result);
        }
      });
    });

    // 添加地图点击事件
    map.value.on('click', onMapClick);
  });
});

</script>

<style scoped>
/* 确保 html 和 body 的高度是 100% */
html, body {
  margin: 0;
  padding: 0;
  height: 100%;
  font-family: Arial, sans-serif;
}

/* 确保容器的高度是 100% */
#container {
  display: flex;
  flex-direction: row; /* 横向排布地图和侧边栏 */
  height: 100vh;
  /* width: 100%; */
}

/* 地图部分占据页面大部分空间 */
#map {
  flex: 3;
  height: 100%; /* 确保地图全屏显示 */
}

/* 侧边栏样式 */
#panel {
  flex: 1;
  width: 300px;
  background-color: #fff;
  border-left: 1px solid #ccc;
  box-shadow: -3px 0 5px rgba(0, 0, 0, 0.1);
  padding: 10px;
  overflow-y: auto;
  position: relative; /* 为了定位刷新按钮 */
}

#panel h3 {
  margin-top: 0;
}

#routeInfo {
  margin-top: 2px;
}

/* 刷新按钮样式 */
#refresh, #manualMark {
  position: absolute;
  bottom: 10px;
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;
  font-size: 16px;
  border-radius: 4px;
  margin-top: 10px;
}

#refresh:hover, #manualMark:hover {
  background-color: #0056b3;
}
</style>
