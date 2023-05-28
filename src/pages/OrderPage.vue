<template>
    <header-comp />
    <bread-crumps-search />
    <section class="checkpoints">
        <div class="line"></div>
        <div class="points">
            <div class="point" :class="{ 'point-yellow': stage == 0 ? true : false }">Адрес доставки</div>
            <div class="point" :class="{ 'point-yellow': stage == 1 ? true : false }">Способ оплаты</div>
            <div class="point" :class="{ 'point-yellow': stage == 2 ? true : false }">Подтвер&shy;ждение</div>
            <div class="point" :class="{ 'point-yellow': stage == 3 ? true : false }">Готово</div>
        </div>
    </section>
    <section class="screens">
        <div class="screen-1 anim" v-if="stage == 0">
            <form class="user-info_form" @submit.prevent="stage = 1">
                <input v-model="formData.name" type="text" placeholder="ФИО получателя" required>
                <input v-model="formData.email" type="email" placeholder="Email" required>
                <input v-model="formData.tel" type="tel" placeholder="Мобильный телефон" required>
                <input v-model="formData.country" type="text" placeholder="Страна" required>
                <div class="city_group">
                    <input v-model="formData.city" type="text" placeholder="Город" required>
                    <input v-model="formData.zip" type="number" placeholder="Почтовый индекс" required>
                </div>
                <div class="numbers_group">
                    <input v-model="formData.street" type="text" placeholder="Улица" required>
                    <input v-model="formData.number" type="number" placeholder="Номер" required>
                    <input v-model="formData.apart" type="number" placeholder="Кварт.">
                </div>
                <input v-model="formData.comment" type="text" placeholder="Комментарий">
                <button type="submit">Сохранить и продолжить</button>
            </form>
        </div>
        <div class="screen-2 anim" v-if="stage == 1">
            <div class="pay_methods">
                <div class="method">
                    <div class="text">
                        <p>Наложенный платёж</p>
                        <p>Оплата на кассе, в почтовом отделении.</p>
                    </div>
                    <button @click="stage = 2; formData.payMethod = 'Наложенный платёж'">Выбрать</button>
                </div>
                <div class="method">
                    <div class="text">
                        <p>Наличными</p>
                        <p>Оплата наличными курьеру, при получении.</p>
                    </div>
                    <button @click="stage = 2; formData.payMethod = 'Наличными'">Выбрать</button>
                </div>
                <div class="method">
                    <div class="text">
                        <p>Платёжная карта (POS-терминал)</p>
                        <p>Оплата картой курьеру, при получении.</p>
                    </div>
                    <button @click="stage = 2; formData.payMethod = 'Платёжная карта (POS-терминал)'">Выбрать</button>
                </div>
            </div>
        </div>
        <div class="screen-3 anim" v-if="stage == 2">
            <hr>
            <div class="user-info">
                <div class="adress">
                    <p>Адрес доставки <span @click="stage = 0">Изменить</span></p>
                    <div class="adress_wrapper">
                        <p>{{ formData.name }}</p>
                        <p>{{ formData.email }}</p>
                        <p>{{ formData.tel }}</p>
                        <p>{{ formData.country }}</p>
                        <p>{{ formData.city }}</p>
                        <p>ул. {{ formData.street }}, {{ formData.number }}<span v-if="formData.apart">,
                                кв.{{ formData.apart }}</span></p>
                        <p>{{ formData.zip }}</p>
                        <p>{{ formData.comment }}</p>
                    </div>
                    <span @click="stage = 0">Изменить</span>
                </div>
                <div class="pay">
                    <p>Способ оплаты <span @click="stage = 1">Изменить</span></p>
                    <p>{{ formData.payMethod }}</p>
                    <span @click="stage = 1">Изменить</span>
                </div>
                <button @click="sendForm">Подтвердить заказ</button>
            </div>
            <div class="goods">
                <ul class="list">
                    <li v-for="item in formData.items">
                        <img :src="`upload/${item.Images[0]}`" alt="img">
                        <div class="wrapper">
                            <p>{{ item.Name }}</p>
                            <div class="size">{{ item.Size }}</div>
                            <div class="price">{{ new Intl.NumberFormat('ru-RU').format(item.Price) }} <span>тг</span>
                            </div>
                        </div>
                    </li>
                </ul>
                <div class="total">
                    Сумма заказа: <span>{{ new Intl.NumberFormat('ru-RU').format(totalPrice) }} <span>тг</span></span>
                </div>
            </div>
            <button @click="sendForm">Подтвердить заказ</button>
        </div>
        <div class="screen-4 anim" v-if="stage == 3">
            <p>ЗАКАЗ УСПЕШНО ОФОРМЛЕН</p>
            <div>
                <img src="../assets/images/decore_section/Vector.svg" alt="ok">
            </div>
        </div>
    </section>
    <footer-comp />
