import Main from '@/pages/Main.vue'
import ItemPage from '@/pages/ItemPage.vue'
import AdminPage from '@/pages/AdminPage.vue'
import ProfilePage from '@/pages/ProfilePage.vue'
import CatalogPage from '@/pages/CatalogPage.vue'
import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
    { path: '/', component: Main, name: 'Главная страница' },
    { path: '/item/:id', component: ItemPage, name: 'Страница товара' },
    { path: '/admin', component: AdminPage, name: 'Админка' },
    { path: '/profile', component: ProfilePage, name: 'Мой профиль' },
    { path: '/catalog', component: CatalogPage, name: 'Каталог' },
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