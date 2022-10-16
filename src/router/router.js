import Main from '@/pages/Main.vue'
import ItemPage from '@/pages/ItemPage.vue'
import AdminPage from '@/pages/AdminPage.vue'
import ProfilePage from '@/pages/ProfilePage.vue'
import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
    { path: '/', component: Main },
    { path: '/item/:id', component: ItemPage },
    { path: '/admin', component: AdminPage },
    { path: '/profile', component: ProfilePage },
]

const router = createRouter({
    routes,
    history: createWebHashHistory(),
    scrollBehavior(to, from, savedPosition) {
        if (to.hash) {
            return {
                el: to.hash,
                left: 500,
                behavior: 'smooth'
            }
        }
    }
})
  
export default router