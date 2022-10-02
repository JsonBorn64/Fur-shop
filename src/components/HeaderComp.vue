<template>
  <header class="header animate__animated animate__fadeIn" id="header">
    <div class="header_left">
      <nav class="menu">
        <ul>
          <li><router-link to="/">Главная</router-link></li>
          <li><router-link to="/#about_us">О нас</router-link></li>
          <li><router-link to="/#catalog">Каталог</router-link></li>
        </ul>
      </nav>
    </div>
    <img class="logo" src="../assets/images/header/Vector.svg" alt="logo" @click="$router.push('/')">
    <div class="header_right">
      <a href="#"><img src="../assets/images/header/ri_heart-line.svg" alt="heart"></a>
      <a href="#"><img src="../assets/images/header/ri_shopping-cart-2-line.svg" alt="cart"></a>
      <a href="#"><img src="../assets/images/header/ri_user-line.svg" alt="heart"></a>
    </div>
  </header>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
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
}

.header_right {
  a {
    display: flex;
    img {
      margin: 10px 0;
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
