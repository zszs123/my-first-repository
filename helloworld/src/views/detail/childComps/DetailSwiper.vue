<template>
  <div class="detail-swiper"> 
    <swiper class="det-swiper">
      <swiper-item v-for="item in topImages">
        <img :src="item" alt="">
      </swiper-item>
    </swiper>
  </div>
</template>

<script>
import { Swiper, SwiperItem } from 'components/common/swiper'
export default {
  name: 'DetailSwiper',
  props: {
    topImages: {
      type: Array,
      default: [],
    }
  },
  components: {
    Swiper,
    SwiperItem
  }
}
</script>

<style scoped>
.det-swiper {
  height: 300px;
  overflow: hidden;
}
</style>