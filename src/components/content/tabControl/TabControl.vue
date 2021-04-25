<template>
  <div class="tab-control">
    <div v-for="(item,index) in titles"
         class="tab-control-item"
         :class="{active:index===currentIndex}" @click=" itemClick(index)"> <!--每一个小东西都是item -->
      <span>{{ item }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "TabControl",
  props: {        //外传内
    titles: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      currentIndex: 0
    }
  },
  methods: {
    itemClick(index) {
      this.currentIndex = index;

      this.$emit('tabClick',index)
    }
  }
}
</script>

<style scoped>

.tab-control {
  display: flex;
  text-align: center;
  font-size: 15px;
  height: 40px;
  line-height: 40px;
  background-color: #ffffff;
}
.tab-control-item {
  flex: 1;
}
.active {
  color: var(--color-high-text);
}
.tab-control-item span {
  padding: 5px;
}
.active span {
  border-bottom: 3px solid var(--color-tint);
}
</style>
