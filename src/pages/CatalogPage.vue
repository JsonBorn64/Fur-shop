<template>
    <header-comp/>
    <bread-crumps-search/>
    <section class="catalog">
        <header class="catalog_header">
            <div class="catalog_sort">
                <div class="price_and_popular">
                    <div class="price">
                        <div>Цена</div>
                        <img
                            @click="sortBy = 'PriceAsc'"
                            :src="getSrc(`${sortBy === 'PriceAsc' ? 'yellow-' : ''}ant-design_arrow-up-outlined.svg`)"
                            alt="arrow"
                        >
                        <img
                            @click="sortBy = 'PriceDesc'"
                            :src="getSrc(`${sortBy === 'PriceDesc' ? 'yellow-' : ''}ant-design_arrow-up-outlined.svg`)"
                            alt="arrow"
                        >
                    </div>
                    <div class="popular">
                        <div>Популярность</div>
                        <img
                            @click="sortBy = 'OrdersAsc'"
                            :src="getSrc(`${sortBy === 'OrdersAsc' ? 'yellow-' : ''}ant-design_arrow-up-outlined.svg`)"
                            alt="arrow"
                        >
                        <img
                            @click="sortBy = 'OrdersDesc'"
                            :src="getSrc(`${sortBy === 'OrdersDesc' ? 'yellow-' : ''}ant-design_arrow-up-outlined.svg`)"
                            alt="arrow"
                        >
                    </div>
                </div>
                <div class="search">
                    <div class="keywords">
                        Ключ. слова:
                        <span @click="searchQuery = 'Шуба'">Шуба</span>
                        <span @click="searchQuery = 'Леопард'">Леопард</span>
                        <span @click="searchQuery = 'Дублёнка'">Дублёнка</span>
                    </div>
                </div>
            </div>
            <div class="keywords"></div>
        </header>
        <div class="cards_and_filter">
            <div class="filter">
                <div class="filter_type" :style="{'max-height': !filterTypeOpen ? '16px' : '100px'}">
                    <div class="title" @click="filterTypeOpen = !filterTypeOpen" :class="{'filter_close': !filterTypeOpen}">Тип</div>
                    <div class="options">
                        <p>Шубы</p>
                        <p>Куртки</p>
                        <p>Дублёнки</p>
                    </div>
                </div>
                <div class="filter_line"></div>
                <div class="filter_price" :style="{'max-height': !filterPriceOpen ? '16px' : '80.4px'}">
                    <div class="title" @click="filterPriceOpen = !filterPriceOpen" :class="{'filter_close': !filterPriceOpen}"
                    >Цена</div>
                    <div class="options">
                        <div>
                            От <input type="number">
                        </div>
                        <div>
                            До <input type="number">
                        </div>
                    </div>
                </div>
                <div class="filter_line"></div>
                <div class="filter_size" :style="{'max-height': !filterSizeOpen ? '16px' : '120px'}">
                    <div class="title" @click="filterSizeOpen = !filterSizeOpen" :class="{'filter_close': !filterSizeOpen}">Размер</div>
                    <div class="options">
                        <div>s</div>
                        <div>m</div>
                        <div>l</div>
                        <div>xl</div>
                        <div>xxl</div>
                    </div>
                </div>
            </div>
            <ul class="catalog_cards">
                <transition-group name="list">
                    <template v-for="(item, idx) in sortedAndSearchedFurs" :key="item.id">
                        <li class="card">
                            <img :src="`upload/${item?.Images[0]}`" alt="fur" height="248">
                            <router-link :to="`/item/${item.id}/#header`" class="title">
                                <strong>{{item.Name}}</strong>
                            </router-link>
                            <p class="size">{{item?.Size.join(' / ')}}</p>
                            <div class="card_bottom">
                                <span>{{new Intl.NumberFormat('de-DE').format(item.Price)}} тг</span>
                                <a class="cart_btn" ><img src="@/assets/images/catalog/ri_shopping-cart-2-line.svg" alt="cart-icon"></a>
                            </div>
                        </li>
                    </template>
                    <p v-if="sortedAndSearchedFurs.length < 1 && this.$store.state.fursLoaded" class="extra_info">Ничего не найдено</p>
                    <p v-if="!this.$store.state.fursLoaded" class="extra_info">Загрузка...</p>
                </transition-group>
            </ul>
        </div>
    </section>
    <div class="line"></div>
    <possible-options/>
    <div style="margin: -70px 0"></div>
    <decore-section/>
    <subscribe-form/>
    <div style="margin: 60px 0"></div>
    <footer-comp/>
</template>

