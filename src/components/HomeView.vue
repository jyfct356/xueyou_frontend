<script setup lang="ts">
import { ref, onMounted } from 'vue';
import axios from 'axios';
// import getTypeList from '@/apis/type.ts';


const tags = ref([]);

// 模拟从后端异步请求数据
const fetchTags = async () => {
  try {
    // 假设这是从后端获取数据的 API 调用
    const response = await axios.get("/api/type/list");
    tags.value = response.data.data; // 将获取的数据赋值给 tags 响应式数据
    console.log(tags.value);
  } catch (error) {
    console.error('请求getTypeList失败:', error);
  }
};

// 在组件挂载时请求数据
onMounted(fetchTags);

</script>

<template>
  <div class="type-tag-container">
    <div v-for="tag in tags" :key="tag.id" class="type-tag" name="tag.name">{{ tag.name }}</div>
  </div>
</template>

<style>
.type-tag-container {
  display: flex;
  flex-wrap: wrap;
  gap: 20px; /* 标签之间的间距 */
  padding: 20px;
  justify-content: center
}

.type-tag {
  background: linear-gradient(45deg, #5913aa, #b87cfd, #f4eb46, #7b21e1); /* 紫金渐变背景 */
  color: #7316dd; /* 文字颜色 */
  padding: 8px 16px; /* 内边距 */
  border-radius: 8px; /* 圆角矩形效果 */
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px; /* 字体大小 */
  font-family: 'Arial', sans-serif; /* 确保字体的通用性 */
  font-weight: bold;
  width: 130px; /* 宽度 */
  height: 120px; /* 高度 */
  box-sizing: border-box; /* 盒模型 */
  transition: transform 0.3s; /* 鼠标悬浮效果 */
}

.type-tag:hover {
  transform: scale(1.1); /* 鼠标悬浮时放大 */
}
</style>
