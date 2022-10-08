<template>
    <footer class="footer">
        <div class="left">
            <div class="row1">
                <router-link to="/#header" class="link">Главная</router-link>
                <img src="../assets/images/footer/ri_heart-line.svg" alt="heart">
            </div>
            <div class="row2">
                <router-link to="/#about_us" class="link">О нас</router-link>
                <img src="../assets/images/footer/ri_shopping-cart-2-line.svg" alt="cart">
            </div>
            <div class="row3">
                <router-link to="/#catalog" class="link">Каталог</router-link>
                <img src="../assets/images/footer/ri_user-line.svg" alt="user">
            </div>
        </div>
        <img
            class="logo"
            src="../assets/images/footer/Vector.svg"
            alt="logo"
            @click="$router.push('/#header')"
        >
        <div id="map"></div>
    </footer>
</template>

<script>
export default {
    methods: {
        mapInit() {
            const map = L.map('map').setView([51.140801800319586, 71.41488795264996], 13);
            L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
                maxZoom: 18,
                fullscreenControl: true,
                fullscreenControlOptions: {
                    position: 'topleft'
                }
            }).addTo(map);
            const marker = L.marker([51.140801800319586, 71.41488795264996]).addTo(map);
            L.control.fullscreen({
                position: 'topleft', 
                title: 'Show me the fullscreen !', 
                titleCancel: 'Exit fullscreen mode', 
                content: null,
                forceSeparateButton: true, 
                forcePseudoFullscreen: true, 
                fullscreenElement: false 
            }).addTo(map);
        }
    },
    mounted() {
        this.mapInit()
    },
}
</script>

<style lang="scss" scoped>
    .footer {
        margin-top: 120px;
        height: 284px;
        width: 100%;
        max-width: 870px;
        background: #222;
        box-shadow: 0 1000px 0 1000px #222;
        display: flex;
        justify-content: space-between;
        align-items: center;
        @media (max-width: 980px) {
            justify-content: space-around;
        }
        @media (max-width: 580px) {
            height: 190px;
        }
    }

    .left {
        display: flex;
        flex-direction: column;
        gap: 26px;
        width: 210px;
        @media (max-width: 580px) {
            width: auto;
        }
        > div {
            display: flex;
            justify-content: space-between;
            align-items: center;
            width: 100%;
            > img {
                @media (max-width: 580px) {
                    display: none;
                }
            }
            .link {
                font-family: 'Montserrat';
                font-weight: 700;
                font-size: 15px;
                letter-spacing: -0.02em;
                color: #F8F8F8;
            }
        }
    }

    .logo {
        cursor: pointer;
        @media (max-width: 760px) {
            display: none;
        }
    }
</style>

<style lang="scss">
    // Map styles
    #map {
        width: 232px;
        height: 194px;
        border: 7px solid #F5ED2A;
        z-index: 9;
        @media (max-width: 580px) {
            width: 140px;
            height: 117px;
        }
    }
    .leaflet-top .leaflet-control {
	    margin-top: 0px;
	}
    .leaflet-left .leaflet-control {
        margin-left: 0px;
    }
    .leaflet-bottom {
        display: none;
    }
    .leaflet-touch .leaflet-bar {
        border: none;
    }
    .leaflet-touch .leaflet-bar a {
        width: 26px;
        height: 26px;
        line-height: 26px;
    }
    .leaflet-touch .leaflet-control-zoom-out {
        font-size: 18px;
    }
    .leaflet-bar a:last-child {
        border-bottom: 1px solid #ccc;
    }
</style>