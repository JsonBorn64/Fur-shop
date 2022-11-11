<template>
    <div class="bread_crumps_and_search">
        <div class="bread_crumps">
            <span @click="$router.push('/#header')">Главная</span>
            <span v-if="$route.name == 'Страница товара'" @click="$router.push('/catalog#header')">Каталог</span>
            <span v-if="$route.name == 'Страница товара'" @click="goCatalogWithSearchQuery(getType)">{{getType}}</span>
            <span v-if="$route.name != 'Страница товара'" class="unclickable">{{$route.name}}</span>
        </div>
        <div class="search">
            <form class="input_btn" @submit.prevent="goCatalogWithSearchQuery($event.target.elements[0].value)" ref="searchForm">
                <input placeholder="Введите запрос" :value="modelValue" @input="updateInput" ref="searchInput" required>
                <button class="btn"><img src="@/assets/images/catalog/lupa.svg" alt="search"></button>
            </form>
            <div class="keywords" v-if="$route.path == '/favorites'">
                Ключ. слова:
                <span @click="goCatalogWithSearchQuery('Шуба')">Шуба</span>
                <span @click="goCatalogWithSearchQuery('Леопард')">Леопард</span>
                <span @click="goCatalogWithSearchQuery('Дублёнка')">Дублёнка</span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        modelValue: {
            type: [String, Number]
        },
    },
    methods: {
        updateInput(e) {
            this.$emit('update:modelValue', e.target.value);
        },
        goCatalogWithSearchQuery(query) {
            if (query === 'Шубы') query = 'Шуба'
            if (query === 'Куртки') query = 'Куртка'
            if (query === 'Дублёнки') query = 'Дублёнка'
            sessionStorage.setItem('searchQuery', query);
            this.$router.push('/catalog#header')
        },
    },
    computed: {
        furById() {
            return this.$store.getters.specialFurById(this.$route.params.id)
        },
        getType() {
            const cases = {
                Шуба: "Шубы",
                Куртка: "Куртки",
                Дублёнка: "Дублёнки"
            }
            return cases[this.furById?.Type]
        }
    }
}
</script>

<style lang="scss" scoped>
     .bread_crumps_and_search {
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-wrap: wrap-reverse;
        width: 100%;
        margin-top: 12px;
        @media (max-width: 741px) {
            justify-content: center;
        }
        .bread_crumps {
            font-family: 'Montserrat';
            font-weight: 700;
            font-size: 15px;
            letter-spacing: -0.02em;
            color: #666666;
            margin-right: 20px;
            > span {
                cursor: pointer;
                &:hover {
                    text-decoration: underline;
                }
            }
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
            .unclickable {
                cursor: default;
                text-decoration: none !important;
            }
            @media (max-width: 741px) {
                margin-top: 24px;
                margin-bottom: -56px;
                margin-right: auto;
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
                @media (max-width: 500px) {
                    font-size: 12px;
                }
            }
            > button {
                background: #F5ED2A;
                display: grid;
                place-content: center;
                min-width: 49px;
                font-family: 'Montserrat';
                font-weight: 700;
                font-size: 14px;
                letter-spacing: -0.02em;
                text-transform: uppercase;
                color: #222222;
                border: 1px solid black;
                margin-left: -1px;
                cursor: pointer;
                @media (max-width: 500px) {
                    min-width: 41px;
                }
            }
            @media (max-width: 500px) {
                height: 41px;
            }
        }
        @media (max-width: 741px) {
            max-width: 3900px;
        }
        .keywords {
                font-family: 'Montserrat';
                font-weight: 700;
                font-size: 13px;
                line-height: 140.9%;
                text-align: justify;
                letter-spacing: -0.02em;
                color: rgba(34, 34, 34, 0.6);
                margin-top: 4px;
                margin-bottom: -20px;
                span {
                    text-decoration: underline;
                    margin-left: 7px;
                    cursor: pointer;
                }
            }
    }
</style>