</template>

<script>
import HeaderComp from '@/components/HeaderComp.vue';
import BreadCrumpsSearch from '@/components/BreadCrumpsSearch.vue';
import FooterComp from '@/components/FooterComp.vue';

export default {
    components: { HeaderComp, FooterComp, BreadCrumpsSearch },
    data() {
        return {
            stage: 0,
            formData: {
                name: this.$store.state.userName || '',
                email: this.$store.state.userEmail || '',
                tel: '',
                country: '',
                city: '',
                street: '',
                number: '',
                apart: '',
                zip: '',
                comment: '',
                payMethod: '',
                items: JSON.parse(localStorage.getItem('order'))
            },
        }
    },
    computed: {
        totalPrice() {
            return this.formData.items.reduce((prev, current) => prev + current.Price, 0);
        }
    },
    methods: {
        sendForm() {
            this.$store.commit('setFursLoaded', false)
            this.formData.totalPrice = this.totalPrice
            const body = JSON.stringify(this.formData)
            fetch('/php/sendForm.php', {
                method: 'POST',
                body: body,
                headers: { 'Content-Type': 'application/json' }
            }).then(res => {
                if (res.ok) this.stage = 3, this.$store.commit('setFursLoaded', true)
            }).catch(error => {
                this.$store.commit('setFursLoaded', true)
                this.$store.commit('setAlert', ['Ошибка отправления заказа', 'red'])
                console.error(error);
            });

        }
    }
}
</script>

<style lang="scss" scoped>
.screens {
    width: 100%;
}

.checkpoints {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    max-width: 730px;
    width: 100%;
    margin-top: 60px;
    font-family: 'Montserrat';
    font-weight: 700;
    font-size: 15px;
    letter-spacing: -0.02em;
    color: #666;
    @media (max-width: 741px) {
        margin-top: 110px;
    }
    @media (max-width: 500px) {
        margin-top: 160px;
    }

    .line {
        background: #DBDBDB;
        height: 6px;
        width: calc(100% - 120px);
        margin-bottom: 21px;
        @media (max-width: 500px) {
            width: 78%;
        }
    }

    .points {
        width: 100%;
        display: flex;
        justify-content: space-between;
        .point {
            position: relative;
            text-align: center;
            width: 131px;
            &::before {
                content: '';
                position: absolute;
                top: -30px;
                left: calc(50% - 6px);
                width: 12px;
                height: 12px;
                background-color: #DBDBDB;
            }
            &:nth-child(even) {
                @media (max-width: 500px) {
                    transform: translateY(-80px);
                    display: flex;
                    align-items: flex-end;
                    justify-content: center;
                    &::before {
                        top: 50px;
                    }
                }
            }
        }
        .point-yellow {
            color: #222;
            &::before {
                background-color: #F5ED2A;
            }
        }
    }
}

