<template>
    <header-comp/>
    <div class="bread_crumps_and_search">
        <div class="bread_crumps">
            <span>Каталог</span>
            <span>Шубы</span>
            <span>Искусственный мех</span>
        </div>
        <div class="search">
            <div class="input_btn">
                <input placeholder="Введите запрос" ref="searchInput">
                <div class="btn" @click="searchQuery = ''">Очистить</div>
            </div>
        </div>
    </div>
    <section class="card_product">
        <div class="photos_and_btns">
            <div class="photos">
                <img :src="`/src/assets/images/catalog/${specialFurById?.Img}`" alt="face photo">
                <img src="@/assets/images/card_product/gerardo-marrufo-wGVZdSZTHjg-unsplash2.jpg" alt="second photo">
                <img src="@/assets/images/card_product/gerardo-marrufo-YkEtgQkPlso-unsplash3.jpg" alt="second photo">
                <img src="@/assets/images/card_product/gerardo-marrufo-winMKop6bzQ-unsplash4.jpg" alt="second photo">
            </div>
            <div class="btns">
                <div class="cart_btn">В корзину</div>
                <div class="favorite_btn">Избранное <img src="@/assets/images/card_product/Vector.svg" alt="heart"></div>
            </div>
        </div>
        <div class="info">
            <div class="title">{{specialFurById?.Name}}</div>
            <div class="price">
                <div class="old">
                    <span>300 000 тг</span>
                    <span>-20%</span>
                </div>
                <div class="now">250 000 <span>тг</span></div>
            </div>
            <div class="sizes">
                <div>m</div>
                <div>xl</div>
            </div>
            <div class="sizes_table">Таблица размеров</div>
            <hr>
            <div class="about">
                <div>Описание</div>
                <p>Легкая, удобная в носке шуба, из искусственного меха, в расцветке гепард, подойдет для холодного сезона, так как обладает теплым непродуваемым подкладом из современных теплоизоляционных материалов.</p>
            </div>
        </div>
    </section>
    <div class="tabs">
        <div class="names">
            <div class="tab_name">Отзывы</div>
            <div class="tab_name tab_name-active">Характеристики</div>
            <div class="tab_name">Производство</div>
        </div>
    </div>
    <!-- <img :src="`/src/assets/images/catalog/${specialFurById?.Img}`" >
    <p>Название товара: {{specialFurById?.Name}}</p>
    <p>Размеры товара: {{specialFurById?.Size}}</p>
    <p>Цена товара: {{specialFurById?.Price}}</p>
    <p>Продан раз: {{specialFurById?.Orders}}</p>
    <p>Наличие штук на складе: {{specialFurById?.InStock}}</p> -->
    <footer-comp/>
</template>

<script>
import HeaderComp from '../components/HeaderComp.vue';
import FooterComp from '../components/FooterComp.vue';
export default {
    components: { HeaderComp, FooterComp },
    data() {
        return {
            furs: this.$store.state.furs
        }
    },
    computed: {
        specialFurById() {
            if (this.furs.length > 0) {
                return this.furs.find(fur => fur.id === this.$route.params.id)
            }
        }
    }
}
</script>

