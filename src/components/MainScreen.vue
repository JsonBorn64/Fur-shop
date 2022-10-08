<template>
 <section class="general_screen" ref="genScreen">
    <img class="women_part1" src="@/assets/images/general_screen/Group_3.jpg" alt="women">
    <img class="women_part2" src="@/assets/images/general_screen/todd-kent-qWdIX3I5_BY-unsplash_1.jpg" alt="women">
    <img class="women_part3" src="@/assets/images/general_screen/todd-kent-qWdIX3I5_BY-unsplash_2.jpg" alt="women">
    <div class="decore_text1">
        <div>NEX</div>
        <div>TED</div>
    </div>
    <div class="decore_text2">Лучшие шубы в казахстане</div>
    <div class="decore_text3">
        <span>Fur </span>products
        <span>For </span>stylish cats
    </div>
    <router-link to="/#catalog" class="btn">Посмотреть каталог</router-link>
 </section>
 <section class="mobile">
    <img src="@/assets/images/general_screen/Group_5.jpg" alt="img">
    <router-link to="/#catalog" class="btn mobile_btn">Посмотреть каталог</router-link>
    <img class="decore_text-mobile" src="@/assets/images/general_screen/svg_nexted.svg" alt="nexted" />
 </section>
</template>
  
<script>
export default {
    methods: {
        adaptiveGenScreen() {
            const settings = () => {
                const windowWidth = window.innerWidth
                if (!this.$refs.genScreen) return
                if (windowWidth < 1000 && windowWidth > 680) {
                    this.$refs.genScreen.style.transform = "scale(" + (windowWidth / 1000) + ")"
                    this.$refs.genScreen.style.marginBottom = (0 + ((windowWidth-1000)/1.8)) + "px"
                    this.$refs.genScreen.style.marginTop = (86 + ((windowWidth-1000)/2.2)) + "px"
                } else {
                    this.$refs.genScreen.style.transform = ""
                    this.$refs.genScreen.style.margin = "86px 85px 0 0"
                }
            }
            settings()
            window.addEventListener('resize', settings)
        }
    },
    mounted() {
        this.adaptiveGenScreen()
    }
}
</script>

<style lang="scss" scoped>
    .general_screen {
        display: flex;
        margin-top: 86px;
        position: relative;
        margin-right: 85px;
    }

    .women_part1 {
        animation: 1s fadeIn;
    }

    .women_part2 {
        position: absolute;
        top: 132px;
        right: -202px;
        animation: 2s fadeInRight;
    }

    .women_part3 {
        position: absolute;
        top: 317px;
        right: -292px;
        animation: 2.3s fadeInRight;
    }

    .decore_text1 {
        font-family: 'Druk Cyr';
        font-weight: 500;
        font-size: 200px;
        line-height: 254px;
        text-transform: uppercase;
        color: #222;
        display: flex;
        position: absolute;
        top: 36px;
        left: -194px;
        animation: 2s fadeInLeft;
        div:last-child {
            color: #F8F8F8;
        }
    }

    .decore_text2 {
        font-family: 'Montserrat';
        font-weight: bold;
        font-size: 20px;
        line-height: 24px;
        text-align: right;
        letter-spacing: -0.02em;
        text-transform: uppercase;
        color: #222222;
        position: absolute;
        max-width: 175px;
        top: 295px;
        left: -181px;
        animation: 2s fadeInLeft;
    }

    .decore_text3 {
        font-family: 'Druk Cyr';
        font-weight: 500;
        font-size: 48px;
        line-height: 61px;
        text-transform: uppercase;
        max-width: 224px;
        position: absolute;
        top: 497px;
        right: -175px;
        animation: 2s fadeInRight;
        span {
            color: #F8F8F8;
        }
    }

    .btn {
        position: absolute;
        width: 244px;
        height: 70px;
        left: -100px;
        bottom: -40px;
        background: #F5ED2A;
        box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.1);
        font-family: 'Montserrat';
        font-weight: bold;
        font-size: 15px;
        letter-spacing: -0.02em;
        text-transform: uppercase;
        display: grid;
        place-content: center;
        cursor: pointer;
        color: black;
        animation: 2s fadeInLeft;
    }

    .mobile {
        display: none;
    }

    @media (max-width: 680px) {
        .general_screen {
            display: none;
        }
        .mobile {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            margin-top: 40px;
            margin-bottom: -80px;
            width: 100%;
            margin-right: -8px;
            > img {
                width: 100%;
            }
            .mobile_btn {
                position: static;
                margin-top: 40px;
                color: black;
            }
            .decore_text_mobile {
                margin: -20px 0 -30px 0;
            }
        }
    }
</style>
  