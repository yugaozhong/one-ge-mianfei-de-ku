<template>
  <div class="player" @click="isAllState = true" v-show="hash && url">
    <!-- 通过ref注册，设置注册名,并通过注册名引用 -->
    <audio :src="url" ref="myAudio"></audio>
    <img :src="imgUrl" alt="" width="60" height="60" />
    <div>
      <p>{{ songName }}</p>
      <p>{{ singerName }}</p>
    </div>
    <i class="fr glyphicon glyphicon-download-alt"></i>
    <!-- 下一首按钮 -->
    <i @click="nextSongFn" class="fr glyphicon glyphicon-step-forward"></i>
    <!-- 播放按钮 -->
    <i
      @click="playOrPause"
      class="fr"
      :class="{
        glyphicon: true,
        'glyphicon-play': !isPlay,
        'glyphicon-pause': isPlay,
      }"
    ></i>
    <!-- 播放界面组件 -->
    <Play-details
      v-show="isAllState"
      v-bind:isShow.sync="isAllState"
      :imgUrl="imgUrl"
      :hash="hash"
      :isPlay="isPlay"
      @changePlay="playOrPause"
      @nextSongFn="nextSongFn"
      @prevSongFn="prevSongFn"
      :geciText="geciText"
      :songName="songName"
      :songLists="songlists"
      :totalTime="totalTime"
    ></Play-details>
  </div>
</template>

<script>
import { Toast } from "mint-ui";
import { mapState } from "vuex";
import PlayDetails from "./PlayDetails";
export default {
  computed: {
    ...mapState(["hash", "songlists"]),
  },
  components: {
    PlayDetails,
  },
  data() {
    return {
      isPlay: false,
      imgUrl: "",
      url: "",
      singerName: "",
      songName: "",
      isAllState: false,
      fileName: "",
      geciText: "",
      totalTime: "",
    };
  },
  // 监测hash值 就请求后端数据最新的播放歌曲
  watch: {
    hash: {
      handler: async function (hash) {
        let { data } = await this.$axios.get("/api/api/v1/song/get_song_info", {
          params: {
            cmd: "playInfo",
            hash,
          },
        });
        //判断是否是付费歌曲
        if (data.errcode != 2) {
          if (data.error == "需要付费") {
            Toast("抱歉, 当前版权限制，需要付费! ");
          } else {
            // 有歌曲数据回来
            this.imgUrl = data.imgUrl.replace(/{size}/, "400");
            this.url = data.url;
            this.singerName = data.singerName;
            this.songName = data.songName;
            this.fileName = data.fileName;
            /* 
            调用原生dom原生身上的api 进行播放
            音频资源到本地之后 需要加载完毕才能播放 （资源缓冲完毕）
            this.$refs.myAudio.play()
            */
            var that = this;
            this.$refs.myAudio.addEventListener("loadeddata", function () {
              setTimeout(() => {
                this.play();
              }, 10);
              that.isPlay = true;
              that.totalTime = parseInt(this.duration);
              let zero = m=>m < 10 ? "0" + m : m;
              that.totalTime =
                zero(parseInt(that.totalTime / 60)) +
                ":" +
                zero(that.totalTime % 60);
            });
          }
        }
        //发起歌词请求
        let response = await this.$axios.get(
          "/geci/app/i/krc.php?cmd=100&keyword=" +
            this.fileName +
            "&hash=" +
            this.hash +
            "&timelength=261000&d=0.624"
        );
        //对歌词进行文本处理 拼接p标签
        this.geciText = "";
        let arr = response.data
          .split("[")
          .filter((item) => item.charAt(0) == "0");
        arr.forEach((item) => {
          let smallArr = item.split("]");
          this.geciText +=
            "<p id=" + smallArr[0].split(".")[0] + ">" + smallArr[1] + "</p>";
        });

        // console.log(this.geciText);
      },
      // immediate: true
    },
    isAllState(bool) {
      this.$parent.zIdx = bool ? 1000 : 999;
    },
  },
  methods: {
    // 播放与暂停
    playOrPause() {
      this.isPlay = !this.isPlay;
      if (this.isPlay) {
        this.$refs.myAudio.play();
      } else {
        this.$refs.myAudio.pause();
      }
    },
    //点击上一首
    prevSongFn() {
      // 根据当前歌曲的hash值去看看自己的第几个歌 索引
      let idx = this.songlists.findIndex((item) => item.hash == this.hash);
      if (this.songlists[idx - 1]) {
        //  提交下一首歌的hash
        this.$store.commit("playSong", { hash: this.songlists[idx - 1].hash });
      }
    },
    // 单击下一首
    nextSongFn() {
      // 根据当前歌曲的hash值去看看自己的第几个歌 索引
      let idx = this.songlists.findIndex((item) => item.hash == this.hash);
      if (this.songlists[idx + 1]) {
        //  提交下一首歌的hash
        this.$store.commit("playSong", { hash: this.songlists[idx + 1].hash });
      }
    }
  },
};
</script>

<style lang="less">
.player {
  width: 100%;
  height: 3.5rem;
  background-color: #000;
  position: fixed;
  left: 0;
  bottom: 0;
  color: white;
  z-index: 1001;

  & > * {
    float: left;
  }
  & > img {
    margin: 0.25rem;
  }
  & > div {
    margin-top: 0.5rem;
    margin-left: 1rem;
    width: 5rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  i {
    font-size: 1rem;
    margin: 1.25rem 0.5rem;
  }
}
</style>