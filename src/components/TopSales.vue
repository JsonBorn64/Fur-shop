<template>
    <section class="top_sales" v-show="$store.state.fursLoaded">
        <h2 class="top_sales-title">Топ продаж этого месяца</h2>
        <ul>
            <li class="card" v-for="item in $store.getters.topFurs(3)" :key="item.id">
                <img :src="`upload/${item?.Images[0]}`" alt="fur">
                <router-link :to="`/item/${item.id}/#header`" class="title"><strong>{{item.Name}}</strong></router-link>
                <p class="size">{{item.Size.join(' / ')}}</p>
                <div class="card_bottom">
                    <span>{{new Intl.NumberFormat('de-DE').format(item.Price)}} тг</span>
                    <a class="cart_btn" ><img src="@/assets/images/top_sales/ri_shopping-cart-2-line.svg" alt="cart-icon"></a>
                </div>
                <a class="cart_btn-big">В корзину</a>
                <router-link :to="`/item/${item.id}/#header`" class="mobile_btn-big">Перейти к товару</router-link>
                <router-link :to="`/item/${item.id}/#header`" class="mobile_btn"><img src="@/assets/images/top_sales/ri_arrow-right-up-line.svg" alt="arrow up"></router-link>
            </li>
        </ul>
    </section>
</template>

<script>
    export default {}
</script>

<style lang="scss" scoped>
    .top_sales {
        position: relative;
        margin-top: 170px;
        .top_sales-title {
            text-align: end;
            font-family: 'Druk Cyr';
            font-weight: 500;
            font-size: 64px;
            text-align: right;
            text-transform: uppercase;
            color: #222222;
            position: relative;
            white-space: nowrap;
            position: absolute;
            top: 4px;
            right: 0;
            margin: 0;
            &::before {
                content: url('../assets/images/top_sales/Rectangle2.svg');
                position: absolute;
                top: -4px;
                left: -87px;
                z-index: -1;
            }
        }
        ul {
            list-style: none;
            display: flex;
            align-items: flex-end;
            gap: 50px;
        }
        @media (max-width: 540px) {
            margin-top: 60px;
        }
    }
    .card {
        display: flex;
        flex-direction: column;
        width: 250px;
        &:first-child {
            width: 445px;
            .card_bottom {
                margin-top: 10px;
            }
            .cart_btn {
                display: none;
            }
            .cart_btn-big {
                display: grid;
            }
        }
        &:not(:first-child) {
            > img {
                max-height: 250px;
                @media (max-width: 1060px) {
                    max-height: 275.5px;
                }
                @media (max-width: 620px) {
                    max-height: calc(50vw - 30px);
                }
            }
            .title {
                height: 42px;
            }
        }
        > img {
            width: 100%;
            object-fit: cover;
            max-height: 445px;
            @media (max-width: 1060px) {
                max-height: 580px;
            }
        }
        .title {
            width: 100%;
            font-family: 'Montserrat';
            font-size: 15px;
            line-height: 21px;
            text-align: justify;
            letter-spacing: -0.02em;
            text-transform: uppercase;
            color: #222222;
            float: left;
            margin-top: 4px;
            height: 25px;
            overflow: hidden;
            text-overflow: ellipsis;
        }
        .size {
            font-family: 'Montserrat';
            font-weight: 700;
            font-size: 15px;
            line-height: 21px;
            text-align: justify;
            letter-spacing: -0.02em;
            text-transform: lowercase;
            color: #222222;
            margin-top: 5px;
        }
        span {
            font-family: 'Montserrat';
            font-weight: 700;
            font-size: 15px;
            line-height: 21px;
            text-align: justify;
            letter-spacing: -0.02em;
            text-transform: uppercase;
            color: rgba(34, 34, 34, 0.6);
        }
        .card_bottom {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-top: 4px;
        }
        .cart_btn {
            width: 40px;
            height: 40px;
            background: #F5ED2A;
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;
        }
        .cart_btn-big {
            width: 215px;
            height: 48px;
            background: #F5ED2A;
            display: none;
            place-content: center;
            font-family: 'Montserrat';
            font-weight: 700;
            font-size: 15px;
            line-height: 21px;
            text-align: justify;
            letter-spacing: -0.02em;
            text-transform: uppercase;
            color: #222222;
            margin-top: 16px;
            margin-bottom: -34px;
            cursor: pointer;
        }
    }

    .mobile_btn-big {
        display: none;
        cursor: pointer;
        place-content: center;
        width: 215px;
        height: 48px;
        background: #F5ED2A;
        font-family: 'Montserrat';
        font-weight: 700;
        font-size: 15px;
        text-align: justify;
        letter-spacing: -0.02em;
        text-transform: uppercase;
        color: #222222;
        position: absolute;
        bottom: -7px;
        left: -12px;
    }

    .mobile_btn {
        display: none;
        place-content: center;
        cursor: pointer;
        background: #F5ED2A;
        width: 40px;
        height: 40px;
        position: absolute;
        bottom: -6px;
        right: -5px;
    }

    @media (max-width: 1060px) {
        .top_sales {
            max-width: 600px;
            padding-top: 140px;
            line-height: 81px;
            .top_sales-title {
                text-align: center;
                right: 50%;
                transform: translateX(50%);
                &::before {
                    top: -9px;
                    left: -18px;
                }
            }
            ul {
                gap: 0;
                flex-wrap: wrap;
                align-items: flex-start;
                justify-content: space-between;
                padding: 0 10px;
            }
        }

        .card {
            width: 47.5%;
            position: relative;
            .title, .size, .card_bottom, .cart_btn-big {
                display: none !important;
            }
        }
        .card:first-child {
            width: 100%;
            margin-bottom: 8%;
            .mobile_btn-big {
                display: grid;

            }
        }
        .card:not(:first-child) {
            .mobile_btn {
                display: grid;
            }
        }
        
    }

    @media (max-width: 500px) {
        .top_sales {
            padding-top: 210px;
        }
        .top_sales-title {
            width: 300px;
            white-space: normal !important;
            &::before {
                left: 28px !important;
            }
        }
    }
</style>