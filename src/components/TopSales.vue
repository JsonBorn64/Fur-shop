<template>
    <section class="top_sales">
        <h2 class="top_sales-title">Топ продаж этого месяца</h2>
        <ul>
            <li class="card">
                <img src="../assets/images/top sales/kevin-sicher-KaB0cfqiuPQ-unsplash 1.jpg" alt="fur">
                <a class="title" href="#"><strong>Шуба из исскуственного меха (гепард)</strong></a>
                <p class="size">m / xl</p>
                <div class="card_bottom">
                    <span>250.000 тг</span>
                    <a class="cart_btn" ><img src="../assets/images/top sales/ri_shopping-cart-2-line.svg" alt="cart-icon"></a>
                </div>
                <a class="cart_btn-big">В корзину</a>
            </li>
            <li class="card">
                <img src="../assets/images/top sales/gerardo-marrufo-YkEtgQkPlso-unsplash 1.jpg" alt="fur">
                <a class="title" href="#"><strong>Шуба из исскуственного меха (гепард)</strong></a>
                <p class="size">m / xl</p>
                <div class="card_bottom">
                    <span>250.000 тг</span>
                    <a class="cart_btn"><img src="../assets/images/top sales/ri_shopping-cart-2-line.svg" alt="cart-icon"></a>
                </div>
                <a class="cart_btn-big">В корзину</a>
            </li>
            <li class="card">
                <img src="../assets/images/top sales/chase-fade-JgmPDzGDgTw-unsplash 1.jpg" alt="fur">
                <a class="title" href="#"><strong>Шуба из исскуственного меха</strong></a>
                <p class="size">m / xl</p>
                <div class="card_bottom">
                    <span>250.000 тг</span>
                    <a class="cart_btn"><img src="../assets/images/top sales/ri_shopping-cart-2-line.svg" alt="cart-icon"></a>
                </div>
                <a class="cart_btn-big">В корзину</a>
            </li>
        </ul>
    </section>
</template>

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
                content: url('../assets/images/top sales/Rectangle 2.svg');
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
        > img {
            width: 100%;
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
</style>