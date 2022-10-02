<template>
    <header-comp/>
    <div class="bread_crumps_and_search">
        <div class="bread_crumps">
            <span>Каталог</span>
            <span>Шубы</span>
            <span>Искусственный мех</span>
        </div>
        <div class="search">
            <div class="input_btn">
                <input placeholder="Введите запрос" ref="searchInput">
                <div class="btn" @click="searchQuery = ''">Очистить</div>
            </div>
        </div>
    </div>
    <section class="card_product">
        <div class="photos_and_btns">
            <div class="photos">
                <img
                    v-for="img in specialFurById?.Images"
                    :src="getSrc(img)"
                    class="second_photo"
                    alt="fur photo"
                    ref="image"
                >
            </div>
            <div class="btns">
                <div class="cart_btn">В корзину</div>
                <div class="favorite_btn">Избранное <img src="@/assets/images/card_product/Vector.svg" alt="heart"></div>
            </div>
        </div>
        <transition name="fade">
            <div class="photos_popup" v-show="showPhotoPopup">
                <div @click="showPhotoPopup = false" class="overlay"></div>
                <div @click="prevPhoto" v-show="activePhoto > 0" class="popup_btn">Назад</div>
                <img
                    v-for="img in specialFurById?.Images"
                    :src="getSrc(img)"
                    class="popup_photo"
                    alt="fur photo"
                    ref="popup_photos"
                >
                <div @click="nextPhoto" v-show="activePhoto < specialFurById?.Images.length-1" class="popup_btn">Вперёд</div>
            </div>
        </transition>
        <div class="info">
            <div class="title">{{specialFurById?.Name}}</div>
            <div class="price">
                <div v-if="specialFurById?.OldPrice" class="old">
                    <span>{{specialFurById?.OldPrice}} тг</span>
                    <span>-{{sailPercent(specialFurById?.OldPrice, specialFurById?.Price)}}%</span>
                </div>
                <div class="now">{{specialFurById?.Price}} <span>тг</span></div>
            </div>
            <div class="sizes">
                <div v-for="size in specialFurById?.Size">{{size}}</div>
            </div>
            <div @click="++activePhoto" class="sizes_table">Таблица размеров</div>
            <hr>
            <div class="about">
                <div>Описание</div>
                <p :class="{ 'about-active': aboutActive }" @click="aboutActive = true">{{specialFurById?.About}}</p>
            </div>
        </div>
    </section>
    <div class="tabs">
        <div class="names">
            <div class="tab_name">Отзывы</div>
            <div class="tab_name tab_name-active">Характеристики</div>
            <div class="tab_name">Производство</div>
        </div>
    </div>
    <footer-comp/>
</template>

<script>
import HeaderComp from '../components/HeaderComp.vue';
import FooterComp from '../components/FooterComp.vue';
export default {
    components: { HeaderComp, FooterComp },
    data() {
        return {
            furs: this.$store.state.furs,
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
            if (this.activePhoto < this.specialFurById?.Images.length-1) {
                ++this.activePhoto
                this.$refs.popup_photos.forEach(img => img.classList.remove('popup_photo-active'))
                this.$refs.popup_photos[this.activePhoto].classList.add('popup_photo-active')
            } else {
                return
            }
        },
        prevPhoto() {
            if (this.activePhoto > 0) {
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
        specialFurById() {
            if (this.furs.length > 0) {
                return this.furs.find(fur => fur.id === this.$route.params.id)
            }
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

<style lang="scss" scoped>
    .bread_crumps_and_search {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        margin-top: 12px;
        .bread_crumps {
            font-family: 'Montserrat';
            font-weight: 700;
            font-size: 15px;
            letter-spacing: -0.02em;
            text-transform: capitalize;
            color: #666666;
            > span:not(:last-child) {
                margin-right: 21px;
                position: relative;
                &::after {
                    content: url('@/assets/images/card_product/Vector_3.svg');
                    position: absolute;
                    right: -13px;
                    top: -1px;
                }
            }
        }
    }
    .search {
        width: 100%;
        max-width: 390px;
        .input_btn {
            width: 100%;
            display: flex;
            height: 49px;
            > input {
                width: 100%;
                border: 1px solid black;
                border-radius: 0px;
                font-family: 'Montserrat';
                font-weight: 700;
                font-size: 15px;
                letter-spacing: -0.02em;
                color: #666666;
                padding-left: 10px;
            }
            > div {
                background: #F5ED2A;
                display: grid;
                place-content: center;
                width: 133px;
                font-family: 'Montserrat';
                font-weight: 700;
                font-size: 14px;
                letter-spacing: -0.02em;
                text-transform: uppercase;
                color: #222222;
                border: 1px solid black;
                margin-left: -1px;
                cursor: pointer;
            }
        }
    }

    .card_product {
        display: flex;
        width: 100%;
        justify-content: space-between;
        margin-top: 76px;
    }

    .photos_and_btns {
        display: flex;
        flex-direction: column;
        width: 100%;
        max-width: 525px;
        .photos {
            max-width: 528px;
            max-height: 390px;
            width: 100vw;
            height: 100vh;
            display: flex;
            flex-direction: column;
            flex-wrap: wrap;
            justify-content: space-between;
            align-content: space-between;
            overflow: hidden;
            > img {
                cursor: pointer;
                object-fit: cover;
            }
        }
    }
    .first_photo {
        height: 100% !important;
        max-width: 390px !important;
        max-height: 390px !important;
        order: -1;
        animation: fade 300ms ease-in-out;
    }
    @keyframes fade {
        from { opacity: 0; }   
        to { opacity: 1; }
   }
    .second_photo {
        width: 100%;
        max-width: 114px;
        height: 100%;
        max-height: 114px;
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
            max-width: calc(100% - 260px);
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
        animation: fade 300ms ease-in-out;
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
            > img {
                margin-left: 10px;
            }
        }
    }

    .info {
        width: 100%;
        max-width: 390px;
        .title {
            font-family: 'Montserrat';
            font-weight: 700;
            font-size: 30px;
            line-height: 140.9%;
            text-transform: uppercase;
            color: #222222;
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
    .tabs {
        width: 100%;
        margin-top: 82px;
        .names {
            width: 100%;
            border-top: 1px solid #222;
            display: flex;
            justify-content: space-between;
            .tab_name {
                font-family: 'Montserrat';
                font-weight: 700;
                font-size: 15px;
                letter-spacing: -0.02em;
                color: rgba(34, 34, 34, 0.6);
                margin-top: -2px;
                padding: 10px 40px;
                cursor: pointer;
            }
            .tab_name-active {
                border-top: 3px solid #222;
                color: #222;
            }
        }
    }
</style>