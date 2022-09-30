<template>
    <footer class="footer">
        <div class="left">
            <div class="row1">
                <router-link to="/" class="link">Главная</router-link>
                <img src="../assets/images/footer/ri_heart-line.svg" alt="heart">
            </div>
            <div class="row2">
                <router-link to="/#about_us" class="link">О нас</router-link>
                <img src="../assets/images/footer/ri_shopping-cart-2-line.svg" alt="cart">
            </div>
            <div class="row3">
                <router-link to="/#catalog" class="link">Каталог</router-link>
                <img src="../assets/images/footer/ri_user-line.svg" alt="user">
            </div>
        </div>
        <img class="logo" src="../assets/images/footer/Vector.svg" alt="logo">
        <div class="right">
            <img src="../assets/images/footer/8fa4e768-f93a-45c4-9f72-3bc5d2b830fe_1.jpg" alt="">
        </div>
    </footer>
</template>

<style lang="scss" scoped>
    .footer {
        margin-top: 120px;
        height: 284px;
        width: 100%;
        max-width: 870px;
        background: #222;
        box-shadow: 0 1000px 0 1000px #222;
        display: flex;
        justify-content: space-between;
        align-items: center;
        @media (max-width: 980px) {
            justify-content: space-around;
        }
    }

    .left {
        display: flex;
        flex-direction: column;
        gap: 26px;
        width: 210px;
        > div {
            display: flex;
            justify-content: space-between;
            align-items: center;
            width: 100%;
            .link {
                font-family: 'Montserrat';
                font-weight: 700;
                font-size: 15px;
                letter-spacing: -0.02em;
                color: #F8F8F8;
            }
        }
    }

    .logo {
        @media (max-width: 760px) {
            display: none;
        }
    }

    .right {
        @media (max-width: 580px) {
            display: none;
        }
    }
</style>