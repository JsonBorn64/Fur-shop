<template>
    <section class="subscribe">
        <div class="text">
            Заполните форму чтобы узнавать первым об акциях и скидках
        </div>
        <form @submit.prevent="" ref='subscribeForm'>
            <input type="text" placeholder="Введите имя" name="name" min="2" required>
            <input type="email" placeholder="Введите почту" name="email" required>
            <button class="form_btn" type="submit">Отправить</button>
        </form>
        <div class="decore"></div>
    </section>
</template>

<script>
export default {
    methods: {

    }
}
</script>

<style lang="scss" scoped>
    .subscribe {
        padding: 80px 64px;
        position: relative;
        max-width: 900px;
        background: #222222;
        display: flex;
        margin-top: 80px;
        .text {
            width: 401px;
            height: 210px;
            font-family: 'Druk Cyr';
            font-weight: 500;
            font-size: 55px;
            line-height: 70px;
            text-align: right;
            text-transform: uppercase;
            color: #F8F8F8;
            width: 376px;
            margin-right: 40px;
        }
        form {
            width: 363px;
            padding: 16px 0;
            input {
                width: 100%;
                height: 50px;
                margin-bottom: 15px;
                border: 1px solid #F8F8F8;
                font-family: 'Montserrat';
                font-weight: 400;
                font-size: 15px;
                line-height: 119.18%;
                color: #F8F8F8;
                background: #222222;
                padding: 0 27px;
                &::placeholder {
                    color: #F8F8F8;
                }
            }
            .form_btn {
                width: 235px;
                height: 50px;
                background: #F5ED2A;
                font-family: 'Montserrat';
                font-weight: 700;
                font-size: 15px;
                text-transform: uppercase;
                color: #222222;
                display: grid;
                place-content: center;
                margin: 0 auto;
                border: none;
                cursor: pointer;
            }
        }
        .decore {
            height: 60px;
            width: 3000px;
            background: #F5ED2A;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            z-index: -10;
        }
        @media (max-width: 920px) {
            flex-direction: column;
            align-items: center;
            .text {
                text-align: center;
                margin-right: 0;
                margin-bottom: 50px;
            }
        }
        @media (max-width: 530px) {
            width: 100%;
            padding: 40px 32px;
            .text {
                width: 100%;
                font-size: 40px;
                line-height: 55px;
                margin-bottom: 20px;
                height: auto;
            }
            form {
                width: 100%;
            }
        }
    }
</style>