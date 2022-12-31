<template>
    <img v-if="footer" @click="userIconClick" src="@/assets/images/footer/ri_user-line.svg" alt="user" class="link foo">
    <img v-else @click="userIconClick" src="@/assets/images/header/ri_user-line.svg" alt="user" class="link">
    <div class="auth_popup" v-if="showAuthPopup">
        <div class="overlay" @click="showAuthPopup = false"></div>
        <form @submit.prevent="singIn">
            <p>Вход</p>
            <input type="email" placeholder="email" v-model="authEmail" required>
            <input type="password" placeholder="password" v-model="authPassword" required>
            <button type="submit">Войти</button>
            <a @click="showRegistrationPopup = true, showAuthPopup = false">регистрация</a>
        </form>
  </div>
  <div class="registration_popup" v-if="showRegistrationPopup">
        <div class="overlay" @click="showRegistrationPopup = false"></div>
        <form @submit.prevent="registerNewUser">
            <p>Регистрация</p>
            <input type="text" placeholder="Ваше имя" v-model="registerName" required>
            <input type="email" placeholder="Email" v-model="registerEmail" required>
            <input type="password" placeholder="Пароль" v-model="registerPassword" required>
            <button type="submit">Зарегистрироваться</button>
            <a @click="showRegistrationPopup = false, showAuthPopup = true">войти</a>
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
        }
        form {
            width: 360px;
            padding: 0 20px;
            display: flex;
            flex-direction: column;
            justify-content: space-evenly;
            height: 340px;
            align-items: center;
            z-index: 22;
            background-color: white;
            a {
                cursor: pointer;
            }
        }
    }
</style>