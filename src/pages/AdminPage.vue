<template>
    <header-comp/>
    <bread-crumps-search/>
    <form @submit.prevent="addNewFur" class="add_form" >
        <h2>Форма добавления товара</h2>
        <input type="text" placeholder="Название товара" v-model="formData.Name" minlength="10" required>
        <!-- <input type="text" placeholder="Тип" v-model="formData.Type" minlength="3" required> -->
        <select v-model="formData.Type" required>
            <option value="Шубы">Шубы</option>
            <option value="Куртки">Куртки</option>
            <option value="Дублёнки">Дублёнки</option>
        </select>
        <input type="text" placeholder="Описание" v-model="formData.About" minlength="50" maxlength="300" required>
        <div class="sizes_wrapper">
            <input type="checkbox" value="s" v-model="formData.Size"> <p>s</p>
            <input type="checkbox" value="m" v-model="formData.Size"> <p>m</p>
            <input type="checkbox" value="l" v-model="formData.Size"> <p>l</p>
            <input type="checkbox" value="xl" v-model="formData.Size"> <p>xl</p>
            <input type="checkbox" value="xxl" v-model="formData.Size"> <p>xxl</p>
        </div>
        <textarea rows="9" v-model="formData.Characteristics"></textarea>
        <input type="number" placeholder="Цена" v-model="formData.Price" required>
        <input type="number" placeholder="Зачёркнутая цена" v-model="formData.OldPrice">
        <input type="number" placeholder="Количество на складе" v-model="formData.InStock">
        <form action="php/upload.php" method="post" enctype="multipart/form-data" ref="fileForm">
            <label style="font-size: 14px">Все названия файлов должны быть уникальны. <br>Размер не больше 2мб</label><br>
            <input type="file" name="images[]" @change="inputFile($event)" multiple required>
        </form>
        <button type="submit">Добавить</button>
    </form>
    <section class="goods">
        <div class="sort_wrap">
            <p style="margin-bottom: 10px">Сортировать по:</p>
            <input type="radio" name="sort" value="Data" v-model="sortBy"> Дате создания
            <input type="radio" name="sort" value="Orders" v-model="sortBy"> Количеству продаж
            <input type="radio" name="sort" value="InStock" v-model="sortBy"> Количеству на складе
            <input type="radio" name="sort" value="Price" v-model="sortBy"> Цене
        </div>
        <ul class="list">
            <li class="good" v-for="item in sortedFurs">
                <img :src="`upload/${item.Images[0]}`">
                <div class="good_wrap">
                    <router-link :to="`/item/${item.id}/#header`" style="font-weight: 600; margin-bottom: 8px; color: black;">
                        {{item.Name}}
                    </router-link>
                    <p>Дата создания: {{new Date(item?.Created?.seconds*1000).toLocaleString()}}</p>
                    <p>Цена: {{item.Price}}</p>
                    <p>Количество покупок: {{item.Orders || 0}}</p>
                    <p>Наличие на складе: {{item.InStock}}</p>
                </div>
                <a href="https://console.firebase.google.com/project/fur-shop-696b1/firestore/data/~2FFurs" target="_blank" class="editBtn">Редактировать</a>
                <a class="deleteBtn" @click="deleteGood(item.id)">Удалить</a>
            </li>
        </ul>
    </section>
    <footer-comp/>
</template>

<script>
import HeaderComp from '@/components/HeaderComp.vue'
import BreadCrumpsSearch from '@/components/BreadCrumpsSearch.vue';
import FooterComp from '@/components/FooterComp.vue'
import { collection, addDoc, doc, deleteDoc, serverTimestamp } from "firebase/firestore";
import { db } from '@/firebase/firebase.js'
export default {
  components: { HeaderComp, FooterComp, BreadCrumpsSearch },
  data() {
    return {
        formData: {
            Name: '',
            Type: 'Шубы',
            About: '',
            Size: [],
            OldPrice: null,
            Price: null,
            InStock: null,
            Images: [],
            Created: serverTimestamp(),
            Characteristics: 'Модель................................................Шуба Фасон...................................................Кокон Мех........................................................Норка Ворот....................................................Стойка   Длина изделия.................................110 см Узор.......................................................Поперечный Застёжка.............................................Крючки КиЗ.........................................................KZ-7656756-7HJ76OL',
        },
        furs: this.$store.state.furs,
        sortBy: 'Data',
    }
  },
  methods: {
    addNewFur() {
        addDoc(collection(db, "Furs"), this.formData);
        this.$refs.fileForm.submit()
    },
    inputFile(e) {
        const names = [];
        for (const item of e.target.files) {
            names.push(item.name)
        }
        this.formData.Images = names
    },
    deleteGood(id) {
        deleteDoc(doc(db, "Furs", id))
        this.$store.dispatch('getData')
    }
  },
  computed: {
    sortedFurs() {
        if (this.sortBy === 'Data') {
            return [...this.furs].sort((a, b) => a.Created.seconds - b.Created.seconds);
        } else if (this.sortBy === 'Orders') {
            return [...this.furs].sort((a, b) => b.Orders - a.Orders);
        } else if (this.sortBy === 'InStock') {
            return [...this.furs].sort((a, b) => a.InStock - b.InStock);
        } else if (this.sortBy === 'Price') {
            return [...this.furs].sort((a, b) => b.Price - a.Price);
        }
    }
  },
}
</script>

<style lang="scss" scoped>
    .title {
        margin-top: 50px;
        margin-bottom: 50px;
    }
    .add_form {
        border: 1px solid black;
        padding: 40px 60px;
        display: flex;
        flex-direction: column;
        align-self: flex-start;
        margin-top: 50px;
        select {
            margin-bottom: 15px;
        }
        textarea {
            font-size: 13px;
            margin-bottom: 15px;
        }
        h2 {
            margin-bottom: 40px;
        }
        input {
            margin-bottom: 15px;
        }
    }
    .sizes_wrapper {
        display: flex;
        align-items: center;
        > input {
            margin-right: 5px;
            &:not(:first-child) {
                margin-left: 18px;
            }
        }
        > p {
            transform: translateY(-8px);
            font-size: 18px;
        }
    }

    .goods {
        margin-top: 50px;
        align-self: flex-start;
        width: 100%;
        padding: 60px 80px;
        border: 1px solid black;
        margin-bottom: 100px;
    }
    .list {
        margin-top: 40px;
    }
    .good {
        display: flex;
        align-items: center;
        margin-bottom: 40px;
        > img {
            width: 100px;
            height: 100px;
            object-fit: cover;
            margin-right: 20px;
        }
    }
    .deleteBtn, .editBtn {
        display: grid;
        place-content: center;
        height: 30px;
        width: 120px;
        background: rgb(255, 118, 118);
        color: white;
        font-weight: 600;
        cursor: pointer;
    }
    .editBtn {
        margin-left: auto;
        width: 140px;
        margin-right: 10px;
        background: rgb(127, 118, 255);
    }
</style>