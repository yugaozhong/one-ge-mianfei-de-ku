<template>
  <div class="nav">
    <mt-navbar v-model="selected">
      <mt-tab-item 
      :id="item.name" 
      v-for="(item,i) in NavRoutes" :key="i" 
      @touchstart.native = "gotoCom(item.name)" 
      >{{item.meta.title}}</mt-tab-item>
    </mt-navbar>
  </div>
</template>

<script>
import Vue from 'vue'
import { Navbar, TabItem } from "mint-ui";
Vue.component(Navbar.name, Navbar);
Vue.component(TabItem.name, TabItem);
import NavRoutes from '@/router/nav.js'
export default {
  data(){
    return{
      selected:this.$route.name,
      NavRoutes
    }
  },
  methods:{
    // api发起跳转 是什么路由名称就相应的跳转到什么位置
    gotoCom(name){
      this.$router.push({name})
    }
  }
};
</script>

<style>
</style>