import Vue from 'vue'
import VueRouter from 'vue-router'


// 导入四个路由规则
import NavRoutes from './nav'

Vue.use(VueRouter)
    // 解决路由重复点击的报错 vue-router的bug
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err);
}

const routes = [

]

const router = new VueRouter({
    routes
})

export default router