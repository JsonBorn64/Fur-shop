<template>
    <section class="decore_section" ref="decoreBlock">
        <picture>
            <source media="(min-width: 550px)" srcset="@/assets/images/decore_section/png.webp" alt="@/assets/images/decore_section/png.png">
            <img src="@/assets/images/decore_section/png2.webp" alt="@/assets/images/decore_section/png2.png">
        </picture>
    </section>
</template>

<style lang="scss" scoped>
    .decore_section {
        margin-top: 120px;
        img {
            width: 100%;
        }
        @media (max-width: 550px) {
            margin: 70px -10px 0 -10px;
        }
    }
</style>