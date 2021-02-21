<template>
  <!-- 轮播图 -->
  <div class="newsong">
    <mt-swipe :auto="3000">
      <mt-swipe-item
      v-for="(item,i) in bannerlists" :key="i" >
      <img :src="item.imgurl" :alt="item.title" :title="item.title">
      </mt-swipe-item> 
    </mt-swipe>
    
    <!-- 歌曲列表 -->
    <mt-cell 
    v-for="(item,i) in songlists" :key="i"
     @touchstart.native="playSong(item)"
     :title="item.filename" >
     <img @touchstart.prevent="popUpFn" src="../../assets/img/download_icon.png" height="15" width="15" slot="icon" class="fr">
     </mt-cell>
  </div>
</template>

<script>
import Vue from "vue";
import { Swipe, SwipeItem, Cell, MessageBox } from "mint-ui";
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
Vue.component(Cell.name, Cell);
export default {
  data(){
    return{
      //banner数组
      bannerlists:[],
      //歌曲数组
      songlists:[]
    }
  },
  async created(){
    //请求新歌组件中要用到的数据 轮播图数据 歌曲列表数据
    let {data} = await this.$axios.get('/api?json=true');
    this.bannerlists = data.banner;
    this.songlists = data.data;
  },
  methods: {
    popUpFn(){
      MessageBox({
        title:"",
        message:"下载需要手机酷狗客户端支持。",
        showCancelButton: true,
        confirmButtonText: "客户端下载"
      })

      MessageBox.confirm("下载需要手机酷狗客户端支持。",'').then(action => {
        console.log(action);
      }).catch(err=>'')
    },
    playSong(item){
      //要播放歌曲了 传递给vuex的 hash
      this.$store.commit('playSong',{hash: item.hash})
      //当前歌曲列表
      this.$store.commit('commitSongLists',{songlists:this.songlists})
    }
  }
}
</script>

<style lang="less">
.mint-swipe {
  height: 6rem;
  .mint-swipe-items-wrap {
    .mint-swipe-item {
      img {
        height: 6rem;
        margin: 0.25rem;
      }
    }
  }
  .mint-swipe-indicators {
    bottom: 0.2rem;
  }
  .mint-swipe-indicator {
    opacity: 0.5;

    &.is-active {
      opacity: 0.7;
    }
  }
}

.mint-cell {
  .mint-cell-text {
    font-size: 0.7rem;
  }
}
</style>