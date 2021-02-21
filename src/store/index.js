import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        titleData: "搜索",
        hash: "",
        //当前播放的歌曲列表
        songlists:[]
    },
    mutations:{
        //获取标题
        changeTitle(state,{title}){
            state.titleData = title;
        },
        // 播放方法:获取当前要播放的歌曲的hash值
        playSong(state, {hash}){
            state.hash = hash;
        },
        //获取当前要播放的歌曲列表
        commitSongLists(state, {songlists}){
            state.songlists = songlists;
        }
    },
    actions:{},
    modules:{}
})