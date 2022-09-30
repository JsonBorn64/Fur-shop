<template>
    <header-comp/>
    <main-screen/>
    <about-us/>
    <top-sales/>
    <fur-catalog/>
    <decore-section/>
    <subscribe-form/>
    <stats-info/>
    <footer-comp/>
</template>

<script>
import HeaderComp from '@/components/HeaderComp.vue'
import MainScreen from '@/components/MainScreen.vue'
import AboutUs from '@/components/AboutUs.vue'
import TopSales from '@/components/TopSales.vue'
import FurCatalog from '@/components/FurCatalog.vue'
import DecoreSection from '@/components/DecoreSection.vue'
import SubscribeForm from '@/components/SubscribeForm.vue'
import StatsInfo from '@/components/StatsInfo.vue'
import FooterComp from '@/components/FooterComp.vue'
export default {
  components: { HeaderComp, MainScreen, AboutUs, TopSales, FooterComp, FurCatalog, DecoreSection, SubscribeForm, StatsInfo },
}
</script>

<style scoped>
</style>
