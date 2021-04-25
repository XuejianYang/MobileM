<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center"> 购物街</div>
    </nav-bar>
    <scroll class="content" ref="scroll"
            :probe-type=" 3"
            @scroll="contentScroll"
            :pull-up-load="true"
            @pullingUp="loadMore">   <!--子组件是驼峰probeType这里要用probe-type -->
      <home-swiper :banners="banners"></home-swiper>
      <recommend-view :recommends="recommends"></recommend-view>
      <feature-view></feature-view>
      <tab-control class="tab-control" :titles="['流行','新款','精选']"
                   @tabClick="tabClick"></tab-control>
      <good-list :goods="goods[currentType].list"></good-list>
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>

  </div>

</template>

<script>

import HomeSwiper from "./childComps/HomeSwiper";
import RecommendView from "./childComps/RecommendView";
import FeatureView from "./childComps/FeatureView";

import NavBar from "../../components/common/navbar/NavBar";
import TabControl from "../../components/content/tabControl/TabControl";
import GoodList from "../../components/content/goods/GoodList";

import {getHomeMultidata, getHomeGoods} from "../../network/home";
import Scroll from "../../components/common/scroll/Scroll";  //defult导出才能删除大括号
import BackTop from "../../components/content/backTop/BackTop";
// import Swiper from "../../components/common/swiper/Swiper";
// import SwiperItem from "../../components/common/swiper/SwiperItem";

export default {
  name: "Home",
  components: {
    Scroll,
    NavBar,
    HomeSwiper,
    RecommendView,
    FeatureView,
    TabControl,
    GoodList,
    BackTop
  },
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        'pop': {page: 0, list: []},  //goods相当于一个map集合 pop是key
        'new': {page: 0, list: []},
        'sell': {page: 0, list: []},
      },
      currentType: 'new',
      page: 1,
      isShowBackTop:false
    }
  },
  created() {
    //请求多个数据
    this.getHomeMultidata();
//请求主页数据'流行','新款','精选'
    this.getHomeGoods();

  },
  methods: {
    /**
     * 事件监听方法
     */
    tabClick(index) {
      console.log(index);
      switch (index) {
        case 0:
          this.currentType = 'pop'
          break
        case 1:
          this.currentType = 'new'
          break
        case 2:
          this.currentType = 'sell'
          break
      }
      // this.page=this.index+10;
      this.getHomeGoods();
    },
    backClick() {
      this.$refs.scroll.scroll.scrollTo(0, 0, 500);

    },
    contentScroll(position){
      // console.log(position)
      this.isShowBackTop=(-position.y)>500

    },
    loadMore(){
      this.getHomeGoods(this.currentType)
    },
    /**
     * 网络请求方法
     */
    getHomeMultidata() {
      getHomeMultidata().then(res => {
        // console.log(res.content[0].pict_url)
        // console.log(res.content)
        this.banners = res.content;
        this.recommends = res.content;
      })
    },

    getHomeGoods() {
      // getHomeGoods(type) {
       const page=this.goods[this.currentType].page+1
      getHomeGoods(page*10,2).then(res => {
        // console.log(res.content[0])
        //把后端数据赋值给goods
        this.goods[this.currentType].list.push(...res.content);
        this.goods[this.currentType].page += 1;
        console.log(this.goods[this.currentType].list)
      })
    }
  }
}
</script>

<style scoped>
#home {
  padding-top: 44px;
  height: 100vh;
  position: relative;
}

.home-nav {
  background-color: var(--color-tint);
  color: #ffffff;

  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 9;
}

/*<!-- 滚动悬浮-->*/
.tab-control {
  position: sticky;
  top: 44px;
  z-index: 9;
}

.content {
  /*height: 300px;*/
  overflow: hidden;

  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}
/*第二种方法*/
/*.content {*/
/*  height: calc(100% - 93px);*/
/*  overflow: hidden;*/
/*  margin-top: 44px;*/
/*}
*/
</style>
