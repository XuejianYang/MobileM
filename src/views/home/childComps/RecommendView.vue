<template>
  <div class="recommend">
    <div v-for="item in recommends" class="recommend-item">
      <a :href="item.item_url">
        <img :src="item.shopIcon" alt="">
        <div>{{item.category_name }}</div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: "RecommendView",
  props: {           //外传内
    recommends: {
      type: Array,
      default() {
        return [];
      }
    }
  }
}
</script>

<style scoped>
.recommend {
  display: flex;
  text-align: center;
  font-size: 12px;
  padding: 15px 0 30px;
  border-bottom: 8px solid #eee;
}

.recommend-item {
  flex: 1;
}
.recommend-item img{
  width: 65px;
  height: 65px;
  margin-bottom: 10px;
}
</style>
