<template>
    <header-comp />
    <main-screen />
    <about-us />
    <top-sales />
    <fur-catalog />
    <footer-comp />
</template>

<script>
import HeaderComp from './components/HeaderComp.vue'
import MainScreen from './components/MainScreen.vue'
import AboutUs from './components/AboutUs.vue'
import TopSales from './components/TopSales.vue'
import FooterComp from './components/FooterComp.vue'
import FurCatalog from './components/FurCatalog.vue'
export default {
  components: { HeaderComp, MainScreen, AboutUs, TopSales, FooterComp, FurCatalog }
}
</script>

<style scoped>
</style>
