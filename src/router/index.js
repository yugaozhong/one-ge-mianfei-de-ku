import Vue from 'vue'
import VueRouter from 'vue-router'



// 导入四个路由规则
import NavRoutes from './nav'
// import NavSearch from '@/components/Nav/NavSearch'
// import Search from '@/components/Search/Search'
// import SingerList from '@/views/Singer/SingerList'
// import SingerInfo from '@/views/Singer/SingerInfo'
// import SongDetails from '@/views/Common/SongDetails'

Vue.use(VueRouter)
// 解决路由重复点击的报错 vue-router的bug
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err);
}

const routes = [
    ...NavRoutes,
    //搜索路由
    {
        path: '/search',
        name: 'Search',
        components:{
            default: ()=> import('@/components/Search/Search'),
            nav: ()=> import('@/components/Nav/NavSearch')
        }
    },
    // 歌手列表组件路由规则
    {
        path: '/singer/list/:singerId',
        name: "SingerList",
        components:{
            default: ()=> import('@/views/Singer/SingerList'),
            nav: ()=> import('@/components/Nav/NavSearch')
        }
    },
    // 歌曲详情组件路由规则 "/song/details"
    {
        path:"/song/details/:songName/:songId",
        name:"SongDetails",
        components:{
            default: ()=> import('@/views/Common/SongDetails'),
            nav: ()=> import('@/components/Nav/NavSearch')
        }
    },
    //歌手info信息组件路由
    {
        path:'/singer/info/:infoId',
        name:"SingerInfo",
        components:{
            default: ()=> import('@/views/Singer/SingerInfo')
        }
    }
]

const router = new VueRouter({
    routes,
})

export default router