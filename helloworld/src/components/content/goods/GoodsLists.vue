<template>
  <div class="goods-lists">
    <goods-list-item
      v-for="(item, index) in goods"
      :key="index"
      :goods-item="item"
      class="good-list-item"
    ></goods-list-item>
  </div>
</template>

<script>
import GoodsListItem from "components/content/goods/GoodsListItem";

export default {
  name: "GoodsLists",
  components: {
    GoodsListItem,
  },
  props: {
    goods: {
      type: Array,
      default() {
        return [];
      },
    },
  },
};
</script>

<style scoped>
.goods-lists {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  z-index: 5;
}
</style>