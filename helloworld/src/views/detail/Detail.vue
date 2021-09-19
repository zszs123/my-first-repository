<template>
  <div class="detail">
    <detail-nav-bar></detail-nav-bar>
    <detail-swiper :top-images="topImages"></detail-swiper>
  </div>
</template>

<script>
import DetailNavBar from "./childComps/DetailNavBar";
import DetailSwiper from "./childComps/DetailSwiper";

import { getDetail, GoodsInfo } from "network/detail";

export default {
  name: "Detail",
  data() {
    return {
      iid: null,
      topImages: [],
      goodsInfo: null
    };
  },
  components: {
    DetailNavBar,
    DetailSwiper,
  },
  created() {
    this.iid = this.$route.params.id;
    getDetail(this.iid).then((res) => {
      const data = res.result
      this.topImages = data.itemInfo.topImages;
      console.log(res)
      //获取商品信息
      this.goodsInfo = new GoodsInfo(data.itemInfo, data.columns, data.shopInfo.services)
      console.log(this.goodsInfo)
    });
  },
};
</script>

<style scoped>
</style>