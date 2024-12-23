<script setup lang="ts">
import { ref, onMounted, inject, watch } from 'vue';
import axios from 'axios';
import { getClubPage, countClub } from '@/apis/club.ts'

const currentPage4 = ref(1);
const pageSize4 = ref(20);
const totalCount = ref(0);
const clubList = ref([]);
const size = ref('default');
const disabled = ref(false);
const background = ref(true);

const handleSizeChange = (newSize) => {
  pageSize4.value = newSize;
  fetchClubData(currentPage4.value, newSize, typeId.value);
};

const handleCurrentChange = (newPage) => {
  currentPage4.value = newPage;
  fetchClubData(newPage, pageSize4.value, typeId.value);
};

const typeId = inject('typeId');

const fetchClubData = async (page, size, typeId) => {
  try {
    console.log("get new page ", page, size, typeId);
    const result = await getClubPage({
      pageNum: page,
      pageSize: size,
      typeId: typeId,
    });
    clubList.value = result.data.records;
    const countResult = await countClub();
    totalCount.value = countResult.data;
  } catch (error) {
    console.error('获取Club数据出错:', error);
  }
};

const rateIconColor = ['#ca9bc7', '#7821e1', '#4a049f'];

watch(typeId, (newTypeId, oldTypeId) => {
  console.log(newTypeId, oldTypeId);
  fetchClubData(currentPage4.value, pageSize4.value, newTypeId);
}, { immediate: true });

</script>

<template>
    <div class="page-box">
      <div class="clubs">
        <div v-for="(club, index) in clubList" :key="index" class="club-item">
          <img :src="club.image" alt="Club Cover" class="club-cover"> 
          <div class="club-info">
            <h3>{{ club.name }}</h3>
            <p>地址: {{ club.location }}</p> 
            <el-rate
              v-model="club.rating"
              disabled
              show-score
              :colors="rateIconColor"
              text-color="#7821e1"
              score-template="{value}分"
            />
          </div>
        </div>
      </div>
      <div class="pagination">
        <el-pagination
          v-model:current-page="currentPage4"
          v-model:page-size="pageSize4"
          :page-sizes="[20, 30, 40]"
          :size="size"
          :disabled="disabled"
          :background="background"
          layout="total, sizes, prev, pager, next, jumper"
          :total="totalCount" 
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </div>
  </template>

<style>
.page-box {
  display: flex;
  flex-direction: column;
  align-items: center; /* 水平居中 */
  margin: 10px; /* 根据需要调整外边距 */
}

.club-item {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  padding: 10px;
  height: 160px;
  width: 1200px;
  background: linear-gradient(45deg, #f1a4a6, #ca9bc7, #6559a8, #7821e1); 
  border-radius: 10px; /* 设置圆角 */
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2); /* 添加轻微的阴影效果 */
}

.club-cover {
  width: 120px;
  height: 120px;
  margin-right: 24px;
  margin-left: 24px;
  vertical-align: middle;
  border: 1px solid #ccc; /* 浅色边框 */
  border-radius: 5px; /* 图片边框圆角 */
  overflow: hidden; /* 确保图片在边框内 */
}

.club-cover img {
  width: 100%;
  height: 100%;
  object-fit: cover; /* 保证图片不失真 */
}

.club-info {
  font-family: "Arial", sans-serif; 
  font-weight: bold; 
  width: 960px;
  height: 120px;
  border-radius: 5px; 
  padding: 5px 10px; 
  background-color: rgba(255, 255, 255, 0.2); 
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
}

.club-info h3 {
  margin: 0;
  font-size: 28px;
  color: #fff; /* 文字颜色鲜明 */
}

.club-info p {
  margin: 5px 0;
  font-size: 20px;
  color: #f2f3b9;
}


</style>