.user-info_form {
    display: flex;
    flex-direction: column;
    margin: 0 auto;
    margin-top: 70px;
    max-width: 500px;

    >* {
        margin-bottom: 24px;
    }

    input {
        border: 1px solid #222222;
        padding-left: 18px;
        height: 48px;
        font-family: 'Montserrat';
        font-weight: 400;
        font-size: 13px;
        letter-spacing: -0.02em;
    }

    input::placeholder {
        color: rgba(34, 34, 34, 0.44);
    }

    button {
        width: 256px;
        height: 40px;
        background: #F5ED2A;
        border: none;
        font-family: 'Montserrat';
        font-weight: 700;
        font-size: 15px;
        color: #222222;
        margin-bottom: 55px;
        cursor: pointer;
    }

    .city_group {
        display: flex;
        justify-content: space-between;

        >input:first-child {
            width: calc(100% - 179px);
        }

        >input:last-child {
            width: 155px;
        }
    }

    .numbers_group {
        display: flex;
        justify-content: space-between;

        >input:first-child {
            width: calc(100% - 168px);
        }

        >input:not(:first-child) {
            min-width: 60px;
            max-width: 60px;
            padding: 6px;
        }

        /* Chrome, Safari, Edge, Opera */
        >input:not(:first-child)::-webkit-outer-spin-button,
        >input:not(:first-child)::-webkit-inner-spin-button {
            -webkit-appearance: none;
            margin: 0;
        }

        /* Firefox */
        >input:not(:first-child)[type=number] {
            appearance: textfield;
        }
    }
}

.screen-2 {
    width: 100%;
}

.pay_methods {
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 500px;
    margin: 0 auto;
    margin-top: 80px;

    .method {
        display: flex;
        justify-content: space-between;
        margin-bottom: 55px;

        .text {
            p:first-child {
                font-weight: 700;
                font-size: 15px;
                letter-spacing: -0.02em;
                color: #222222;
                margin-bottom: 2px;
            }

            p:last-child {
                font-weight: 400;
                font-size: 13px;
                letter-spacing: -0.02em;
                color: rgba(34, 34, 34, 0.86);
            }
        }

        button {
            min-width: 115px;
            height: 40px;
            background: #F5ED2A;
            cursor: pointer;
            border: none;
            font-family: 'Montserrat';
            font-weight: 700;
            font-size: 15px;
            color: #222222;
            margin-left: 10px;
        }
    }
}

.screen-3 {
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin-top: 70px;
    margin-bottom: 100px;
    > hr {
        background: rgba(34, 34, 34, 0.33);
        height: 1px;
        width: 80%;
        margin-bottom: 16px;
        margin-top: -17px;
        @media (min-width: 700px) {
            display: none;
        }
    }
    > button {
        margin-top: 50px;
        width: 202px;
        height: 39px;
        background: #F5ED2A;
        box-shadow: 1px 1px 15px #F5ED2A;
        border: none;
        font-weight: 700;
        cursor: pointer;
        font-size: 15px;
        @media (min-width: 700px) {
            display: none;
        }
    }
    @media (max-width: 700px) {
        flex-direction: column;
        align-items: center;
    }
}

.user-info {
    @media (max-width: 700px) {
        width: 100%;
        display: flex;
        justify-content: space-evenly;
        margin-bottom: 42px;
    }
    > button {
        margin-top: 50px;
        width: 202px;
        height: 39px;
        background: #F5ED2A;
        box-shadow: 1px 1px 15px #F5ED2A;
        border: none;
        font-weight: 700;
        cursor: pointer;
        font-size: 15px;
        @media (max-width: 700px) {
            display: none;
        }
    }
}

