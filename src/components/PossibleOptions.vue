<template>
    <section class="possible_options">
        <div class="title" v-if="!$store.getters?.topFileredFurs(6, [...favoritesIds, $route.params.id])">Вы добавили абсолютно все товары магазина в избранные, вы нормальный?</div>
        <div class="title" v-else>Возможно вам понравится</div>
        <ul class="cards_wrapper">
            <li class="card" v-for="fur in $store.getters.topFileredFurs(6, [...favoritesIds, $route.params.id])">
                <img :src="`/upload/${fur.Images[0]}`" width="149" alt="fur">
                <div class="favorite_btn" @click="addFavorite(fur.id)">
                    <img src="@/assets/images/header/ri_heart-line.svg" alt="heart">
                </div>
                <router-link :to="`/item/${fur.id}/#header`" class="cart_btn">
                    <img src="@/assets/images/top_sales/ri_arrow-right-up-line.svg" alt="arrow">
                </router-link>
            </li>
        </ul>
    </section>
</template>

<script>
import favoritesMixin from '@/mixins/favoritesMixin';

export default {
    mixins: [favoritesMixin]
}
</script>

<style lang="scss" scoped>
    .title  {
        font-family: 'Montserrat';
        font-weight: 700;
        font-size: 15px;
        letter-spacing: -0.02em;
        text-transform: uppercase;
        color: #222222;
        margin: 27px 0;
        text-align: center;
    }
    .cards_wrapper {
        list-style: none;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
        margin-bottom: 40px;
        .card {
            position: relative;
            margin: 0 11px 30px 11px;
            > img {
                min-width: 149px;
                height: 149px;
                object-fit: cover;
            }
            @media (max-width: 370px) {
                margin: 0 7px 30px 7px;                
            }
        }
        @media (max-width: 540px) {
            .card:nth-child(n+5) {
                display: none;
            }
        }
        @media (max-width: 370px) {
            justify-content: space-between;              
        }
        .favorite_btn, .cart_btn {
            position: absolute;
            right: -15px;
            width: 40px;
            height: 40px;
            display: grid;
            place-content: center;
            cursor: pointer;
        }

        .favorite_btn {
            bottom: 34px;
            border: 1px solid black;
            background-color: white;
            transition: 300ms;
            &:hover {
                background-color: #F5ED2A;
            }
        }

        .cart_btn {
            bottom: -14px;
            background-color: #F5ED2A;
        }
        @media (max-width: 540px) {
            margin-bottom: 20px;
        }
    }
</style>