<template>
    <img v-if="footer" @click="userIconClick" src="@/assets/images/footer/ri_user-line.svg" alt="user" class="link foo">
    <img v-else @click="userIconClick" src="@/assets/images/header/ri_user-line.svg" alt="user" class="link">
    <div class="auth_popup" v-if="showAuthPopup">
        <div class="overlay" @click="showAuthPopup = false"></div>
        <form @submit.prevent="singIn">
            <p>Sing in</p>
            <input type="email" placeholder="email" v-model="authEmail" required>
            <input type="password" placeholder="password" v-model="authPassword" required>
            <button type="submit">Login</button>
            <a @click="showRegistrationPopup = true">Registration</a>
        </form>
  </div>
  <div class="registration_popup" v-if="showRegistrationPopup">
        <div class="overlay" @click="showRegistrationPopup = false"></div>
        <form @submit.prevent="registerNewUser">
            <p>Registration</p>
            <input type="email" placeholder="email" v-model="registerEmail" required>
            <input type="password" placeholder="password" v-model="registerPassword" required>
            <button type="submit">Register</button>
        </form>
  </div>
</template>
<script>
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
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
        showAuthPopup: false,
        authEmail: '',
        authPassword: ''
        }
    },
    methods: {
        registerNewUser() {
            createUserWithEmailAndPassword(auth, this.registerEmail, this.registerPassword)
            .then((userCredential) => {
                const user = userCredential.user;
                if (user) console.log('Success registered')
                this.showRegistrationPopup = false
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorMessage)
            });
        },
        singIn() {
        signInWithEmailAndPassword(auth, this.authEmail, this.authPassword)
            .then((userCredential) => {
                const user = userCredential.user;
                if (user) console.log('Success logined')
                this.showAuthPopup = false
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorMessage)
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
        }
    }
</style>