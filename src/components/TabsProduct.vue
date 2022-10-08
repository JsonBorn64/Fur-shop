<template>
<section class="tabs">
    <div class="names">
        <div
            class="tab_name"
            @click="activeTab = 1"
            :class="{'tab_name-active': activeTab === 1}"
        >
            Отзывы
            <div class="mobile_tab_content" :class="{'active': activeTab === 1}">
                <div class="comments" v-if="activeTab === 1">Отзывы</div>
            </div>
        </div>
        <div
            class="tab_name"
            @click="activeTab = 2"
            :class="{'tab_name-active': activeTab === 2}"
        >
            Характеристики
            <div class="mobile_tab_content" :class="{'active': activeTab === 2}">
                <div class="characteristics" v-if="activeTab === 2">
            <div class="row">
                Модель................................................Шуба
            </div>
            <div class="row">
                Фасон...................................................Кокон
            </div>
            <div class="row">
                Мех........................................................Норка
            </div>
            <div class="row">
                Ворот....................................................Стойка
            </div>
            <div class="row">
                Длина&nbspизделия.................................110 см
            </div>
            <div class="row">
                Узор.......................................................Поперечный
            </div>
            <div class="row">
                Застёжка.............................................Крючки
            </div>
            <div class="row">
                КиЗ.........................................................KZ-7656756-7HJ76OL
            </div>
            <div class="row">
                Страна<br>производитель.................................Россия
            </div>
            <div class="row">
                Дополнительная<br>информация......................................Ворот из меха куницы
            </div>
        </div>
            </div>
        </div>
        <div
            class="tab_name"
            @click="activeTab = 3"
            :class="{'tab_name-active': activeTab === 3}"
        >
            Производство
            <div class="mobile_tab_content" :class="{'active': activeTab === 3}">
                <div class="made_by" v-if="activeTab === 3">Производство</div>
            </div>
        </div>
    </div>
    <div class="tab_content">
        <div class="comments" v-if="activeTab === 1">Отзывы</div>
        <div class="characteristics" v-if="activeTab === 2">
            <div class="row">
                Модель................................................Шуба
            </div>
            <div class="row">
                Фасон...................................................Кокон
            </div>
            <div class="row">
                Мех........................................................Норка
            </div>
            <div class="row">
                Ворот....................................................Стойка
            </div>
            <div class="row">
                Длина&nbspизделия.................................110 см
            </div>
            <div class="row">
                Узор.......................................................Поперечный
            </div>
            <div class="row">
                Застёжка.............................................Крючки
            </div>
            <div class="row">
                КиЗ.........................................................KZ-7656756-7HJ76OL
            </div>
            <div class="row">
                Страна<br>производитель.................................Россия
            </div>
            <div class="row">
                Дополнительная<br>информация......................................Ворот из меха куницы
            </div>
        </div>
        <div class="made_by" v-if="activeTab === 3">Производство</div>
    </div>
</section>
</template>

<script>
export default {
    data() {
        return {
            activeTab: 2
        }
    },
    computed: {
        furById() {
            return this.$store.getters.specialFurById(this.$route.params.id)
        },
    },
}
</script>

<style lang="scss" scoped>
    .tabs {
        width: 100%;
        margin-top: 82px;
        animation: fadeIn 300ms;
        .names {
            width: 100%;
            border-top: 1px solid #222;
            display: flex;
            justify-content: space-between;
            .tab_name {
                transition: color 300ms;
                font-family: 'Montserrat';
                font-weight: 700;
                font-size: 15px;
                letter-spacing: -0.02em;
                color: rgba(34, 34, 34, 0.6);
                margin-top: -2px;
                padding: 10px 0;
                cursor: pointer;
                width: 211px;
                display: grid;
                place-content: center;
                position: relative;
                &::before, &::after {
                    content: '';
                    position: absolute;
                    top: 17px;
                    height: 2px;
                    width: 10px;
                    background-color: #222;
                    transition: 500ms;
                    @media (min-width: 600px) {
                        display: none;
                    }
                }
                &::before {
                    right: 22px;
                    transform: translateY(50%) rotate(36deg);
                }
                &::after {
                    right: 15px;
                    transform: translateY(50%) rotate(-36deg);
                }
                @media (max-width: 600px) {
                    border-bottom: 1px solid #222;
                    width: 100%;
                    place-content: start;
                    margin-top: 2px;
                }
            }
            .tab_name-active {
                border-top: 3px solid #222;
                color: #222;
                padding: 8px 0 10px 0;
                &::before, &::after {
                    right: 16px;
                    width: 16px;
                }
                &::before {
                    transform: translateY(50%) rotate(36deg);
                }
                &::after {
                    transform: translateY(50%) rotate(-36deg);
                }
                @media (max-width: 600px) {
                    border-top: none;
                    padding: 10px 0;
                }
            }
            @media (max-width: 600px) {
                flex-direction: column;
                border-top: none;
            }
        }
    }
    .tab_content {
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 300px;
        @media (max-width: 600px) {
            display: none;
        }
    }
    .mobile_tab_content {
        display: flex;
        justify-content: center;
        align-items: center;
        width: calc(100vw - 20px);
        height: 0;
        font-weight: 400;
        overflow: hidden;
        transition: 500ms;
        @media (min-width: 600px) {
            display: none;
        }
    }
    .active {
        height: 300px;
    }
    .comments {
        animation: fadeIn 300ms;
        font-size: 30px;
        font-family: 'Montserrat';
    }
    .characteristics {
        display: flex;
        flex-direction: column;
        font-family: 'Montserrat';
        font-weight: 700;
        font-size: 12px !important;
        line-height: 146.4%;
        color: #222222;
        .row {
            display: flex;
            margin-bottom: 3px;
        }
    }

    .made_by {
        animation: fadeIn 300ms;
        font-size: 30px;
        font-family: 'Montserrat';
    }
</style>