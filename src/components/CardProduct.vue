<template>
    <section class="card_product">
        <div class="info mobile">
            <div class="title">{{furById?.Name}}</div>
            <div class="price">
                <div v-if="furById?.OldPrice" class="old">
                    <span>{{furById?.OldPrice}} тг</span>
                    <span>-{{sailPercent(furById?.OldPrice, furById?.Price)}}%</span>
                </div>
                <div class="now">{{new Intl.NumberFormat('ru-RU').format(furById?.Price)}} <span>тг</span></div>
            </div>
        </div>
            <div class="photos_and_btns">
                <div class="photos" :style="{'height': furById?.Images.length < 2 ? '100%' : '110vh' }">
                    <img
                        v-for="img in furById?.Images"
                        :src="getSrc(img)"
                        class="second_photo"
                        alt="fur photo"
                        ref="image"
                    >
                </div>
                <div class="btns">
                    <div class="cart_btn">В корзину</div>
                    <div class="favorite_btn">Избранное
                        <svg xmlns="http://www.w3.org/2000/svg" width="21" height="20" viewBox="0 0 21 20" fill="none">
                            <path d="M10.5011 1.71771C11.6912 0.652296 13.2443 0.0832012 14.8411 0.127373C16.4378 0.171545 17.957 0.825628 19.0865 1.95521C20.215 3.08353 20.8691 4.60078 20.9148 6.19593C20.9605 7.79108 20.3943 9.34329 19.3323 10.5344L10.499 19.3802L1.66773 10.5344C0.604456 9.34267 0.0377344 7.78913 0.0839147 6.1927C0.130095 4.59626 0.785674 3.07808 1.91606 1.94983C3.04644 0.821574 4.56587 0.168864 6.16238 0.125699C7.7589 0.0825333 9.31137 0.652188 10.5011 1.71771ZM17.6115 3.42709C16.859 2.67514 15.8472 2.23967 14.7838 2.21004C13.7204 2.1804 12.686 2.55884 11.8927 3.26771L10.5021 4.51563L9.11044 3.26875C8.31673 2.55903 7.28138 2.18018 6.21706 2.21001C5.15273 2.23985 4.14023 2.6761 3.38752 3.42917C2.64196 4.1747 2.20675 5.17515 2.16964 6.22886C2.13252 7.28256 2.49626 8.31116 3.18752 9.1073L10.5 16.4313L17.8125 9.10834C18.5046 8.31188 18.8687 7.28255 18.8314 6.2281C18.794 5.17366 18.3581 4.17263 17.6115 3.42709Z" fill="#F5ED2A"/>
                        </svg>
                    </div>
                </div>
            </div>
        <div class="info desctop">
            <div class="title">{{furById?.Name}}</div>
            <div class="price">
                <div v-if="furById?.OldPrice" class="old">
                    <span>{{furById?.OldPrice}} тг</span>
                    <span>-{{sailPercent(furById?.OldPrice, furById?.Price)}}%</span>
                </div>
                <div class="now">{{new Intl.NumberFormat('ru-RU').format(furById?.Price)}} <span>тг</span></div>
            </div>
            <div class="sizes">
                <div v-for="size in furById?.Size">{{size}}</div>
            </div>
            <div @click="++activePhoto" class="sizes_table">Таблица размеров</div>
            <hr>
            <div class="about">
                <div>Описание</div>
                <p :class="{ 'about-active': aboutActive }" @click="aboutActive = true">{{furById?.About}}</p>
            </div>
        </div>
        <transition name="fade">
            <div class="photos_popup" v-show="showPhotoPopup">
                <div @click="showPhotoPopup = false" class="overlay"></div>
                <div @click="prevPhoto" v-show="activePhoto > 0" class="popup_btn">Назад</div>
                <img
                    v-for="img in furById?.Images"
                    :src="getSrc(img)"
                    class="popup_photo"
                    alt="fur photo"
                    ref="popup_photos"
                >
                <div @click="nextPhoto" v-show="activePhoto < furById?.Images.length-1" class="popup_btn">Вперёд</div>
            </div>
        </transition>
    </section>
</template>