.adress, .pay {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    font-family: 'Montserrat';
    font-weight: 700;
    @media (max-width: 700px) {
        align-items: baseline;
    }
    @media (max-width: 500px) {
        font-size: 13px;
    }
    > p {
        > span {
            font-weight: 400;
            font-size: 13px;
            letter-spacing: -0.02em;
            color: rgba(34, 34, 34, 0.86);
            border: 1px solid;
            padding: 2px 4px;
            margin-left: 8px;
            cursor: pointer;
            @media (max-width: 700px) {
                display: none;
            }
        }
    }
    > span {
        font-weight: 400;
        font-size: 13px;
        letter-spacing: -0.02em;
        color: rgba(34, 34, 34, 0.86);
        border: 1px solid;
        padding: 2px 4px;
        margin-left: 8px;
        cursor: pointer;
        margin-top: auto;
        @media (min-width: 700px) {
            display: none;
        }
        @media (max-width: 500px) {
            font-size: 13px;
        }
    }
    > .adress_wrapper {
        margin: 14px 0 0 6px;
        font-family: 'Montserrat';
        font-weight: 400;
        font-size: 15px;
        letter-spacing: -0.02em;
        color: #222222;
        > p {
            margin-bottom: 6px;
            @media (max-width: 500px) {
                font-size: 13px;
            }
        }
        > p:last-of-type {
            @media (max-width: 700px) {
                margin-bottom: 17px;
            }
        }
    }
}

.pay {
    margin-top: 22px;
    > p:last-of-type {
        margin: 14px 0 0 6px;
        font-family: 'Montserrat';
        font-weight: 400;
        font-size: 15px;
        letter-spacing: -0.02em;
        color: #222222;
        @media (max-width: 500px) {
            font-size: 13px;
        }
    }
    @media (max-width: 700px) {
        margin-top: 0;
    }
}

.list {
    >li {
        display: flex;
        flex-direction: row-reverse;
        margin-bottom: 20px;
        padding-bottom: 15px;
        border-bottom: 1px solid rgba(34, 34, 34, 0.33);
        @media (max-width: 700px) {
            flex-direction: row;
        }
        img {
            width: 150px;
            height: 150px;
            object-fit: cover;
            margin-left: 6px;
            @media (max-width: 700px) {
                margin-left: 0;
                margin-right: 15px;
            }
        }
        .wrapper {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            align-items: flex-end;
            font-family: 'Montserrat';
            font-weight: 700;
            font-size: 15px;
            max-width: 280px;
            text-align: right;
            @media (max-width: 700px) {
                text-align: left;
                align-items: flex-start;
            }
            p {
                @media (max-width: 500px) {
                    font-size: 13px;
                } 
            }
            .size {
                margin-bottom: auto;
                margin-top: 15px;
                text-transform: uppercase;
                border: 1px solid #222;
                padding: 1px 4px;
            }
            .price {
                font-weight: 500;
                font-size: 20px;
                letter-spacing: -0.02em;
                color: #A31414;
                > span {
                    font-size: 15px;
                    color: rgba(34, 34, 34, 0.6);
                    font-weight: 700;
                }
            }
        }
    }
}

.total {
    font-size: 15px;
    font-weight: 700;
    margin-left: 10px;
    margin-top: -10px;
    font-family: 'Montserrat';
    font-weight: 700;
    @media (max-width: 700px) {
        text-align: center;
    }
    > span {
        font-weight: 500;
        font-size: 20px;
        letter-spacing: -0.02em;
        color: #A31414;
        margin-left: 10px;
        > span {
            font-size: 15px;
            color: rgba(34, 34, 34, 0.6);
            font-weight: 700;
        }
    }
}

.screen-4 {
    display: grid;
    place-content: center;
    margin-top: 150px;
    margin-bottom: 150px;

    >p {
        font-family: 'Druk Cyr';
        font-weight: 500;
        font-size: 64px;
        letter-spacing: 0.025em;
        text-transform: uppercase;
        color: #222222;
        text-align: center;
    }

    >div {
        border: 8px solid #F5ED2A;
        border-radius: 50%;
        width: fit-content;
        padding: 20px 18px;
        margin: 60px auto 0 auto;
    }
}

.anim {
    animation: 300ms fadeInRight;
}

@keyframes fadeInRight {
    0% {
        opacity: 0;
        transform: translateX(100px);
    }

    100% {
        opacity: 1;
        transform: translateX(0px);
    }
}
</style>