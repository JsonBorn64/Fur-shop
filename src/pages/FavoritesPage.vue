<template>
    <header-comp/>
    <bread-crumps-search/>
    <ul class="catalog_cards">
        <transition-group name="list">
            <template v-for="(item, idx) in favorites" :key="item.id">
                <li class="card">
                    <img :src="`upload/${item?.Images[0]}`" alt="fur" height="248">
                    <div class="favorite_btn" @click="addFavorite(item.id)">
                        <img src="@/assets/images/header/ri_heart-line.svg" alt="heart">
                    </div>
                    <router-link :to="`/item/${item.id}/#header`" class="title">
                        <strong>{{item.Name}}</strong>
                    </router-link>
                    <p class="size">{{item?.Size.join(' / ')}}</p>
                    <div class="card_bottom">
                        <span>{{new Intl.NumberFormat('de-DE').format(item.Price)}} тг</span>
                        <a class="cart_btn" @click="$router.push(`/item/${item.id}/#header`)">
                            <img src="@/assets/images/catalog/ri_shopping-cart-2-line.svg" alt="cart-icon">
                        </a>
                    </div>
                </li>
            </template>
            <p v-if="favorites?.length < 1 && this.$store.state.fursLoaded" class="extra_info">У вас нет избранных товаров</p>
        </transition-group>
    </ul>
    <div class="line"></div>
    <possible-options/>
    <footer-comp/>
</template>

<script>
import HeaderComp from '@/components/HeaderComp.vue';
import BreadCrumpsSearch from '@/components/BreadCrumpsSearch.vue';
import FooterComp from '@/components/FooterComp.vue';
import favoritesMixin from '@/mixins/favoritesMixin';
import PossibleOptions from '@/components/PossibleOptions.vue';

export default {
    components: { HeaderComp, FooterComp, BreadCrumpsSearch, PossibleOptions },
    mixins: [favoritesMixin]
}
</script>

<style lang="scss" scoped>
    .catalog_cards {
        list-style: none;
        display: flex;
        gap: 42px;
        flex-wrap: wrap;
        justify-content: center;
        overflow: hidden;
        transition: all 0.3s ease;
        width: 100%;
        max-width: 834px;
        margin: 50px 0;
        min-height: 423px;
        align-items: center;
        @media (max-width: 742px) {
            margin: 100px 0 50px 0;
        }
        @media (max-width: 742px) {
            min-height: 284px;
        }
    }
    .card {
        display: flex;
        flex-direction: column;
        width: 250px;
        height: 423px;
        border: 1px solid black;
        background-color: white;
        overflow: hidden;
        position: relative;
        > img {
            width: 100%;
            object-fit: cover;
            max-height: 248px;
        }
        .title {
            width: calc(100% - 20px);
            font-family: 'Montserrat';
            font-size: 15px;
            line-height: 21px;
            letter-spacing: -0.02em;
            color: #222222;
            float: left;
            margin: 26px 0 0 10px;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
            display: -webkit-box;
            @media (max-width: 600px) {
                -webkit-line-clamp: 3;
            }
        }
        .size {
            font-family: 'Montserrat';
            font-weight: 700;
            font-size: 15px;
            line-height: 21px;
            text-align: justify;
            letter-spacing: -0.02em;
            text-transform: lowercase;
            color: rgba(34, 34, 34, 0.6);
            padding-top: 10px;
            margin-top: auto;
            margin-left: 10px;
        }
        span {
            font-family: 'Montserrat';
            font-weight: 700;
            font-size: 15px;
            line-height: 21px;
            text-align: justify;
            letter-spacing: -0.02em;
            text-transform: uppercase;
            color: #222;
        }
        .card_bottom {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 6px 18px 18px 10px;
            margin-top: auto;
        }
        .cart_btn {
            width: 50px;
            height: 50px;
            background: #F5ED2A;
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;
        }
        .favorite_btn {
            top: -1px;
            right: -1px;
            width: 40px;
            height: 40px;
            position: absolute;
            border: 1px solid black;
            background-color: #F5ED2A;
            display: grid;
            place-content: center;
            cursor: pointer;
        }
    }
    @media (max-width: 700px) {
        .catalog_cards {
            gap: 20px;
        }
        .card {
            width: 156px;
            height: 284px;
            > img {
                max-height: 154px;
            }
            .title {
                font-size: 13px;
                margin-top: 14px;
            }
            .size {
                display: none;
            }
            .card_bottom {
                font-size: 13px;
                padding: 6px 10px 10px;
            }
            .cart_btn {
                width: 35px;
                height: 35px;
                > img {
                    width: 60%;
                }
            }
        }
    }
    .card, .extra_info {
        transition: all 0.3s ease;
    }
    .line {
        width: 100%;
        height: 7px;
        background-color: #F5ED2A;
        margin-top: 10px;
    }
    .list-enter-from,
    .list-leave-to {
        opacity: 0;
    }

    .list-leave-active {
        position: absolute;
    }
</style>