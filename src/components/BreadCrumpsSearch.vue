<template>
    <div class="bread_crumps_and_search">
        <div class="bread_crumps">
            <span @click="$router.push('/#header')">Главная страница</span>
            <span v-if="$route.name == 'Страница товара'" @click="$router.push('/catalog#header')">Каталог</span>
            <span v-if="$route.name == 'Страница товара'">{{getType}}</span>
            <span v-if="$route.name != 'Страница товара'">{{$route.name}}</span>
        </div>
        <div class="search">
            <div class="input_btn">
                <input placeholder="Введите запрос" :value="modelValue" @input="updateInput" ref="searchInput">
                <div class="btn"><img src="@/assets/images/catalog/lupa.svg" alt="search"></div>
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
        }
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
            > div {
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
    }
</style>