<template>
  <div class="searchCom">
    <mt-header :style="styleObj" :title="titleData">
      <span @click="$router.go(-1)" slot="left">
        <mt-button icon="back"></mt-button>
      </span>

    </mt-header>
  </div>
</template>

<script>
import Vue from "vue";
import { Header } from "mint-ui";
import { mapState } from "vuex";
Vue.component(Header.name, Header);

export default {
  data(){
    return{
      styleObj:{
        background: this.$route.params.songName?'transparent':'#fff',
        color: this.$route.params.songName?"#fff":"#000"
      }
    }
  },
  computed:{
    ...mapState(['titleData'])
  },
  watch:{
    $route:{
      handler(to){
        if(to.path=='/search'){
          this.$store.commit('changeTitle',{title:"搜索"})
        }
      },
      immediate: true // 打开组件立即初始化触发一次
    }
  }
};
</script>

<style lang="less">
.searchCom{
  .mint-header {
    background-color: #fff;
    color: #000;
    .mint-button-icon{
      margin-top: .5rem;
      .mintui-back {
        color: rgb(134, 134, 134);
        font-size: 1rem;
      }
    }
  }
}
</style>
