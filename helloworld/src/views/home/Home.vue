<template>
  <div id="home">
    <nav-bar class="home-nav" id="homenav">
      <div slot="center">购物街</div>
    </nav-bar>
    <tab-control
      :titles="['流行', '新款', '精选']"
      @tabclick="tabclick"
      ref="tabControl1"
      class="tab-control"
      v-show="isTabShow"
    ></tab-control>
    <scroll
      class="content"
      ref="scroll"
      :probe-type="3"
      :pull-up-load="true"
      @scroll="contentScroll"
      @pullingUp="loadMore"
    >
      <home-swiper
        :banners="banners"
        @swiperImageLoad="swiperImageLoad"
      ></home-swiper>
      <recommend-view :recommends="recommends"></recommend-view>
      <feature-view></feature-view>
      <tab-control
        :titles="['流行', '新款', '精选']"
        @tabclick="tabclick"
        ref="tabControl2"
      ></tab-control>
      <goods-lists :goods="showGoods"></goods-lists>
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
// import Swiper from 'components/common/swiper/Swiper'
// import SwiperItem from 'components/common/swiper/SwiperItem'
// import { Swiper, SwiperItem } from "components/common/swiper";

import HomeSwiper from "views/home/childComponents/HomeSwiper";
import RecommendView from "views/home/childComponents/RecommendView";
import FeatureView from "views/home/childComponents/FeatureView";

import NavBar from "components/common/navbar/NavBar";
import TabControl from "components/content/tabControl/TabControl";
import GoodsLists from "components/content/goods/GoodsLists";
import GoodsListItem from "components/content/goods/GoodsListItem";
import Scroll from "components/common/scroll/Scroll";
import BackTop from "components/content/backTop/BackTop";

import { getHomeMultidata, getHomeGoods } from "network/home";

import { debounce } from "common/utils";

export default {
  name: "Home",
  components: {
    // Swiper,
    // SwiperItem,
    HomeSwiper,
    RecommendView,
    FeatureView,

    NavBar,
    TabControl,
    GoodsLists,
    GoodsListItem,

    Scroll,
    BackTop,
  },
  data() {
    return {
      multidata: undefined,
      banners: [],
      recommends: [],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] },
      },
      currentType: "pop",
      isShowBackTop: false,
      tabOffsetTop: 0,
      isTabShow: false,
      saveY: 0,
    };
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list;
    },
  },
  created() {
    this.getHomeMultidata();
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
  },
  mounted() {
    //所有组件中都有一个属性$el，用于获取组件中的元素
    const refresh = debounce(this.$refs.scroll.refresh, 100);
    this.$bus.$on("itemImageLoad", () => {
      refresh();
    });
  },
  destroyed() {
    // console.log('我被销毁了')
  },
  activated() {
    this.$refs.scroll.refresh()
    this.$refs.scroll.scrollTo(0, this.saveY, 0);
  },
  deactivated() {
    this.saveY = this.$refs.scroll.getScrollY();
  },
  methods: {
    //封装一个防抖函数
    //放到utils.js工具里，其他项目也可能用到

    //事件监听相关方法
    tabclick(index) {
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
          break;
      }
      this.$refs.tabControl1.currentIndex = index;
      this.$refs.tabControl2.currentIndex = index;
      // this.getHomeGoods(this.currentType)  加上这句的话每点击一下tabcontrol就会请求到一页新的数据
    },
    backClick() {
      this.$refs.scroll.scrollTo(0, 0);
    },
    // test() {
    //   console.log(this.test);
    // },
    contentScroll(position) {
      // console.log(position);
      this.isShowBackTop = position.y <= -2000 ? true : false;
      this.isTabShow = (-position.y) >= this.tabOffsetTop ? true : false 
    },
    loadMore() {
      this.getHomeGoods(this.currentType);
      this.$refs.scroll.refresh();
    },
    swiperImageLoad() {
      console.log(this.$refs.tabControl2.$el.offsetTop);
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
    },

    //网络请求相关方法
    getHomeMultidata() {
      getHomeMultidata().then((res) => {
        this.banners = res.data.banner.list;
        // console.log(res)
        this.recommends = res.data.recommend.list;
      });
    },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then((res) => {
        // console.log(res);
        this.goods[type].list.push(...res.data.list);
        // console.log(this.goods[type].list[0].show.img);
        this.goods[type].page += 1;
        this.$refs.scroll.finishPullUp();
      });
    },
  },
};
</script>

<style scoped>
#home {
  /* padding-top: 44px; */
  height: 100vh;
}

.home-nav {
  background-color: var(--color-tint);
  color: #fff;
/* 使用原生滚动时由于homenav会跟着一起滚动所以让它脱标 */
/* 而betterscroll已经进行了定位就不需要下面的东西 */
  /* position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 9; */
}

.tab-control {
  /* position: -webkit-sticky;
  position: sticky; 在better-scroll中这个定位不起作用*/
  /* top: 44px; */
  /* z-index: 9; */
  position: relative;
  z-index: 9;
}

.fixed {
  position: fixed;
  left: 0;
  right: 0;
  top: 44px;
}

.content {
  overflow: hidden;
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}

/* .content {
  margin-top: 44px;
  height: calc(100% - 49px);
  height: 100%;
  overflow: hidden;
} */
</style>