<template>
    <header-comp/>
    <bread-crumps-search/>
    <section class="profile">
        <div class="personal_data">
            <div class="sep_line"></div>
            <p class="fade">Личные данные</p>
            <div class="sep_line"></div>
            <p class="editable_icon" @blur="setUserName" ref="userName" contenteditable>{{$store.state.userName || 'Имя пользователя'}}</p>
            <div class="sep_line"></div>
            <p>pochta@mail.com</p>
            <div class="sep_line"></div>
            <form class="change_pass_form">
                <div>
                    <label class="editable_icon">Изменить пароль</label> <br>
                    <input type="password" v-model="password" placeholder="Введите пароль">
                </div>
                <div v-show="password.length > 5">
                    <label>Введите новый пароль повторно</label> <br>
                    <input type="password" v-model="password2" placeholder="Подтвердите пароль">
                </div>
            </form>
            <p style="color: red; margin: 10px 0 30px;" ref="red"></p>
            <p style="color: green; margin: 10px 0 30px;" ref="green"></p>
            <div class="save_btn" @click="setNewPassword">Сохранить</div>
        </div>
        <div class="pay_data">
            <p class="fade">Платёжные данные</p>
            <div class="sep_line"></div>
            <form class="pay_data_form" @submit.prevent="saveCard">
                <label>Номер карты</label> <br>
                <input type="number" v-model="card.number" minlength="1000000000000000" max="9999999999999999" placeholder="Fill the blank" required>
                <div>
                    <label>Срок действия</label>
                    <input type="text" v-model="card.validity" minlength="5" maxlength="5" placeholder="MM/HH" required>
                    <label>Security code</label>
                    <input type="number" v-model="card.securityCode" min="000" max="999" placeholder="Fill the blank" required>
                </div>
                <div>
                    <label>Имя</label>
                    <input type="text" v-model="card.firstName" placeholder="First name" required>
                    <label>Фамилия</label>
                    <input type="text" v-model="card.lastName" placeholder="Last name" required>
                </div>
                <p style="color: green; margin: 0" ref="green2"></p>
                <button class="save_btn" type="submit">Сохранить</button>
            </form>
        </div>
    </section>
    <footer-comp/>
</template>

<script>
import HeaderComp from '@/components/HeaderComp.vue';
import BreadCrumpsSearch from '@/components/BreadCrumpsSearch.vue';
import FooterComp from '@/components/FooterComp.vue';
import { getAuth, updatePassword, EmailAuthProvider, reauthenticateWithCredential, updateProfile } from "firebase/auth";
export default {
    components: { HeaderComp, BreadCrumpsSearch, FooterComp },
    data() {
        return {
            password: '',
            password2: '',
            card: {
                number: '',
                validity: '',
                securityCode: '',
                firstName: '',
                lastName: ''
            }
        }
    },
    methods: {
        setNewPassword() {
            this.$refs.red.innerHTML = "Загрузка..."

            if (this.password.length < 6) {
                this.$refs.red.innerHTML = "Минимальная длина пароля 6 символов"
                return
            }
            if (this.password !== this.password2) {
                this.$refs.red.innerHTML = "Пароли не совпадают"
                return
            }

            this.$refs.red.innerHTML = ''
            this.$refs.green.innerHTML = ''
            const auth = getAuth();
            const user = auth.currentUser;
            const userProvidedPassword = prompt("Введите текущий пароль")
            const credential = EmailAuthProvider.credential(
                auth.currentUser.email,
                userProvidedPassword
            )

            reauthenticateWithCredential(user, credential).then(() => {
            // User re-authenticated.
            }).catch((error) => {
                this.$refs.red.innerHTML = `${error}`
            });

            updatePassword(user, this.password).then(() => {
                this.$refs.green.innerHTML = "Пароль успешно изменён"
            }).catch((error) => {
                this.$refs.red.innerHTML = `${error}`
            });
        },
        setUserName() {
            const auth = getAuth();
            const name = this.$refs.userName.innerText
            if (name === 'Имя пользователя' || name.length < 2) {
                this.$refs.userName.innerText = 'Имя пользователя'
                return
            }
            updateProfile(auth.currentUser, {
                displayName: name
            }).then(() => {
                console.log('Username changed')
            }).catch((error) => {
                console.log(error)
            });
        },
        saveCard() {
            localStorage.setItem('card', JSON.stringify(this.card))
            this.$refs.green2.innerHTML = 'Данные успешно сохранены'
        },
        showSavedCard() {
            if (localStorage.card) {
                const card = JSON.parse(localStorage.getItem('card'))
                this.card.number = card.number
                this.card.validity = card.validity
                this.card.securityCode = card.securityCode
                this.card.firstName = card.firstName
                this.card.lastName = card.lastName
            }
        }
    },
    mounted() {
        this.showSavedCard()
    }
}
</script>

