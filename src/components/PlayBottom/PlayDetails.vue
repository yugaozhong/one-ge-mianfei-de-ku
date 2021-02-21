<template>
  <div class="playDetails">
      <!-- 顶部标题 -->
      <mt-header :title="songName">
          <span slot="left">
              <!-- 返回的图标 -->
              <mt-button icon="back" 
              @touchstart.native="$emit('update:isShow',false)"
              ></mt-button>
          </span>
      </mt-header>
      <!-- 歌手图片 -->
      <img :src="imgUrl" alt="" width="180">
      <!-- 放置歌词的div -->
      <div class="geci">
          <div class="wrapper" v-html="geciText"></div>
      </div>
      <!-- 歌曲进度条 -->
      <div class="controler clearfix">
          <!-- 播放时间 -->
          <span>{{ ct }}</span>
          <!-- 进度条 -->
          <div class="bar">
              <div class="rec" v-drag="$parent.$refs.myAudio"></div>
          </div>
          <!-- 歌曲总时长 -->
          <span>{{ totalTime }}</span>
      </div>
      <!-- 歌曲控制栏 前一首 播放|暂停 下一首 -->
      <div class="controler2">
          <img 
          @touchstart.stop="prevSongFn"
           src="../../assets/img/play_prev.png" width="35" alt="">
          <img 
          @touchstart.stop="playOrPause"
           :src="isRun ? img2 : img1" width="50" alt="">
          <img 
          @touchstart.stop="nextSongFn"
           src="../../assets/img/play_next.png" width="35" alt="">
      </div>
  </div>
</template>

<script>
import NavSearch from "@/components/Nav/NavSearch"
export default {
props:{
    imgUrl: String,//歌手图片路径
    hash: String,
    songName: String,
    songlists: Array,
    isPlay: Boolean,
    geciText: String,
    totalTime:{
        type: String || Number,
        default: "00:00",
    }
},
data(){
    return{
        ct: "00:00",
    // yarn sever 开始的一启动开发服务器 webpack 图片资源路径 进行加载 转换为图片数据资源
    // 后面动态绑定图片的时候 如果直接写一个字符串路径 则webpack无法解析为图片资源
    img1: require("../../assets/img/play_play.png"),
    img2: require("../../assets/img/play_pause.png"),
    }
},
components:{
    NavSearch,
},
directives:{
    // 自定义指令
    drag:{
        // inserted : 被绑定元素插入父节点时调用的钩子函数
        inserted(el,binding){
            // 将指令绑定的内容取出并声明一个变量
            let audio = binding.value;
            // 给绑定元素添加拖拽进度条控制歌曲播放的功能
            el.ontouchstart = function(e){
                let disX = e.touches[0].clientX - el.offsetLeft;

                document.ontouchmove = function(e){
                    let x = e.touches[0].clientX - disX;
                    x =x <0?0:x;
                    x=
                    x>el.parentNode.offsetWidth - el.offsetWidth ?
                    el.parentNode.offsetWidth - el.offsetWidth : x;
                    
                    el.style.left = x + "px";

                    let currentTime = audio.duration * (el.offsetLeft / (el.parentNode.offsetWidth-el.offsetWidth))
                    //audio.fastSeek(currentTime)改变当前播放时间
                    //Safari(苹果浏览器)浏览器支持fastSeek方法，Chrome浏览器里没有该方法
                    if("fastSeek" in audio){
                        audio.fastSeek(currentTime);
                        //判断拖拽的时间是否在缓存在该段内 是的话可以直接赋值
                    }else if(audio.seekable){
                        audio.currentTime = currentTime;
                    }else{
                        //当前拖拽处的时间超过了缓冲的最大时间，且不在audio.seekable的范围，回到缓冲的最大位置处
                        audio.currentTime = audio.buffered.end(audio.buffered.length-1);
                    }
                };
                document.ontouchend = function(){
                    this.ontouchstart = null;
                    this.ontouchend = null;
                }
            }
        }
    }
},
methods:{
    //触发父组件上的播放与暂停事件
    playOrPause(){
        this.$emit("changePlay");
    },
    //上一首
    prevSongFn(){
        this.$emit("prevSongFn");
    },
    //下一首
    nextSongFn(){
        this.$emit("nextSongFn");
    }
},
computed:{
    isRun(){
        return this.isPlay;
    }
},
created(){
    let that = this;
    //timeupdate 事件在音频/视频（audio/video）的播放位置发生改变时触发
    this.$parent.$refs.myAudio.addEventListener("timeupdate",function(){
        //对播放时间进行处理
        let zero = m=>(m<10?"0"+m:m);
        that.ct = 
        zero(parseInt(this.currentTime / 60))+
        ":" +
        zero(parseInt(this.currentTime % 60))
        //歌词滚动效果
        let allP = document.querySelectorAll(".geci>.wrapper>p");

        for(var i = 0; i<allP.length; i++){
            if(allP[i].id == that.ct){
                for(var j=0; j<allP.length; j++){
                    if(j<=i){
                        allP[j].style.color = "orange";
                    }else{
                        allP[j].style.color = "#fff";
                    }
                }
                //让歌词跟着时间移动
                document.querySelector(".geci>.wrapper").style.top =
                -35 * i + 35 + "px";
            }
        }
        //让滑块跟着变化
        let scale = this.currentTime / this.duration;
        document.querySelector(".rec").style.left =
        document.querySelector(".bar").offsetWidth * scale +"px";
    })
}
}
</script>

<style lang="less">
.player .playDetails{
    margin: 0 !important;
    background-color: rgb(0, 0, 0);
    height: 26.4rem;
    width: 100%;
    position: absolute;
    bottom: 0;
    left: 0;
    text-align: center;
    }
    .geci{
        height: 4.75rem;
        line-height: 1.25rem;
        overflow: hidden;
        margin: 0.5rem;
        position: relative;
        .wrapper{
            height: 100%;
            width: 100%;
            position: absolute;
            left: 0;
            top: 1.75rem;
            transition: all 0.5s;
            font-size: 0.6rem;
        }
    }
    .controler > *{
        float: left;
    }
    .controler{
        margin: 1rem auto;
        span{
            font-size: 0.6rem;
        &:nth-child(1){
            margin-left: 0.75rem;
        }
    }
    .bar{
        margin: 0 0.25rem;
        width: 11rem;
        height: 0.1rem;
        background-color: #666;
        position: relative;
        top: 0.35rem;
        .rec{
            width: 0.5rem;
            height: 0.5rem;
            border-radius: 50%;
            background-color: skyblue;
            position: absolute;
            left: 0;
            top: -0.2rem;
        }
    }
}
.controler2 img{
    margin: 0 0.5rem;
}
.playDetails{
    .mint-header{
        background-color: transparent;
        color: #fff;
        .mint-button-icon{
            .mintui-back{
                color: rgb(134,134,134);
                font-size: 1rem;
            }
        }
    }
    & > img{
        margin-top: 1rem;
    }
}
</style>