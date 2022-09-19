<template>
    <section class="catalog">
        <div class="catalog_title">
            <div class="yellow_line"></div>
            <h2>Каталог</h2>
            <div class="yellow_line"></div>
        </div>
        <div class="catalog_filter">
            <div class="price">
                <div>Цена</div>
                <img src="../assets/images/catalog/ant-design_arrow-up-outlined.svg" alt="arrow">
                <img src="../assets/images/catalog/ant-design_arrow-up-outlined.svg" alt="arrow">
            </div>
            <div class="popular">
                <div>Популярность</div>
                <img src="../assets/images/catalog/ant-design_arrow-up-outlined.svg" alt="arrow">
                <img src="../assets/images/catalog/yellow-ant-design_arrow-up-outlined.svg" alt="arrow">
            </div>
            <div class="search">
                <div class="input_btn">
                    <input type="text" placeholder="Введите запрос">
                    <div class="btn">Поиск</div>
                </div>
                <div class="keywords">
                    Ключ. слова: <span>Шуба</span> <span>Леопард</span> <span>Дублёнка</span>
                </div>
            </div>
            <div class="line"></div>
        </div>
        <ul class="catalog_cards">
            <li class="card">
                <img src="../assets/images/catalog/alireza-skndari-q0wjrPa_d2o-unsplash 1.jpg" alt="fur">
                <a class="title" href="#"><strong>Шуба из исскуственного меха</strong></a>
                <p class="size">m / xl</p>
                <div class="card_bottom">
                    <span>250.000 тг</span>
                    <a class="cart_btn" ><img src="../assets/images/catalog/ri_shopping-cart-2-line.svg" alt="cart-icon"></a>
                </div>
            </li>
            <li class="card">
                <img src="../assets/images/catalog/chase-fade-JgmPDzGDgTw-unsplash 2.jpg" alt="fur">
                <a class="title" href="#"><strong>Дублёнка из исскуственного меха </strong></a>
                <p class="size">m / xl</p>
                <div class="card_bottom">
                    <span>150.000 тг</span>
                    <a class="cart_btn" ><img src="../assets/images/catalog/ri_shopping-cart-2-line.svg" alt="cart-icon"></a>
                </div>
            </li>
            <li class="card">
                <img src="../assets/images/catalog/gerardo-marrufo-YkEtgQkPlso-unsplash 2.jpg" alt="fur">
                <a class="title" href="#"><strong>Шуба из исскуственного меха</strong></a>
                <p class="size">m / xl</p>
                <div class="card_bottom">
                    <span>250.000 тг</span>
                    <a class="cart_btn" ><img src="../assets/images/catalog/ri_shopping-cart-2-line.svg" alt="cart-icon"></a>
                </div>
            </li>
            <li class="card">
                <img src="../assets/images/catalog/kevin-sicher-KaB0cfqiuPQ-unsplash 2.jpg" alt="fur">
                <a class="title" href="#"><strong>Шуба из натурального меха</strong></a>
                <p class="size">m / xl</p>
                <div class="card_bottom">
                    <span>550.000 тг</span>
                    <a class="cart_btn" ><img src="../assets/images/catalog/ri_shopping-cart-2-line.svg" alt="cart-icon"></a>
                </div>
            </li>
            <li class="card">
                <img src="../assets/images/catalog/nikita-tumbaev-lTQSu5Omd7w-unsplash 1.jpg" alt="fur">
                <a class="title" href="#"><strong>Шуба из исскуственного меха</strong></a>
                <p class="size">m / xl</p>
                <div class="card_bottom">
                    <span>250.000 тг</span>
                    <a class="cart_btn" ><img src="../assets/images/catalog/ri_shopping-cart-2-line.svg" alt="cart-icon"></a>
                </div>
            </li>
            <li class="card">
                <img src="../assets/images/catalog/ronny-sison-tlu2JFV4RzQ-unsplash 1.jpg" alt="fur">
                <a class="title" href="#"><strong>Шуба из исскуственного меха</strong></a>
                <p class="size">m / xl</p>
                <div class="card_bottom">
                    <span>250.000 тг</span>
                    <a class="cart_btn" ><img src="../assets/images/catalog/ri_shopping-cart-2-line.svg" alt="cart-icon"></a>
                </div>
            </li>
        </ul>
        <a class="load_more-btn" href="#">Загрузить ещё</a>
    </section>
</template>

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
                    width: 103px;
                    font-family: 'Montserrat';
                    font-weight: 700;
                    font-size: 15px;
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
    }
    .card {
        display: flex;
        flex-direction: column;
        width: 250px;
        border: 1px solid black;
        > img {
            width: 100%;
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
</style>