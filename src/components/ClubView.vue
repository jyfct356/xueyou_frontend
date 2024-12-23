<script setup lang="ts">
import ClubPageView from '@/components/ClubPageView.vue'
import { ElInput, ElButton, ElSelect, ElOption } from 'element-plus';
import { ref, onMounted, inject } from 'vue';
import { getTypeList } from '@/apis/type.ts';

const searchQuery = ref('');
const selectedSort = ref(null);
const selectedDistance = ref(null);
const selectedRating = ref(null);

const handleSearch = () => {
  // 调用后端搜索 API
  console.log('搜索:', searchQuery.value);
};

const typeId = inject('typeId');

const handleTypeSort = (id) => {
  typeId.value = id;
};

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

const allType = "所有";

</script>

<template>
  <div class="club-view">
    <div class="option">

      <el-input
        placeholder="搜索店铺..."
        v-model="searchQuery"
        clearable
        class="search-input"
        @input="handleSearch"
      >
        <template #append>
          <el-button icon="el-icon-search" @click="handleSearch"></el-button>
        </template>
      </el-input>


      <div class="sort-options">
        <el-select v-model="selectedSort" placeholder="类型" @change="handleTypeSort">
          <el-option :label="allType" :value="null"></el-option>
          <el-option
            v-for="type in typeList"
            :key="type.id"
            :label="type.name"
            :value="type.id"
          ></el-option>
          
        </el-select>

        <el-select v-model="selectedDistance" placeholder="距离" @change="handleSort">
          <el-option label="最近" value="nearest"></el-option>
          <el-option label="次近" value="secondNearest"></el-option>
          <el-option label="最远" value="farthest"></el-option>
        </el-select>

        <el-select v-model="selectedRating" placeholder="评分" @change="handleSort">
          <el-option label="高评分" value="highRating"></el-option>
          <el-option label="中评分" value="mediumRating"></el-option>
          <el-option label="低评分" value="lowRating"></el-option>
        </el-select>
      </div>
    </div>

    <div class="page-view">
      <ClubPageView
      
      />
    </div>
  </div>
  
</template>

<style>
.club-view {
  display: flex;
  flex-direction: column;
  margin: 10px 320px;
  align-items: center;
  height: 100%;
}

.option {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.el-select {
  min-width: 100px; /* 或者你希望的任何宽度 */
}

.search-input {
  margin-right: 10px;
  width: 480px;
}

.sort-options {
  display: flex;
  gap: 10px;
}

.sort-item {
  display: flex;
  align-items: center;
}

.sort-label {
  margin-right: 8px;
  font-weight: bold;
}
</style>
