<template>
  <header class="header" id="header">
    <div class="header_left">
      <nav class="menu">
        <ul>
          <li><router-link to="/">Главная</router-link></li>
          <li><router-link to="/#about_us">О нас</router-link></li>
          <li><router-link to="/#catalog">Каталог</router-link></li>
        </ul>
      </nav>
    </div>
    <img class="logo" src="@/assets/images/header/Vector.svg" alt="logo" @click="$router.push('/')">
    <div class="header_right">
      <a><img src="@/assets/images/header/ri_heart-line.svg" alt="heart"></a>
      <a><img src="@/assets/images/header/ri_shopping-cart-2-line.svg" alt="cart"></a>
      <a @click="userIconClick"><img src="@/assets/images/header/ri_user-line.svg" alt="user"></a>
      <router-link v-if="$store.state.uid === 'yd8ne2Ab5yYipJ1Uj0GE0hdAfX33'" to="/admin">
        <img src="@/assets/images/header/ri_admin-line.svg" alt="user">
      </router-link>
    </div>
  </header>
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

.registration_popup, .auth_popup {
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
.header {
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin: 0 20px;
  padding-top: 30px;
}

.logo {
  margin: 0 40px;
  cursor: pointer;
}

.header_left, .header_right {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  border-bottom: 1px solid black;
  width: 100%;
  max-width: 390px;
  @media (max-width: 680px) {
    max-width: 680px;
  }
}

.header_right {
  a {
    display: flex;
    cursor: pointer;
    img {
      margin: 10px 0;
      width: 25px;
    }
  }
}

.menu {
  width: 100%;
  ul {
    display: flex;
    justify-content: space-evenly;
    list-style: none;
    a {
      color: black;
      font-family: 'Montserrat';
      font-weight: 700;
      font-size: 15px;
      letter-spacing: -0.02em;
    }
  }
}

@media (max-width: 680px) {
  .header {
    flex-direction: column;
    align-items: center;
  }
  .header_left {
    display: none;
  }
  .header_right {
    margin-top: 20px;
    border: none;
    border-top: 1px solid black;
  }
}
</style>