<style lang="scss" scoped>
    .bread_crumps_and_search {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        margin-top: 12px;
        .bread_crumps {
            font-family: 'Montserrat';
            font-weight: 700;
            font-size: 15px;
            letter-spacing: -0.02em;
            text-transform: capitalize;
            color: #666666;
            > span:not(:last-child) {
                margin-right: 21px;
                position: relative;
                &::after {
                    content: url('@/assets/images/card_product/Vector_3.svg');
                    position: absolute;
                    right: -13px;
                    top: -1px;
                }
            }
        }
    }
    .search {
        width: 100%;
        max-width: 390px;
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
    }

    .card_product {
        display: flex;
        width: 100%;
        justify-content: space-between;
        margin-top: 76px;
    }

    .photos_and_btns {
        display: flex;
        flex-direction: column;
        width: 100%;
        max-width: 525px;
        .photos {
            max-width: 525px;
            max-height: 390px;
            width: 100%;
            height: 100vh;
            display: flex;
            flex-direction: column;
            flex-wrap: wrap;
            justify-content: space-between;
            > img:first-child {
                height: 100%;
                max-width: 390px;
                max-height: 390px;
                margin-right: 25px;
            }
            > img:not(:first-child) {
                width: 100%;
                max-width: 114px;
            }
        }
    }

    .btns {
        display: flex;
        margin-top: 26px;
        font-family: 'Montserrat';
        font-weight: 700;
        font-size: 15px;
        letter-spacing: -0.02em;
        text-transform: uppercase;
        color: #222222;
        .cart_btn {
            display: grid;
            place-content: center;
            cursor: pointer;
            width: 187px;
            height: 52px;
            background: #F5ED2A;
            box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.1);
            margin-right: 16px;
        }
        .favorite_btn {
            display:flex;
            justify-content: center;
            align-items: center;
            width: 187px;
            height: 52px;
            cursor: pointer;
            border: 1px solid #222222;
            filter: drop-shadow(0px 1px 15px rgba(0, 0, 0, 0.1));
            > img {
                margin-left: 10px;
            }
        }
    }

    .info {
        width: 100%;
        max-width: 390px;
        .title {
            font-family: 'Montserrat';
            font-weight: 700;
            font-size: 30px;
            line-height: 140.9%;
            text-transform: uppercase;
            color: #222222;
        }
        .price {
            display: flex;
            flex-direction: column;
            margin-top: 24px;
            .old {
                font-family: 'Montserrat';
                font-weight: 700;
                font-size: 15px;
                letter-spacing: -0.02em;
                color: rgba(34, 34, 34, 0.6);
                > span:first-child {
                    text-decoration-line: line-through;
                    margin-right: 7px;
                }
            }
            .now {
                font-family: 'Montserrat';
                font-weight: 500;
                font-size: 24px;
                letter-spacing: -0.02em;
                color: #A31414;
                margin-top: 14px;
                > span {
                    font-family: 'Montserrat';
                    font-weight: 700;
                    font-size: 15px;
                    letter-spacing: -0.02em;
                    text-transform: lowercase;
                    color: rgba(34, 34, 34, 0.6);
                }
            }
        }
        .sizes {
            font-family: 'Montserrat';
            font-weight: 700;
            font-size: 15px;
            letter-spacing: -0.02em;
            text-transform: uppercase;
            color: #222222;
            display: flex;
            margin-top: 30px;
            > div {
                border: 1px solid #666666;
                margin-right: 28px;
                padding: 0 7px;
            }
        }

        .sizes_table {
            font-family: 'Montserrat';
            font-weight: 700;
            font-size: 15px;
            letter-spacing: -0.02em;
            text-decoration-line: underline;
            color: rgba(34, 34, 34, 0.6);
            margin-top: 25px;
            cursor: pointer;
        }
        hr {
            margin-top: 24px;
            border: none;
            height: 1px;
            background:  #222222;
        }
        .about {
            display: flex;
            flex-direction: column;
            margin-top: 24px;
            div {
                font-family: 'Montserrat';
                font-weight: 700;
                font-size: 15px;
                letter-spacing: -0.02em;
                color: rgba(34, 34, 34, 0.6);
            }
            p {
                font-family: 'Montserrat';
                font-weight: 700;
                font-size: 12px;
                line-height: 140.9%;
                text-align: justify;
                letter-spacing: -0.02em;
                color: #222222;
                position: relative;
                margin-top: 24px;
                -webkit-line-clamp: 4;
                -webkit-box-orient: vertical;
                overflow: hidden;
                display: -webkit-box;
                // &::after {
                //     content: 'Показать ещё';
                //     background-color: white;
                //     font-size: 12px;
                //     line-height: 140.9%;
                //     letter-spacing: -0.02em;
                //     text-decoration-line: underline;
                //     color: #666666;
                //     cursor: pointer;
                //     position: absolute;
                //     bottom: 0;
                //     right: 0;
                //     box-shadow: 0 40px 10px 40px white;
                // }
            }
        }
    }
    .tabs {
        width: 100%;
        margin-top: 82px;
        .names {
            width: 100%;
            border-top: 1px solid #222;
            display: flex;
            justify-content: space-between;
            .tab_name {
                font-family: 'Montserrat';
                font-weight: 700;
                font-size: 15px;
                letter-spacing: -0.02em;
                color: rgba(34, 34, 34, 0.6);
                margin-top: -2px;
                padding: 10px 40px;
                cursor: pointer;
            }
            .tab_name-active {
                border-top: 3px solid #222;
                color: #222;
            }
        }
    }
</style>