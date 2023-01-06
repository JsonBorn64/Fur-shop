<template>
    <img v-if="footer" @click="userIconClick" src="@/assets/images/footer/ri_user-line.svg" alt="user" class="link foo">
    <img v-else @click="userIconClick" src="@/assets/images/header/ri_user-line.svg" alt="user" class="link">
    <div class="auth_popup" v-if="showAuthPopup">
        <div class="overlay" @click="showAuthPopup = false"></div>
        <form @submit.prevent="singIn">
            <p>Вход</p>
            <input type="email" placeholder="Email" v-model="authEmail" required>
            <input type="password" placeholder="Пароль" v-model="authPassword" minlength="6" required>
            <button type="submit">Войти</button>
            <a @click="showRegistrationPopup = true, showAuthPopup = false">регистрация</a>
            <img @click="showAuthPopup = false" src="../assets/images/header/Cross.svg" alt="x">
        </form>
  </div>
  <div class="registration_popup" v-if="showRegistrationPopup">
        <div class="overlay" @click="showRegistrationPopup = false"></div>
        <form @submit.prevent="registerNewUser">
            <p>Регистрация</p>
            <input type="text" placeholder="Ваше имя" v-model="registerName" required>
            <input type="email" placeholder="Email" v-model="registerEmail" required>
            <input type="password" placeholder="Пароль" v-model="registerPassword" minlength="6" required>
            <button type="submit">Зарегистрироваться</button>
            <a @click="showRegistrationPopup = false, showAuthPopup = true">войти</a>
            <img  @click="showRegistrationPopup = false" src="../assets/images/header/Cross.svg" alt="x">
        </form>
  </div>
</template>
<script>
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, getAuth } from "firebase/auth";
import { auth } from '@/firebase/firebase.js'
export default {
    props: {
        footer: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
        showRegistrationPopup: false,
        registerEmail: '',
        registerPassword: '',
        registerName: '',
        showAuthPopup: false,
        authEmail: '',
        authPassword: ''
        }
    },
    methods: {
        registerNewUser() {
            this.$store.commit('setFursLoaded', false)
            createUserWithEmailAndPassword(auth, this.registerEmail, this.registerPassword)
                .then((user) => {
                    const auth = getAuth();
                    this.$store.commit('setFursLoaded', true)
                    if (user) {
                        updateProfile(auth.currentUser, {
                            displayName: this.registerName
                        }).then(() => {
                            this.$store.commit('setAlert', ['Регистрация выполнена успешно', 'green'])
                            this.$store.dispatch('getAuthState')
                            this.showRegistrationPopup = false;
                        }).catch((error) => {
                            console.error(error);
                        });
                    }
                })
                .catch((error) => {
                    this.$store.commit('setFursLoaded', true)
                    this.$store.commit('setAlert', [error.code, 'red'])
                    console.log(error.message)
                });
        },
        singIn() {
            this.$store.commit('setFursLoaded', false)
            signInWithEmailAndPassword(auth, this.authEmail, this.authPassword)
                .then((userCredential) => {
                    this.$store.commit('setFursLoaded', true)
                    this.$store.dispatch('getAuthState')
                    const user = userCredential.user;
                    if (user) this.$store.commit('setAlert', ['Вход выполнен успешно', 'green'])
                    this.showAuthPopup = false
                })
                .catch((error) => {
                    this.$store.commit('setFursLoaded', true)
                    this.$store.commit('setAlert', [error.code, 'red'])
                    console.log(error.message)
                });
            },
            userIconClick() {
                if (this.$store.state.isAuth) {
                    this.$router.push('/profile')
                } else {
                    this.showAuthPopup = true
                }
            }
    }
}
</script>
<style lang="scss" scoped>
    .link {
        cursor: pointer;
    }
    .foo {
        @media (max-width: 580px) {
            display: none;
        }
    }
    .registration_popup, .auth_popup {
        top: 0;
        left: 0;
        position: fixed;
        z-index: 20;
        width: 100vw;
        height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
        .overlay {
            position: fixed;
            width: 100vw;
            height: 100vh;
            background-color: rgba(255, 255, 255, 0.2);
            backdrop-filter: blur(4px);
            animation: 300ms fadeIn;
        }
        form {
            width: 100%;
            max-width: 447px;
            padding: 0 10px;
            margin: 0 10px;
            display: flex;
            flex-direction: column;
            align-items: center;
            z-index: 22;
            background-color: white;
            position: relative;
            p {
                font-family: 'Montserrat';
                font-weight: 700;
                font-size: 20px;
                text-transform: capitalize;
                color: #222222;
                margin: 42px 0 34px;
            }
            input {
                width: 100%;
                max-width: 315px;
                height: 41px;
                padding-left: 8px;
                margin-bottom: 29px;
            }
            button {
                width: 192px;
                height: 40px;
                background: #F5ED2A;
                margin: 4px 0 29px;
                border: none;
                font-family: 'Montserrat';
                font-weight: 700;
                font-size: 15px;
                color: #222222;
                cursor: pointer;
            }
            a {
                cursor: pointer;
                font-family: 'Montserrat';
                font-weight: 500;
                font-size: 15px;
                text-transform: capitalize;
                color: rgba(34, 34, 34, 0.58);
                margin-bottom: 42px;
            }
            img {
                position: absolute;
                top: 10%;
                right: 10%;
                cursor: pointer;
            }
        }
    }
    
</style>