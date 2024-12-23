<script setup lang="ts">
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { getTypeList } from '@/apis/type';
import TypeClubView from '@/components/TypeClubViews';
import { useRouter } from 'vue-router';


const typeList = ref([]);

// 模拟从后端异步请求数据
const fetchTypeList = async () => {
  try {
    // 假设这是从后端获取数据的 API 调用
    const result = await getTypeList();
    typeList.value = result.data; // 将获取的数据赋值给 tags 响应式数据
    console.log(typeList);
    if (result.code != 0) {
      console.log("Backend Error!")
    }
  } catch (error) {
    console.error('请求getTypeList失败:', error);
  }
};

// 在组件挂载时请求数据
onMounted(fetchTypeList);

const emits = defineEmits(["change-active-name", "getTypeId"]);

const toTypeClub = (id) => {
  emits("change-active-name", "club");
  emits("getTypeId", id);
}

</script>

<template>
  <div class="type-tag-container">
    <div
      v-for="tag in typeList"
      :key="tag.id"
      class="type-tag"
      name="tag.name"
      @click="toTypeClub(tag.id)"
    >
      {{ tag.name }}
    </div>
  </div>
</template>

<style>
.type-tag-container {
  display: flex;
  flex-wrap: wrap;
  gap: 32px; 
  padding: 20px;
  margin: 2px 560px;
  justify-content: space-around
}

.type-tag {
  flex-basis: 22%;
  background: linear-gradient(45deg, #f1a4a6, #ca9bc7, #6559a8, #7821e1); 
  color: #ebe5f7; 
  padding: 8px 16px; 
  border-radius: 8px; 
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px; 
  font-family: 'Arial', sans-serif; 
  font-weight: bold;
  /* width: 180px;  */
  height: 88px; 
  box-sizing: border-box;
  transition: transform 0.3s; 
}

.type-tag:hover {
  transform: scale(1.1); 
  color: #8226f1;
}
</style>
