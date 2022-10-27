<template>
  <header class="header" id="header">
    <div class="header_left">
      <nav class="menu">
        <ul>
          <li><router-link to="/">Главная</router-link></li>
          <li><router-link to="/#about_us">О нас</router-link></li>
          <li><router-link to="/catalog#header">Каталог</router-link></li>
        </ul>
      </nav>
    </div>
    <img class="logo" src="@/assets/images/header/Vector.svg" alt="logo" @click="$router.push('/')">
    <div class="header_right">
      <a @click="$router.push('/favorites#header')"><img src="@/assets/images/header/ri_heart-line.svg" alt="heart"></a>
      <a><img src="@/assets/images/header/ri_shopping-cart-2-line.svg" alt="cart"></a>
      <user-icon/>
      <router-link v-if="$store.state.uid === 'yd8ne2Ab5yYipJ1Uj0GE0hdAfX33'" to="/admin">
        <img src="@/assets/images/header/ri_admin-line.svg" alt="user">
      </router-link>
    </div>
  </header>
</template>

<script>
import UserIcon from "./UserIcon.vue";
export default {
    components: { UserIcon }
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