<script>
import HeaderComp from '@/components/HeaderComp.vue';
import BreadCrumpsSearch from '@/components/BreadCrumpsSearch.vue';
import FooterComp from '@/components/FooterComp.vue';
import PossibleOptions from '@/components/PossibleOptions.vue';
import DecoreSection from '@/components/DecoreSection.vue';
import SubscribeForm from '@/components/SubscribeForm.vue';
export default {
    components: { HeaderComp, BreadCrumpsSearch, FooterComp, PossibleOptions, DecoreSection, SubscribeForm },
    data() {
        return {
            furs: this.$store.state.furs,
            sortBy: 'OrdersDesc',
            searchQuery: "",
            filterTypeOpen: true,
            filterPriceOpen: true,
            filterSizeOpen: true
        }
    },
    methods: {
        getSrc(name) {
            return new URL(`/src/assets/images/catalog/${name}`, import.meta.url).href
        }
    },
    computed: {
        sortedFurs() {
            if (this.sortBy === 'OrdersDesc') {
                return [...this.furs].sort((a, b) => b.Orders - a.Orders);
            } else if (this.sortBy === 'OrdersAsc') {
                return [...this.furs].sort((a, b) => a.Orders - b.Orders);
            } else if (this.sortBy === 'PriceDesc') {
                return [...this.furs].sort((a, b) => b.Price - a.Price);
            } else if (this.sortBy === 'PriceAsc') {
                return [...this.furs].sort((a, b) => a.Price - b.Price);
            }
        },
        sortedAndSearchedFurs() {
            return this.sortedFurs.filter(item => {
                return item.Name.toLowerCase().includes(this.searchQuery.toLowerCase())
            });
        },
    },
}
</script>

<style lang="scss" scoped>
    .line {
        width: 100%;
        height: 7px;
        background-color: #F5ED2A;
        margin-top: 10px;
    }
    .catalog {
        width: 100%;
    }
    .catalog_sort {
        display: flex;
        justify-content: space-between;
        margin-top: 12px;
        width: 100%;
        padding: 0 0px;
        .price_and_popular {
            display: flex;
            width: 100%;
            max-width: 390px;
            justify-content: space-between;
            border-bottom: 1px solid rgba(34, 34, 34, 0.33);
            padding-bottom: 30px;
        }
        .price, .popular {
            display: flex;
            align-items: center;
            div:first-child {
                margin-right: 20px;
                font-family: 'Montserrat';
                font-weight: 700;
                font-size: 15px;
                letter-spacing: -0.02em;
                color: #222222;
            }
            img {
                cursor: pointer;
            }
            img:last-child {
                transform: rotate(180deg);
                margin-right: 10px;
            }
        }
        .search {
            width: 100%;
            max-width: 390px;
            .keywords {
                font-family: 'Montserrat';
                font-weight: 700;
                font-size: 13px;
                line-height: 140.9%;
                text-align: justify;
                letter-spacing: -0.02em;
                color: rgba(34, 34, 34, 0.6);
                margin-top: 4px;
                margin-bottom: -20px;
                span {
                    text-decoration: underline;
                    margin-left: 7px;
                    cursor: pointer;
                }
            }
        }
    }
    .cards_and_filter {
        display: flex;
        margin-top: 60px;
        margin-bottom: 80px;
        justify-content: space-between;
    }
    .filter {
        min-width: 141px;
        max-width: 141px;
        height: 388px;
        position: sticky;
        top: 10px;
        font-family: 'Montserrat';
        font-weight: 700;
        font-size: 16px;
        letter-spacing: -0.02em;
        color: #222222;
        .filter_type {
            > .options {
                font-size: 13px;
                > p {
                    margin-top: 10px;
                }
            }
        }
        .filter_price {
            > .options {
                > div {
                    font-size: 13px;
                    color: #666;
                    margin-top: 10px;
                }
                input {
                    width: 57px;
                    height: 21px;
                    border: 1px solid #222222;
                    margin-left: 10px;
                }
            }
        }
        .filter_size {
            font-family: 'Montserrat';
            font-weight: 700;
            font-size: 15px;
            letter-spacing: -0.02em;
            color: #222222;
            > .options {
                display: flex;
                flex-wrap: wrap;
                text-transform: uppercase;
                > div {
                    border: 1px solid #666666;
                    margin-right: 28px;
                    padding: 0 7px;
                    margin-top: 15px;
                }
            }
        }

        .filter_line {
            width: 100%;
            height: 1px;
            background-color: rgba(34, 34, 34, 0.33);
            margin: 15px 0;
        }
    }
    .filter_type, .filter_price, .filter_size {
        transition: 300ms ease-out;
        overflow: hidden;
        cursor: pointer;
        user-select: none;
        > .title {
            position: relative;
            max-width: fit-content;
            &::before, &::after {
                content: '';
                position: absolute;
                top: 7px;
                height: 2px;
                width: 16px;
                right: -24px;
                background-color: #222;
                transition: 500ms;
            }
            &::before {
                transform: translateY(50%) rotate(36deg);
            }
            &::after {
                transform: translateY(50%) rotate(-36deg);
            }
        }
        > .filter_close {
            &::before, &::after {
                width: 10px;
                right: -24px;
            }
            &::before {
                right: -18px;
                transform: translateY(50%) rotate(36deg);
            }
            &::after {
                right: -26px;
                transform: translateY(50%) rotate(-36deg);
            }
        }
    }

    .catalog_cards {
        list-style: none;
        display: flex;
        gap: 40px;
        flex-wrap: wrap;
        justify-content: center;
        overflow: hidden;
        transition: all 0.3s ease;
        max-width: 830px;
    }
    .card {
        display: flex;
        flex-direction: column;
        width: 250px;
        height: 423px;
        border: 1px solid black;
        background-color: white;
        overflow: hidden;
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
    }
    .extra_info {
        font-family: 'Montserrat';
        font-size: 30px;
        margin-top: 70px;
        height: 34.5px;
    }
    .card, .extra_info {
        transition: all 0.3s ease;
    }

    .list-enter-from,
    .list-leave-to {
        opacity: 0;
        // height: 0px;
    }

    .list-leave-active {
        position: absolute;
    }
</style>