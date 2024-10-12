<template>
  <div class="container mt-5">
    <h1 class="text-center mb-4">用户偏好信息</h1>

    <!-- 使用 Bootstrap 栅格系统限制表单宽度 -->
    <div class="row justify-content-center">
      <div class="col-md-6 col-lg-5"> <!-- 限制表单的宽度到中等屏幕以上时占据6/12或5/12 -->
        <!-- 用户输入ID -->
        <div class="mb-4">
          <label for="userId" class="form-label">用户ID:</label>
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

        <!-- 偏好表单 -->
        <form v-if="userExists" @submit.prevent="submitPreferences">
          <div class="mb-3">
            <label for="preferredParkingTypes" class="form-label">停车场类型偏好:</label>
            <select
              id="preferredParkingTypes"
              class="form-select"
              v-model="preferences.preferred_parking_types"
              multiple
            >
              <option value="商场">商场</option>
              <option value="地面停车场">地面停车场</option>
              <option value="地下停车场">地下停车场</option>
              <option value="交通枢纽">交通枢纽</option>
            </select>
          </div>

          <div class="mb-3">
            <label for="maxParkingFee" class="form-label">最大停车费用 (CNY/hour):</label>
            <input
              type="number"
              id="maxParkingFee"
              class="form-control"
              v-model="preferences.max_parking_fee"
              placeholder="请输入最大停车费"
            />
          </div>

          <div class="mb-3">
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

          <div class="mb-3">
            <label for="maxWalkingDistance" class="form-label">最大步行距离 (米):</label>
            <input
              type="number"
              id="maxWalkingDistance"
              class="form-control"
              v-model="preferences.max_walking_distance"
              placeholder="请输入最大步行距离"
            />
          </div>

          <div class="mb-3">
            <label for="maxDrivingDistance" class="form-label">最大驾车距离 (米):</label>
            <input
              type="number"
              id="maxDrivingDistance"
              class="form-control"
              v-model="preferences.max_driving_distance"
              placeholder="请输入最大驾车距离"
            />
          </div>

          <button type="submit" class="btn btn-success">提交偏好信息</button>
          <button @click="goToNextPage" :disabled="!isFormComplete" class="btn btn-primary ms-2">下一步</button>
        </form>

        <!-- 错误信息 -->
        <div v-if="errorMessage" class="alert alert-danger mt-3">
          {{ errorMessage }}
        </div>

        <!-- 成功提示 -->
        <div v-if="successMessage" class="alert alert-success mt-3">
          {{ successMessage }}
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
    const userIdString = ref(""); // 用户输入的ID (字符串形式)
    const userExists = ref(false); // 用户是否存在
    const successMessage = ref(""); // 成功提示信息
    const errorMessage = ref(""); // 错误提示信息

    const preferences = ref({
      preferred_parking_types: [], // 用户偏好停车场类型列表
      max_parking_fee: null, // 最大停车费用
      preferred_parking_difficulty: null, // 用户偏好停车难度
      max_walking_distance: null, // 最大步行距离
      max_driving_distance: null, // 最大驾车距离
    });

    const isFormComplete = computed(() => {
      const {
        preferred_parking_types,
        max_parking_fee,
        preferred_parking_difficulty,
        max_walking_distance,
        max_driving_distance,
      } = preferences.value;

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
        errorMessage.value = error.response
          ? error.response.data.detail
          : "无法获取用户信息";
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
        errorMessage.value = error.response
          ? error.response.data.detail
          : "提交偏好信息失败";
      }
    };

    const goToNextPage = () => {
      if (isFormComplete.value) {
        window.location.href = "/recommendation_results";
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
.form-control,
.form-select {
  max-width: 100%;
}

</style>