<script>
export default {
    data() {
        return {
            aboutActive: false,
            showPhotoPopup: false,
            activePhoto: 0
        }
    },
    methods: {
        getSrc(name) {
            const path = `/src/assets/images/catalog/${name}`;
            const modules = import.meta.globEager("/src/assets/images/catalog/*");
            return modules[path].default;
        },
        sailPercent(oldPrice, newPrice) {
            return Math.floor((+oldPrice - +newPrice)/(+oldPrice/100))
        },
        imagesInteractive() {
            if (!this.$refs.image) return
            const photos = this.$refs.image
            const popupPhotos = this.$refs.popup_photos
            photos.forEach((img, idx) => {
                if (idx === 0) {
                    photos.forEach(image => image.classList.remove('first_photo'))
                    img.classList.add('first_photo')
                }
                img.onclick = () => {
                    if (img.classList.contains('first_photo')) {
                        this.activePhoto = idx
                        this.showPhotoPopup = true
                        popupPhotos.forEach(item => item.classList.remove('popup_photo-active'))
                        popupPhotos[this.activePhoto].classList.add('popup_photo-active')
                    }
                    photos.forEach(image => image.classList.remove('first_photo'))
                    img.classList.add('first_photo')
                }
            })
        },
        nextPhoto() {
            if (this.activePhoto < this.furById?.Images.length-1 && this.showPhotoPopup) {
                ++this.activePhoto
                this.$refs.popup_photos.forEach(img => img.classList.remove('popup_photo-active'))
                this.$refs.popup_photos[this.activePhoto].classList.add('popup_photo-active')
            } else {
                return
            }
        },
        prevPhoto() {
            if (this.activePhoto > 0 && this.showPhotoPopup) {
                --this.activePhoto
                this.$refs.popup_photos.forEach(img => img.classList.remove('popup_photo-active'))
                this.$refs.popup_photos[this.activePhoto].classList.add('popup_photo-active')
            } else {
                return
            }
        },
        keyEvents() {
            document.addEventListener('keydown', (e) => {
                if (e.code == 'ArrowLeft') this.prevPhoto()
                if (e.code == 'ArrowRight') this.nextPhoto()
            })
        }
    },
    computed: {
        furById() {
            return this.$store.getters.specialFurById(this.$route.params.id)
        },
    },
    mounted() {
        this.imagesInteractive()
        this.keyEvents()
    },
    updated() {
        this.imagesInteractive()
    },
}
</script>

