<template>
    <header-comp/>
    <bread-crumps-search/>
    <section class="cart">
        <ul class="cart_list">
            <div class="top_sep_line"></div>
            <li class="cart_item" v-for="item in cartItems">
                <div class="item_img">
                    <img :src="`upload/${item?.Images[0]}`" alt="img">
                    <div class="favorite_btn"></div>
                </div>
                <div class="item_info">
                    <div class="item_name_and_price">
                        <p @click="$router.push(`/item/${item.id}/#header`)" class="item_name">{{item.Name}}</p>
                        <div class="item_price">{{new Intl.NumberFormat('ru-RU').format(item.Price)}} <span>тг</span></div>
                    </div>
                    <div class="size">{{item.Size}}</div>
                    <input type="checkbox" :value="item" v-model="selectedItems" ref="checkboxes">
                </div>
            </li>
        </ul>
        <div class="total">
            <div class="wrapper">
                <div class="total_price">Сумма: <div class="item_price">{{new Intl.NumberFormat('ru-RU').format(totalPrice)}} <span>тг</span></div></div>
                <div class="total_selected">Выбрано: <span>{{selectedItems.length}}</span></div>
                <div
                    class="order_btn"
                    v-if="selectedItems.length > 0"
                    @click="order"
                >Оформить заказ</div>
            </div>
        </div>
    </section>
    <footer-comp/>
</template>

<script>
import HeaderComp from '@/components/HeaderComp.vue';
import BreadCrumpsSearch from '@/components/BreadCrumpsSearch.vue';
import FooterComp from '@/components/FooterComp.vue';
import favoritesMixin from '@/mixins/favoritesMixin';
import cartMixin from '../mixins/cartMixin';

export default {
    components: { HeaderComp, FooterComp, BreadCrumpsSearch },
    mixins: [favoritesMixin, cartMixin],
    data() {
        return {
            selectedItems: [],
        }
    },
    computed: {
        totalPrice() {
            return this.selectedItems.reduce((prev, current) => prev + current.Price, 0);
        }
    },
    methods: {
        order() {
            this.$router.push('/order#header');
            localStorage.setItem('order', JSON.stringify(this.selectedItems))
        }
    },
    mounted() {
        this.$refs?.checkboxes?.forEach(item => {
            setTimeout(() => item.click(), 0);
        });
    },
}
</script>

<style lang="scss" scoped>
    .top_sep_line {
        max-width: 390px;
        height: 1px;
        background: rgba(34, 34, 34, 0.33);
        margin-bottom: 36px;
        @media (max-width: 800px) {
            height: 0px;
        }
    }
    .cart {
        width: 100%;
        font-family: 'Montserrat';
        margin-bottom: 30px;
        display: flex;
        @media (max-width: 741px) {
            margin-top: 50px;
            display: flex;
            flex-direction: column;
        }
    }

    .cart_list {
        width: 100%;
    }

    .cart_item {
        display: flex;
        &:not(:last-child) {
            border-bottom: 1px solid rgba(34, 34, 34, 0.33);
            padding-bottom: 20px;
            margin-bottom: 20px;
        }
    }

    .item_img {
        min-width: 150px;
        height: 150px;
        margin-right: 10px;
        > img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }

    .item_info {
        width: 100%;
        display: flex;
        flex-direction: column;
        > input {
            margin: auto auto 0 0;
            width: 15px;
            height: 15px;
        }
    }
    .item_name_and_price {
        display: flex;
        justify-content: space-between;
        margin-right: 1px;
        @media (max-width: 500px) {
            flex-wrap: wrap;
        }
    }

    .item_price {
        font-family: 'Montserrat';
        font-weight: 500;
        font-size: 24px;
        letter-spacing: -0.02em;
        color: #A31414;
        white-space: nowrap;
        margin-left: 10px;
        @media (max-width: 500px) {
            margin-left: 0px;
        }
        > span {
            font-family: 'Montserrat';
            font-weight: 700;
            font-size: 15px;
            letter-spacing: -0.02em;
            color: rgba(34, 34, 34, 0.6);
        }
    }
    .item_name {
        font-family: 'Montserrat';
        font-weight: 700;
        font-size: 15px;
        line-height: 21px;
        letter-spacing: -0.02em;
        color: #222222;
        max-width: 250px;
        cursor: pointer;
        @media (max-width: 500px) {
            margin-bottom: 6px;
        }
    }

    .size {
        font-family: 'Montserrat';
        font-weight: 700;
        font-size: 15px;
        letter-spacing: -0.02em;
        text-transform: uppercase;
        color: #222222;
        margin-top: 10px;
        border: 1px solid #666666;
        margin-right: 28px;
        padding: 0 7px;
        width: fit-content;
    }

    .total {
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 36px 75px 0 22px;
        padding-left: 22px;
        border-left: 1px solid rgba(34, 34, 34, 0.33);
        @media (max-width: 820px) {
            margin: 36px 22px 0 22px;
        }
        @media (max-width: 741px) {
            border-left: none;
            padding-top: 20px;
            margin-top: 20px;
            border-top: 1px solid rgba(34, 34, 34, 0.33);
        }
    }

    .order_btn {
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        width: 176px;
        height: 39px;
        background: #F5ED2A;
        box-shadow: 1px 1px 15px #F5ED2A;
        margin-top: 47px;
        font-family: 'Montserrat';
        font-weight: 700;
        font-size: 15px;
        color: #222222;
    }

    .wrapper {
        width: 201px;
        font-family: 'Montserrat';
        font-weight: 700;
        font-size: 15px;
        letter-spacing: -0.02em;
        color: #222222;
    }

    .total_selected {
        > span {
            color: #A31414;
            margin-left: 6px;
        }
    }

    .total_price {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        margin-bottom: 15px;
    }

</style>