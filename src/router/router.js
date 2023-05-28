import Main from '@/pages/Main.vue'
import CartPage from '@/pages/CartPage.vue'
import ItemPage from '@/pages/ItemPage.vue'
import AdminPage from '@/pages/AdminPage.vue'
import ProfilePage from '@/pages/ProfilePage.vue'
import CatalogPage from '@/pages/CatalogPage.vue'
import FavoritesPage from '@/pages/FavoritesPage.vue'
import OrderPage from '@/pages/OrderPage.vue'
import NotFound from '@/pages/NotFound.vue'
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    { path: '/', component: Main, name: 'Главная страница' },
    { path: '/item/:id', component: ItemPage, name: 'Страница товара' },
    { path: '/admin', component: AdminPage, name: 'Админка' },
    { path: '/profile', component: ProfilePage, name: 'Мой профиль' },
    { path: '/catalog', component: CatalogPage, name: 'Каталог' },
    { path: '/favorites', component: FavoritesPage, name: 'Избранное' },
    { path: '/cart', component: CartPage, name: 'Корзина' },
    { path: '/order', component: OrderPage, name: 'Оформление заказа' },
    {
        path: "/:catchAll(.*)",
        name: "NotFound",
        component: Main,
        meta: {
          requiresAuth: false
        }
      }
]

const router = createRouter({
    routes,
    history: createWebHistory(),
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