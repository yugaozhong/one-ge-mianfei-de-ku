<template>
  <div id="app">
    <!-- 头部区域 -->
    <header :style="{zIndex: zIdx}">
      <div class="header">
        <mt-header title="">
          <router-link to="/" slot="left">
            <mt-button class="logo_icon"></mt-button>
          </router-link>
          <mt-button icon="search" slot="right" 
          @touchstart.native="gotoSearch"></mt-button>
        </mt-header>
      </div>
      <!-- 具名路由视图 -->
      <router-view name="nav"></router-view>
    </header>
    <div class="containers">
      <!-- 默认路由视图 -->
      <router-view></router-view>
    </div>
    <!-- 播放器组件 -->
    <play-bottom></play-bottom>
  </div>
</template>

<script>
import Vue from "vue";
import { Header,Button } from "mint-ui";
Vue.component(Header.name, Header);
Vue.component(Button.name, Button);
import playBottom from '@/components/PlayBottom/PlayBottom'
export default {
  data(){
    return{
      zIdx: 999
    }
  },
  methods:{
    gotoSearch(){
      // 去搜索组件区域
      this.$router.push({path:'/search'})
    }
  },
  components:{
    playBottom
  }
};
</script>

<style lang="less">
header{
  position: fixed;
  left: 0;
  top: 0;
  z-index: 999;
  width: 100%;
  .mint-header{
    .mint-header-button{
      .logo_icon{
        width: 5.1rem;
        height: 1.2rem;
        background: url(./assets/img/logo.png) no-repeat;
        background-size: 100% 100%;
      }
    }
    .mintui-search{
      font-size: .9rem;
    }
  }
  .nav>.mint-navbar>.mint-tab-item>.mint-tab-item-label{
    font-size: .8rem;
  }
}
div.containers{
  margin-top: 4.6rem;
  margin-bottom: 2rem;
}
</style>
