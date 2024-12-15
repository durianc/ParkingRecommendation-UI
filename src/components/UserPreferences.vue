<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-8 col-lg-8 col-xl-6"> <!-- 更宽的卡片布局 -->
        <div class="card shadow-sm p-4">
          <h1 class="text-center mb-4">用户偏好信息</h1>

          <div class="mb-4 d-flex align-items-center">
            <label for="userId" class="form-label me-2">ID:</label>
            <div class="input-group">
              <input
                type="text"
                id="userId"
                class="form-control"
                v-model="userIdString"
                placeholder="请输入用户ID"
              />
              <button @click="fetchUserPreferences" class="btn btn-primary ms-2">获取用户信息</button>
            </div>
          </div>

          <form v-if="userExists" @submit.prevent="submitPreferences">
            <div class="row mb-3">
              <div class="col-md-6">
                <label for="preferredParkingTypes" class="form-label">停车场类型偏好:</label>
                <select
                  id="preferredParkingTypes"
                  class="form-select"
                  v-model="preferences.preferred_parking_types"
                >
                  <option value="商场">商场</option>
                  <option value="地面停车场">地面停车场</option>
                  <option value="地下停车场">地下停车场</option>
                  <option value="交通枢纽">交通枢纽</option>
                </select>
              </div>
              <div class="col-md-6">
                <label for="maxParkingFee" class="form-label">最大停车费用 (CNY/hour):</label>
                <select 
                  id="maxParkingFee"
                  class="form-select"
                  v-model="preferences.max_parking_fee"
                >
                  <option disabled value="">请选择费用</option>
                  <option value="10">10</option>
                  <option value="20">20</option>
                  <option value="30">30</option>
                  <option value="40">40</option>
                </select>
              </div>
            </div>

            <div class="row mb-3">
              <div class="col-md-6">
                <label for="preferredParkingDifficulty" class="form-label">停车难度偏好:</label>
                <select
                  id="preferredParkingDifficulty"
                  class="form-select"
                  v-model="preferences.preferred_parking_difficulty"
                >
                  <option value="容易">容易</option>
                  <option value="中等">中等</option>
                  <option value="困难">困难</option>
                </select>
              </div>
              <div class="col-md-6">
                <label for="maxWalkingDistance" class="form-label">最大步行距离 (米):</label>
                <select 
                  id="maxWalkingDistance"
                  class="form-select"
                  v-model="preferences.max_walking_distance"
                >
                  <option disabled value="">请选择距离</option>
                  <option value="100">100</option>
                  <option value="200">200</option>
                  <option value="300">300</option>
                  <option value="400">400</option>
                </select>
              </div>
            </div>

            <div class="row mb-3">
              <div class="col-md-12">
                <label for="maxDrivingDistance" class="form-label">最大驾车距离 (米):</label>
                <select 
                  id="maxDrivingDistance"
                  class="form-select"
                  v-model="preferences.max_driving_distance"
                >
                  <option disabled value="">请选择距离</option>
                  <option value="500">500</option>
                  <option value="1000">1000</option>
                  <option value="1500">1500</option>
                  <option value="2000">2000</option>
                </select>
              </div>
            </div>

            <button type="submit" class="btn btn-success">提交偏好信息</button>
            <button @click="goToNextPage" :disabled="!isFormComplete" class="btn btn-primary ms-2">下一步</button>
          </form>

          <div v-if="errorMessage" class="alert alert-danger mt-3">
            {{ errorMessage }}
          </div>

          <div v-if="successMessage" class="alert alert-success mt-3">
            {{ successMessage }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from "vue";
import axios from "axios";

export default {
  setup() {
    const userIdString = ref("");
    const userExists = ref(false);
    const successMessage = ref("");
    const errorMessage = ref("");

    const preferences = ref({
      preferred_parking_types: [],
      max_parking_fee: null,
      preferred_parking_difficulty: null,
      max_walking_distance: null,
      max_driving_distance: null,
    });

    const isFormComplete = computed(() => {
      const { preferred_parking_types, max_parking_fee, preferred_parking_difficulty, max_walking_distance, max_driving_distance } = preferences.value;
      return (
        preferred_parking_types.length > 0 &&
        max_parking_fee !== null &&
        preferred_parking_difficulty !== null &&
        max_walking_distance !== null &&
        max_driving_distance !== null
      );
    });

    const fetchUserPreferences = async () => {
      const userId = parseInt(userIdString.value);
      if (isNaN(userId)) {
        errorMessage.value = "请输入有效的用户ID";
        return;
      }

      errorMessage.value = "";
      successMessage.value = "";
      userExists.value = false;

      try {
        const response = await axios.get(`/user/${userId}`);
        preferences.value = response.data;
        userExists.value = true;
      } catch (error) {
        errorMessage.value = error.response ? error.response.data.detail : "无法获取用户信息";
      }
    };

    const submitPreferences = async () => {
      errorMessage.value = "";
      successMessage.value = "";

      const userId = parseInt(userIdString.value);

      try {
        const response = await axios.put(`/user/${userId}`, preferences.value);
        successMessage.value = response.data.msg;
      } catch (error) {
        errorMessage.value = error.response ? error.response.data.detail : "提交偏好信息失败";
      }
    };

    const goToNextPage = () => {
      if (isFormComplete.value) {
        const userId = parseInt(userIdString.value);
        window.location.href = `/parking-recommendations?userId=${userId}`;  // 将 userId 作为查询参数传递
      }
    };


    return {
      userIdString,
      preferences,
      userExists,
      successMessage,
      errorMessage,
      isFormComplete,
      fetchUserPreferences,
      submitPreferences,
      goToNextPage,
    };
  },
};
</script>

<style>
/* 让表单元素宽度适中，不能过宽 */
.form-control, .form-select {
  max-width: 100%;
  width: 100%;      /* 确保宽度填满父容器 */
  margin-bottom: 15px; /* 增加底部间距 */
}

.card {
  margin-top: 20px;
}

/* 响应式字体大小和按钮调整 */
@media (max-width: 768px) {
  .form-label, .btn {
    font-size: 14px;
  }
}

@media (min-width: 769px) {
  .form-label, .btn {
    font-size: 16px;
  }
}

</style>
