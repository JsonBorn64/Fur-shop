<template>
    <section class="catalog" id="catalog">
        <div class="catalog_title">
            <div class="yellow_line"></div>
            <h2>Каталог</h2>
            <div class="yellow_line"></div>
        </div>
        <div class="catalog_filter">
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
            <div class="search">
                <div class="input_btn">
                    <input v-model="searchQuery" placeholder="Введите запрос" ref="searchInput">
                    <div class="btn" @click="searchQuery = ''">Очистить</div>
                </div>
                <div class="keywords">
                    Ключ. слова:
                    <span @click="searchQuery = 'Шуба'">Шуба</span>
                    <span @click="searchQuery = 'Леопард'">Леопард</span>
                    <span @click="searchQuery = 'Дублёнка'">Дублёнка</span>
                </div>
            </div>
            <div class="line"></div>
        </div>
        <ul class="catalog_cards">
            <transition-group name="list">
                <li class="card" v-for="item in sortedAndSearchedFurs" :key="item.id">
                    <img :src="getSrc(item?.Images[0])" alt="fur">
                    <router-link :to="`/item/${item.id}/#header`" class="title">
                        <strong>{{item.Name}}</strong>
                    </router-link>
                    <p class="size">{{item.Size.join(' / ')}}</p>
                    <div class="card_bottom">
                        <span>{{new Intl.NumberFormat('de-DE').format(item.Price)}} тг</span>
                        <a class="cart_btn" ><img src="@/assets/images/catalog/ri_shopping-cart-2-line.svg" alt="cart-icon"></a>
                    </div>
                </li>
                <p v-if="sortedAndSearchedFurs.length < 1 && this.$store.state.fursLoaded" class="extra_info">Ничего не найдено</p>
                <p v-if="!this.$store.state.fursLoaded" class="extra_info">Загрузка...</p>
            </transition-group>
        </ul>
        <!-- <a v-if="goods.length > 0" class="load_more-btn" href="#">Загрузить ещё</a> -->
    </section>
</template>

<script>
    export default {
        data() {
            return {
                furs: this.$store.state.furs,
                sortBy: 'OrdersDesc',
                searchQuery: ""
            }
        },
        methods: {
            getSrc(name) {
                const path = `/src/assets/images/catalog/${name}`;
                const modules = import.meta.globEager("/src/assets/images/catalog/*");
                return modules[path].default;
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
        }
    }
</script>

<style lang="scss" scoped>
    .catalog {
        margin-top: 170px;
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .catalog_title {
        display: flex;
        align-items: center;
        width: 100%;
        h2 {
            justify-content: space-between;
            font-family: 'Druk Cyr';
            font-weight: 500;
            font-size: 64px;
            text-transform: uppercase;
            color: #222222;
            margin: 0 35px;
        }
        .yellow_line {
            height: 10px;
            width: 100%;
            background: #F5ED2A;
        }
    }

    .catalog_filter {
        display: flex;
        justify-content: space-between;
        margin-top: 33px;
        width: 100%;
        max-width: 896px;
        padding: 0 10px;
        .price, .popular {
            display: flex;
            align-items: center;
            div:first-child {
                margin-right: 10px;
                font-family: 'Montserrat';
                font-weight: 700;
                font-size: 15px;
                letter-spacing: -0.02em;
                text-transform: uppercase;
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
            max-width: 435px;
            .input_btn {
                width: 100%;
                display: flex;
                height: 49px;
                > input {
                    width: 100%;
                    border: 1px solid black;
                    border-radius: 0px;
                    font-family: 'Montserrat';
                    font-weight: 700;
                    font-size: 15px;
                    letter-spacing: -0.02em;
                    color: #666666;
                    padding-left: 10px;
                }
                > div {
                    background: #F5ED2A;
                    display: grid;
                    place-content: center;
                    width: 133px;
                    font-family: 'Montserrat';
                    font-weight: 700;
                    font-size: 14px;
                    letter-spacing: -0.02em;
                    text-transform: uppercase;
                    color: #222222;
                    border: 1px solid black;
                    margin-left: -1px;
                    cursor: pointer;
                }
            }
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

    .catalog_cards {
        list-style: none;
        margin-top: 70px;
        display: flex;
        gap: 73px;
        flex-wrap: wrap;
        justify-content: center;
        transition: all 0.3s ease;
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

    .load_more-btn {
        width: 215px;
        height: 48px;
        font-family: 'Montserrat';
        font-weight: 700;
        font-size: 15px;
        line-height: 21px;
        text-align: justify;
        letter-spacing: -0.02em;
        text-transform: uppercase;
        color: #222222;
        margin-top: 84px;
        background: #F5ED2A;
        display: grid;
        place-content: center;
    }

    .line {
        display: none;
        width: 90%;
        height: 1px;
        background: black;
        margin-top: 34px;
        margin-bottom: 14px;
    }

    @media (max-width: 660px) {
        .catalog_filter {
            flex-wrap: wrap;
            .search {
                order: 1;
                max-width: none;
            }
            .price {
                order: 3;
            }
            .popular {
                order: 4;
                img:last-child {
                    margin-right: 0;
                }
            }
        }
        .line {
            display: flex;
            margin-left: auto;
            margin-right: auto;
            order: 2;
        }
    }

    @media (max-width: 600px) {
        .catalog_cards {
            gap: 20px;
            margin-top: 40px;
        }
        .card {
            width: 156px;
            height: 284px;
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
        .load_more-btn {
            margin-top: 42px;
        }
    }

    @media (max-width: 535px) {
        .card:nth-child(n+5) {
            visibility: hidden;
            opacity: 0;
            height: 0;
        }
    }

    @media (max-width: 400px) {
        .search {
            .input_btn {
                height: 41px !important;
                > input, div {
                    font-size: 12px !important;
                }
            }
        }
        .price, .popular {
            div {
                font-size: 12px !important;
            }
            img {
                width: 25px;
            }
        }
    }

    .card, .extra_info {
        transition: all 0.3s ease;
        display: flex;
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