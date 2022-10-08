<template>
    <header-comp/>
    <bread-crumps-search/>
    <card-product/>
    <tabs-product/>
    <div class="line"></div>
    <possible-options/>
    <footer-comp/>
</template>

<script>
import HeaderComp from '../components/HeaderComp.vue';
import FooterComp from '../components/FooterComp.vue';
import BreadCrumpsSearch from '../components/BreadCrumpsSearch.vue';
import CardProduct from '../components/CardProduct.vue';
import TabsProduct from '../components/TabsProduct.vue';
import PossibleOptions from '../components/PossibleOptions.vue';
export default {
    components: { HeaderComp, FooterComp, BreadCrumpsSearch, CardProduct, TabsProduct, PossibleOptions }
}
</script>

<style lang="scss" scoped>
    .line {
        width: 100%;
        height: 7px;
        background-color: #F5ED2A;
        margin-top: 10px;
    }
</style>