<style lang="scss" scoped>
    .profile {
        font-family: 'Montserrat';
        font-weight: 700;
        font-size: 15px;
        letter-spacing: -0.02em;
        color: #222222;
        display: flex;
        justify-content: space-between;
        width: 100%;
        margin-bottom: 53px;
        input {
            font-family: 'Montserrat';
            font-weight: 400;
            font-size: 13px;
            letter-spacing: -0.02em;
            color: rgba(34, 34, 34, 0.44);
            padding-left: 18px;
        }
        p, label {
            position: relative;
            width: fit-content;
        }
        @media (max-width: 741px) {
            margin-top: 74px;
        }
        @media (max-width: 580px) {
            flex-direction: column;
            align-items: center;
        }
    }
    .sep_line {
        margin: 8px 0 40px 0;
        width: 100%;
        max-width: 241px;
        height: 1px;
        background-color: rgba(34, 34, 34, 0.33);
        &:first-child {
            max-width: 391px;
            @media (max-width: 580px) {
                margin-left: -64px;
                width: 400px;
            }
        }
    }
    .fade {
        color: #666666;
    }

    .editable_icon::after {
        content: url('@/assets/images/header/system-uicons_write.svg');
        position: absolute;
        right: -24px;
    }
    .personal_data {
        width: 100%;
        max-width: 545px;
        @media (max-width: 580px) {
            max-width: 261px;
        }
    }
    .change_pass_form {
        display: flex;
        margin-bottom: 68px;
        > div {
            margin-right: 34px;
            margin-bottom: 22px;
        }
        label {
            white-space: nowrap;
        }
        input {
            width: 248px;
            height: 36px;
            border: 1px solid #222222;
            margin-top: 6px;
        }
        @media (max-width: 1000px) {
            flex-wrap: wrap;
            margin-bottom: 9px;
        }
    }

    .pay_data {
        width: 249px;
        margin-right: 141px;
        margin-top: 49px;
        .pay_data_form {
            width: 249px;
            > label::after {
                content: url('@/assets/images/header/ei_credit-card.svg');
                position: absolute;
                bottom: -6px;
                right: -34px;
            }
            > input {
                border: 1px solid #222222;
                margin-top: 6px;
                margin-bottom: 22px;
                height: 36px;
                width: 249px;
            }
            > div {
                display: flex;
                flex-direction: column;
                flex-wrap: wrap;
                height: 64px;
                margin-bottom: 22px;
                align-content: space-between;
                > input {
                    width: 117px;
                    border: 1px solid #222222;
                    height: 36px;
                    margin-top: 6px;
                }
            }
            > button {
                margin-top: 50px;
            }
        }
        @media (max-width: 741px) {
            margin-right: 0px;
        }
    }
    .save_btn {
        display: grid;
        place-content: center;
        width: 120px;
        height: 39px;
        background: #F5ED2A;
        cursor: pointer;
        border: none;
        font-family: 'Montserrat';
        font-weight: 700;
        font-size: 15px;
    }
</style>