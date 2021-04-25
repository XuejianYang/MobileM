<template>
  <swiper>
    <swiper-item v-for="item in banners">
      <a :href="item.pict_url">
        <img class="imgs" :src="item.small_images" alt="">
      </a>
    </swiper-item>
  </swiper>
</template>

<script>
import {Swiper,SwiperItem}from "../../../components/common/swiper";
export default {
  name: "HomeSwiper",
  props:{
    banners:{
      type:Array,
      default(){
        return[]
      }
    }
  },
  components:{
    Swiper,
    SwiperItem
  }
}
</script>

<style scoped>

/*.as img{*/
/*  height:30%;*/
/*  !*height: 20%;*!*/
/*}*/

</style>
