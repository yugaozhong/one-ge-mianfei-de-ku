<template>
  <div class="details">
    <div class="header">
      <img :src="songData.imgUrl" alt="" />
      <div class="mark"></div>
      <span v-if="$route.params.songName == 'rank'"
        >上次更新时间:{{ update }}</span
      >
    </div>
    <!-- 歌曲列表 -->
    <div class="wrapper">
      <mt-cell
        v-for="(item, i) in songData.songs"
        :key="i"
        :title="item.filename"
        @click.native="playSong(item.hash)"
      >
        <i
          v-if="$route.params.songName == 'rank'"
          :class="{ cls1: i == 0, cls2: i == 1, cls3: i == 2 }"
          slot="icon"
          >{{ i + 1 }}</i
        >
        <img
          @touchstart.prevent="popUpFn"
          slot="icon"
          src="../../assets/img/download_icon.png"
          width="15"
          height="15"
          class="fr"
        />
      </mt-cell>
    </div>
  </div>
</template>

<script>
import { MessageBox } from 'mint-ui';
export default {
  data() {
    return {
      songData: {},
    };
  },
  methods: {
    popUpFn() {
      MessageBox({
        title: "",
        message: "下载需要手机酷狗客户端支持。",
        showCancelButton: true,
        confirmButtonText: "客户端下载",
      })

      MessageBox.confirm("下载需要手机酷狗客户端支持。", "").then((action) => {
        console.log(action);
      }).catch(err=>'')
    },
    playSong(hash) {
    //触发vuex上的播放方法
      this.$store.commit("playSong", { hash });
      //当前歌曲播放列表
      this.$store.commit('commitSongLists',{songlists: this.songData.songs})
    },
  },

  // 这个一个公用的组件
  // 如果是通过排行帮进入的 rank/info/8888?json=true
  // 歌单进入 plist/list/3272293?json=true
  async created() {
    //根据路径的不同来做axios请求
    let { songName, songId } = this.$route.params;
    let url = "";
    if (songName == "rank") {
      url = "/api/rank/info/" + songId + "?json=true";
      let { data } = await this.$axios.get(url);
      this.songData = {
        imgUrl: data.info.imgurl.replace(/{size}/, "400"),
        titleName: data.info.rankname,
        updateTime: data.songs.list[0].addtime,
      };
      this.songData.songs = data.songs.list.map((item) => {
        return {
          filename: item.filename,
          hash: item.hash,
        };
      });
    } else if (songName == "plist") {
      url = "/api/plist/list/" + songId + "?json=true";
      let { data } = await this.$axios.get(url);
      this.songData = {
        imgUrl: data.info.list.imgurl.replace(/{size}/, "400"),
        titleName: data.info.list.specialname,
      };
      this.songData.songs = data.list.list.info.map((item) => {
        return {
          filename: item.filename,
          hash: item.hash,
        };
      });
    }
    // 提交修改标题
    this.$store.commit("changeTitle", { title: this.songData.titleName });
  },
  computed: {
    update() {
      if (this.songData.updateTime) {
        return this.songData.updateTime.substring(0, 10);
      } else {
        return "";
      }
    },
  },
};
</script>

<style lang="less">
.details {
  .header {
    background-color: rgb(68, 145, 239);
    height: 8.6rem;
    width: 100%;
    position: absolute;
    left: 0;
    top: 2rem;
    text-align: center;
    span {
      position: absolute;
      left: 0.5rem;
      bottom: 0.5rem;
      font-size: 0.6rem;
      color: #fff;
    }
    .mark {
      position: absolute;
      width: 100%;
      height: 100%;
      left: 0;
      top: 0;
      background: linear-gradient(
        to bottom,
        rgba(0, 0, 0, 0.4) 0%,
        rgba(0, 0, 0, 0.1) 20%,
        rgba(0, 0, 0, 0) 50%,
        rgba(0, 0, 0, 0.1) 80%,
        rgba(0, 0, 0, 0.4) 100%
      );
    }
    img {
      width: 16rem;
      height: 8.6rem;
    }
  }

  .wrapper {
    margin-top: 10.6rem;
    .mint-cell-text {
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      width: 11rem;
      float: right;
      margin-right: 1.65rem;
      margin-top: 0.15rem;
    }
    i {
      color: #999;
      padding: 0.05rem 0.4rem;
      font-size: 0.6rem;
    }
    .cls1 {
      border-radius: 0.35rem;
      color: white;
      background-color: red;
    }
    .cls2 {
      border-radius: 0.35rem;
      color: white;
      background-color: #fd7222;
    }
    .cls3 {
      border-radius: 0.35rem;
      color: white;
      background-color: #f7b22a;
    }
  }
}
</style>