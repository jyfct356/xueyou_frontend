<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import HomeView from '@/components/HomeView.vue'
import ClubView from '@/components/ClubView.vue'
import ClubInfoView from '@/components/ClubInfoView.vue'
import UserView from '@/components/UserView.vue'
import ActivityView from '@/components/ActivityView.vue'
import GroupView from '@/components/GroupView.vue'
import VoucherView from '@/components/VoucherView.vue'


import { ref, provide } from 'vue'
import type { TabsPaneContext } from 'element-plus'

const activeName = ref("home")

const handleClick = (tab: TabsPaneContext, event: Event) => {
  console.log(tab, event)
}

const activeClubId = ref(0);

const changeActiveName = (newActiveName) => {
  activeName.value = newActiveName;
}

const typeId = ref(null);

const getTypeId = (id) => {
  typeId.value = id;
  console.log(id);
}

provide('typeId', typeId);


</script>

<template>
  <div class="outer-box">
    <el-container class="container">
      <el-header class="header">
        <div class="logo">
          <span class="logo-color logo-title-font">学游</span>
          <span class="logo-color logo-slogen-font">学在南大，玩在学游！</span>
        </div>
      </el-header>

      <el-main class="main">
        <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
          <el-tab-pane label="首页" name="home">
            <HomeView 
            @change-active-name="changeActiveName"
            @get-type-id="getTypeId"
            />
          </el-tab-pane>
          <el-tab-pane label="俱乐部" name="club">
            <ClubView

            />
          </el-tab-pane>
          <el-tab-pane label="优惠" name="voucher"><VoucherView/></el-tab-pane>
          <el-tab-pane label="活动" name="activity"><ActivityView/></el-tab-pane>
          <el-tab-pane label="正在拼" name="group"><GroupView/></el-tab-pane>
          <el-tab-pane label="详情页" name="clubInfo" v-if="activeClubId > 0"><ClubInfoView/></el-tab-pane>
          <el-tab-pane label="个人中心" name="user"><UserView/></el-tab-pane>
        </el-tabs>

      </el-main>
      
      <el-divider></el-divider>

      <el-footer class="copy">
        <div>
          <p>
            <el-text>服务条款</el-text>
            <el-text class="vertical-line">|</el-text>
            <el-text>隐私政策</el-text>
            <el-text class="vertical-line">|</el-text>
            <el-text>儿童隐私政策</el-text>
            <el-text class="vertical-line">|</el-text>
            <el-text>版权投诉</el-text>
            <el-text class="vertical-line">|</el-text>
            <el-text>投资者关系</el-text>
            <el-text class="vertical-line">|</el-text>
            <el-text>广告合作</el-text>
            <el-text class="vertical-line">|</el-text>
            <el-text>联系我们</el-text>
          </p>
          <p>
            <el-text>廉正举报</el-text>
            <el-text>不良信息举报邮箱: 51jubao@service.netease.com</el-text>
            <el-text>客服热线：95163298</el-text>
          </p>
          <p>
            <el-text>互联网宗教信息服务许可证：浙（2022）0000120</el-text>
            <el-text>增值电信业务经营许可证：浙B2-20150198</el-text>
            <el-text>粤B2-20090191-18&nbsp;&nbsp;工业和信息化部备案管理系统网站</el-text>
          </p>
          <p>
            <el-text>JTF版权所有©2002-2025</el-text>
            <el-text>JTF科技有限公司运营：</el-text>
            <el-text>浙网文[2025]</el-text>
            <el-text>浙公网安备</el-text>
            <el-text>算法服务公示信息</el-text>
          </p>
        </div>
      </el-footer>

    </el-container>
  </div>
</template>

<style scoped>
body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background-color: #f4f4f4;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.logo {
  text-align: center;
}

.logo-slogen-font {
  font-size: 24px;
  margin-left: 12px;
}

.logo-title-font {
  font-size: 72px;
}

/* 以下是一个可选的渐变效果 */
.logo-color {
  color: #333; /* 字体颜色 */
  font-weight: bold; /* 字体加粗 */
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2); /* 文字阴影 */
  letter-spacing: 1px; /* 字间距 */
  background: -webkit-linear-gradient(30deg, #800080, #b656b6, #ffc208, #c261d6, #ffc208);
  background: linear-gradient(30deg, #800080, #b656b6, #ffc208, #c261d6, #ffc208);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  font-weight: bold;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
  letter-spacing: 1px;
}

.vertical-line {
  margin-left: 5px;
  margin-right: 5px;
}

/* .container {
  margin: 40px 600px;
} */

.copy {
  text-align: center;
  height: 180px;
  background-color: #eeeef1;
}

.demo-tabs > .el-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}

.header {
  height: 90px;
}

.main {
  min-height: 1040px;
}


.el-divider {
  margin: 0 !important;
}

:deep(.el-tabs__nav-scroll) {
  display: flex;
  justify-content: space-around;
}

:deep(.el-tabs__item) {
  color: transparent; /* 使文本颜色透明以显示背景渐变 */
  background-image: linear-gradient(45deg, #e88a8d, #ca9bc7, #6559a8, #7821e1);; /* 设置渐变背景 */
  -webkit-background-clip: text;
  background-clip: text;
  font-weight: bold;
  font-size: 24px; /* 设置字体大小 */
  font-family: 'Arial'; /* 设置字体类型为艺术字，备用字体设置为 cursive */
}

.outer-box {
  background-color: #fbf6fb;
}


</style>
