//四个导航的路由 文件
import Nav from '@/components/Nav/Nav'
import NewSong from '@/views/NewSong/NewSong'
// import Rank from '@/views/Rank/Rank'
// import Plist from '@/views/Plist/Plist'
// import Singer from '@/views/Singer/Singer'

//导航的路由
const NavRoutes= [{
    path: '/',
    name: "NewSong",
    components:{
        default: NewSong,
        nav: Nav
    },
    meta:{
        title: "新歌"
    }
},{
    path: '/rank',
    name: "Rank",
    components:{
        default: ()=>import('@/views/Rank/Rank'),
        nav: Nav
    },
    meta:{
        title: "排行"
    }
},{
    path: '/plist',
    name: "Plist",
    components:{
        default: ()=>import('@/views/Plist/Plist'),
        nav: Nav
    },
    meta:{
        title: "歌单"
    }
},{
    path: '/singer',
    name: "Singer",
    components:{
        default: ()=>import('@/views/Singer/Singer'),
        nav: Nav
    },
    meta:{
        title: "歌手"
    }
}]

export default NavRoutes