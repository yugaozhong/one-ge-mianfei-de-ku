<template>
  <div class="searchbox">
    <div class="search-from-box">
      <form class="search-list">
        <span class="search-icon"></span>
        <input
          type="search"
          placeholder="歌手/歌名/拼音"
          class="search-keyword"
          @focus="searchgoFn"
          @blur="searchgoFn" 
          @keyup.enter.exact="searchFn"
          v-model="searchKey"
        />
        <input :style="{background: BtnColor?'#e5e5e5':'#2ba2fa',color:BtnColor?'#959595':'#fff'}" 
         class="search-btn" 
         type="button" 
         value="搜索" 
         @click="searchFn"/>
      </form>
    </div>
    <!-- 搜索出的歌曲列表 -->
    <div class="search-song" v-if="totalNum">
      <mt-cell :title="item.filename" 
      v-for="(item,i) in searchList" :key="i"
      @touchstart.native="playSong(item)" 
      >
        <img slot="icon" src="../../assets/img/download_icon.png" width="16" height="16" class="fr">
      </mt-cell>
    </div>
    <!-- 最近热门 -->
    <div class="hot-search-tit" v-else>
      <p>最近热门</p>
      <mt-cell 
      v-for="item in hotLists" :key="item.sort"
      :title="item.keyword" 
      :to="item.jumpurl" 
      ></mt-cell>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      BtnColor:true,
      hotLists: [],
      searchKey:"",
      searchList:[],
      totalNum: ""
    }
  },
  created(){
    this.$jsonp('http://mobilecdn.kugou.com/api/v3/search/hot?format=jsonp&plat=0&count=30')
    .then(({data})=>{
      this.hotLists = data.info;
    })
  },
  methods:{
    searchgoFn(){
      this.BtnColor=!this.BtnColor;
    },
    searchFn(){
      if(this.searchKey==''){
        alert('关键字不能为空');
        return 
      }
      this.$jsonp('http://mobilecdn.kugou.com/api/v3/search/song?format=jsonp&keyword='+ this.searchKey +'&page=1&pagesize=30&showtype=1')
      .then(({data})=>{
        this.searchList = data.info.map(item=>{
          return {
            filename: item.filename,
            hash: item.hash
          }
        });
        this.totalNum = data.total
      })
    },
    playSong(item){
      this.$store.commit('playSong',{hash: item.hash})

      this.$store.commit('commitSongLists',{songlists:this.searchList})
    }
  }
};
</script>

<style lang="less">
.searchbox {
  .search-from-box {
    background-color: #fbfbfb;
    padding: 0.7143rem;
    width: 100%;
    .search-list {
      position: relative;
      .search-keyword {
        width: 78%;
        padding: 0.2rem 0.05rem 0.2rem 1.2rem;
        margin-right: 3.5%;
        display: inline-block;
        vertical-align: middle;
        border: 1px solid #e5e5e5;
        border-radius: 5px;
        font-size: 0.7rem;
      }
      & > .search-btn {
        width: 18%;
        height: 1.5rem;
        line-height: 1.5rem;
        border: none;
        border-radius: 5px;
        display: inline-block;
        vertical-align: middle;
        font-size: 0.7rem;
        text-align: center;
      }
      & > .search-icon {
        width: 0.84rem;
        height: 1.4rem;
        display: block;
        position: absolute;
        top: .1rem;
        left: 0.28rem;
        background: url(../../assets/img/search_icon.png) no-repeat;
        background-size: 100%;
      }
    }
  }
  // &>.hot-search-tit>.mint-cell>.mint-cell-wrapper>.mint-cell-title>.mint-cell-text{
  //   font-size: .8rem;
  // }
  &>.hot-search-tit>p{
    height: 2.1rem;
    line-height: 2.1rem;
    padding-left: .7rem;
    border-bottom: 1px solid #ccc;
    font-size: .7rem;
    color: #2ca3f5;
    margin-bottom: 0;
  }
}
.mint-cell .mint-cell-text{
  font-size: .8rem;
}
.mint-cell .mint-cell-title{
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.mint-cell .mint-cell-wrapper{
  line-height: 1.6;
}

.mint-cell img{
  margin-top: .25rem;
}
</style>