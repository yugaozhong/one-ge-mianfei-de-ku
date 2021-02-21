<template>
  <div class="singerInfo">
      <div class="header">
        <img :src="singerInfo.imgurl" alt="">
      </div>
      <div class="main">
        <div class="main_header">全部播放/{{singerInfo.songsCount}}首</div>
        <mt-cell 
        v-for="(item,i) in singerSongs" :key="i"
        @click.native="playSong(item.hash)"
        :label="item.singerName"
         :title="item.songName"></mt-cell>
      </div>
  </div>
</template>

<script>
export default {
    data(){
      return{
        singerInfo:{},
        singerSongs:[]
      }
    },
    async created(){
      let {data} = await this.$axios.get('/api/singer/info/'+this.$route.params.infoId +'?json=true')
      this.singerInfo = {
        imgurl: data.info.imgurl.replace(/{size}/,'400'),
        singername: data.info.singername,
        songsCount: data.info.songcount
      }
      this.singerSongs = data.songs.list.map(item=>{
        return{
          songName: item.filename.split('-')[1],
          singerName: item.filename.split('-')[0],
          hash: item.hash
        }
      });
    },
    methods:{
      playSong(hash){
        // 触发vuex上的playSong方法,并传参
        this.$store.commit('playSong',{hash});
        // 当前歌曲播放列表
        this.$store.commit('commitSongLists',{songlists: this.singerSongs})
      }
    }
}
</script>

<style>
.singerInfo{
  overflow: hidden;
}
.singerInfo .header {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 9.5rem;
  z-index: 999;
  overflow: hidden;
}
.singerInfo .header img {
  width: 100%;
  margin-top: -2rem;
}
.singerInfo .mint-cell .mint-cell-text {
  font-size: .65rem;
}
.singerInfo .mint-cell .mint-cell-label{
  font-size: .6rem;
}
.singerInfo .main {
  position: absolute;
  background-color: #fff;
  left: 0;
  top: 9rem;
  width: 100%;
  z-index: 1000;
  border-top-left-radius: .5rem;
  border-top-right-radius: .5rem;
  overflow: hidden;
  margin-bottom: 3.5rem;
}
.singerInfo .main .main_header{
  font-size: .65rem;
  line-height: 3rem;
  text-indent: 1.5rem;
  height: 2.5rem;
}
</style>