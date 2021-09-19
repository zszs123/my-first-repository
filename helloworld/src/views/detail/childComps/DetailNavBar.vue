<template>
  <div class="detail-nav-bar">
    <nav-bar>
      <div slot="left" class="back" @click="backClick">
        <img src="~assets/img/common/back.svg" alt="">
      </div>
      <div slot="center" class="title">
        <div 
          v-for="(item, index) in titles" 
          class="title-item"
          :class="{active: index === currentIndex}"
          @click="setCurrentIndex(index)"
          >{{item}}</div>
      </div>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
export default {
  name: 'DetailNavBar',
  components: {
    NavBar,
  },
  data() {
    return {
      titles: ['商品','参数','评论','推荐'],
      currentIndex: 0,
    }
  },
  methods: {
    setCurrentIndex(index) {
      this.currentIndex = index;
    },
    backClick() {
      // this.$router.back();
      this.$router.go(-1)
    }
  }
}
</script>

<style scoped>
.title {
  display: flex;
  font-size: 13px;
}

.title-item {
  flex: 1;
}

.active {
  color: rgb(238, 90, 90);
}

.back {
  margin-top: 6px;
}
</style>