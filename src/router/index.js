import * as VueRouter from 'vue-router';

const BaseLayout = () => import('../layouts/base-layout.vue');
const Home = () => import('../pages/home.vue')

const router = VueRouter.createRouter({
    history: VueRouter.createWebHashHistory(),
    routes: [{
            path: '/',
            redirect: {
                name: 'Home'
            }
        },
        {
            path: '/home',
            name: 'Home',
            component: Home,
        }
    ]
})

export default router;