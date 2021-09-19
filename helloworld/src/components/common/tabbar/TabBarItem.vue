<template>
    <div class="tabbar-item" @click="itemClick">
        <slot v-if='!isActive' name="item-icon"></slot>
        <slot v-else name="item-icon-active"></slot>
        <div :style="activeStyle()"><slot name="item-text"></slot></div>
    </div>
</template>

<script>
export default {
    name: 'TabBarItem',
    data() {
        return {

        };
     },
    computed: {
        isActive() {
            return this.$route.path.indexOf(this.path) !== -1
        }
    },
    props: {
        path: String,
        activeColor: {
            type: String,
            default: 'red'
        }

    },
    methods: {
        itemClick() {
            this.$router.replace(this.path)
        },
        activeStyle() {
            return this.isActive ? {'color': this.activeColor} : {}
        }
    }
}
</script>

<style scoped>
    .tabbar-item {
        flex: 1;
        text-align: center;
        height: 49px;
        font-size: 14px;
    }

    .tabbar-item img {
        margin-top: 3px;
        width: 24px;
        height: 24px;
        vertical-align: middle;
    }
</style>