<style lang="scss">
    .card_product {
        display: flex;
        width: 100%;
        justify-content: space-between;
        margin-top: 76px;
        animation: .5s fadeIn;
        @media (max-width: 840px) {
            flex-direction: column;
            align-items: center;
        }
    }

    .photos_and_btns {
        display: flex;
        flex-direction: column;
        width: 100%;
        max-width: 528px;
        .photos {
            max-width: 528px;
            max-height: 390px;
            // width: 100vw;
            height: 110vh;
            display: flex;
            flex-direction: column;
            flex-wrap: wrap;
            justify-content: space-between;
            align-content: space-between;
            overflow: hidden;
            @media (max-width: 976px) {
                flex-direction: row;
                max-width: 390px;
                // max-height: 528px;
            }
            @media (max-width: 840px) {
                max-width: 700px;
                max-height: 9000px;
            }
            > img {
                cursor: pointer;
                object-fit: cover;
            }
        }
        @media (max-width: 976px) {
            max-width: 390px;
        }
        @media (max-width: 840px) {
            max-width: 700px;
            max-height: calc(132vw);
        }
        @media (max-width: 700px) {
            max-height: calc(135vw);
        }
        @media (max-width: 500px) {
            max-height: calc(142vw);
        }
    }
    .first_photo {
        height: 100% !important;
        max-width: 390px !important;
        max-height: 390px !important;
        order: -1;
        animation: fadeIn 300ms;
        @media (max-width: 840px) {
            max-width: 700px !important;
            max-height: 90vw !important;
        }
    }

    .second_photo {
        width: 100%;
        height: 100%;
        max-width: 114px;
        max-height: 114px;
        @media (max-width: 840px) {
            max-width: 29%;
            max-height: 22%;
        }
    }

    .mobile {
        display: none;
        margin-bottom: 30px;
        @media (max-width: 840px) {
            display: block;
        }
    }

    .desctop {
        .title, .price {
            @media (max-width: 840px) {
                display: none !important;
            }
        }
    }

    .photos_popup {
        position: fixed;
        width: 100vw;
        height: 100vh;
        left: 0;
        top: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 10;
        user-select: none;
        .overlay {
            width: 100%;
            height: 100%;
            position: absolute;
            background-color: rgba(255, 255, 255, 0.9);
            cursor: default;
        }
        .popup_photo {
            z-index: 11;
            display: none;
            max-width: calc(100% - 0px);
            max-height: calc(100% - 0px);
        }
        .popup_btn {
            z-index: 12;
            font-family: 'Montserrat';
            padding: 10px 20px;
            cursor: pointer;
            border: 1px solid #222;
            position: absolute;
            top: 50%;
            transform: translateX(50%);
            left: -20px;
            background-color: rgba(255, 255, 255, 0.6);
            &:last-child {
                right: 80px;
                left: auto;
            }
        }
    }
    .popup_photo-active {
        display: block !important;
        animation: fadeIn 300ms;
    }
    .fade-enter-active,
    .fade-leave-active {
    transition: opacity 0.3s ease;
    }

    .fade-enter-from,
    .fade-leave-to {
    opacity: 0;
    }

    .btns {
        display: flex;
        margin-top: 26px;
        font-family: 'Montserrat';
        font-weight: 700;
        font-size: 15px;
        letter-spacing: -0.02em;
        text-transform: uppercase;
        color: #222222;
        .cart_btn {
            display: grid;
            place-content: center;
            cursor: pointer;
            width: 187px;
            height: 52px;
            background: #F5ED2A;
            box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.1);
            margin-right: 16px;
            @media (max-width: 400px) {
                height: 42px;
            }
        }
        .favorite_btn {
            display:flex;
            justify-content: center;
            align-items: center;
            width: 187px;
            height: 52px;
            cursor: pointer;
            border: 1px solid #222222;
            filter: drop-shadow(0px 1px 15px rgba(0, 0, 0, 0.1));
            transition: 300ms;
            > svg {
                margin-left: 10px;
                > path {
                    fill: #222;
                    transition: 300ms;
                }
            }
            &:hover {
                border: 1px solid #F5ED2A;
            }
            &:hover > svg > path {
                fill: #F5ED2A;
            }
            @media (max-width: 400px) {
                height: 42px;
            }
        }
        @media (max-width: 840px) {
            justify-content: space-evenly;
        }
    }

    .info {
        width: 100%;
        max-width: 390px;
        @media (max-width: 840px) {
            max-width: 700px;
        }
        .title {
            font-family: 'Montserrat';
            font-weight: 700;
            font-size: 30px;
            line-height: 140.9%;
            text-transform: uppercase;
            color: #222222;
            @media (max-width: 400px) {
                font-size: 24px;
            }
        }
        .price {
            display: flex;
            flex-direction: column;
            margin-top: 24px;
            .old {
                font-family: 'Montserrat';
                font-weight: 700;
                font-size: 15px;
                letter-spacing: -0.02em;
                color: rgba(34, 34, 34, 0.6);
                margin-bottom: 14px;
                > span:first-child {
                    text-decoration-line: line-through;
                    margin-right: 7px;
                }
            }
            .now {
                font-family: 'Montserrat';
                font-weight: 500;
                font-size: 24px;
                letter-spacing: -0.02em;
                color: #A31414;
                > span {
                    font-family: 'Montserrat';
                    font-weight: 700;
                    font-size: 15px;
                    letter-spacing: -0.02em;
                    text-transform: lowercase;
                    color: rgba(34, 34, 34, 0.6);
                }
            }
            @media (max-width: 400px) {
                margin-top: 20px;
            }
        }
        .sizes {
            font-family: 'Montserrat';
            font-weight: 700;
            font-size: 15px;
            letter-spacing: -0.02em;
            text-transform: uppercase;
            color: #222222;
            display: flex;
            margin-top: 30px;
            > div {
                border: 1px solid #666666;
                margin-right: 28px;
                padding: 0 7px;
            }
        }

        .sizes_table {
            font-family: 'Montserrat';
            font-weight: 700;
            font-size: 15px;
            letter-spacing: -0.02em;
            text-decoration-line: underline;
            color: rgba(34, 34, 34, 0.6);
            margin-top: 25px;
            cursor: pointer;
        }
        hr {
            margin-top: 24px;
            border: none;
            height: 1px;
            background:  #222222;
            @media (max-width: 500px) {
                display: none;
            }
        }
        .about {
            display: flex;
            flex-direction: column;
            margin-top: 24px;
            div {
                font-family: 'Montserrat';
                font-weight: 700;
                font-size: 15px;
                letter-spacing: -0.02em;
                color: rgba(34, 34, 34, 0.6);
            }
            p {
                font-family: 'Montserrat';
                font-weight: 700;
                font-size: 12px;
                line-height: 140.9%;
                text-align: justify;
                letter-spacing: -0.02em;
                color: #222222;
                position: relative;
                margin-top: 24px;
                -webkit-line-clamp: 3;
                -webkit-box-orient: vertical;
                overflow: hidden;
                display: -webkit-box;
                cursor: pointer;
                // &::after {
                //     content: 'Показать ещё';
                //     background-color: white;
                //     font-size: 12px;
                //     line-height: 140.9%;
                //     letter-spacing: -0.02em;
                //     text-decoration-line: underline;
                //     color: #666666;
                //     cursor: pointer;
                //     position: absolute;
                //     bottom: 0;
                //     right: 0;
                //     box-shadow: 0 40px 10px 40px white;
                // }
            }
        }
    }
    .about-active {
        display: block !important;
        cursor: default !important;
    }
</style>