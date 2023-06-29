import * as VueRouter from 'vue-router';

const Register = () => import('../pages/auth/register.vue');
const Home = () => import('../pages/home.vue');

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
        },
        {
            path: '/register',
            name: 'Register',
            component: Register,
        }
    ]
})

export default router;