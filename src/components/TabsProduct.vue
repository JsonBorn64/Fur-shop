<template>
<section class="tabs">
    <div class="names">
        <div
            class="tab_name"
            @click="activeTab = activeTab === 1 ? -1 : 1"
            :class="{'tab_name-active': activeTab === 1}"
        >
            Отзывы
            <div class="mobile_tab_content" :class="{'active': activeTab === 1}">
                <div class="comments" v-if="activeTab === 1">
                    <div class="comments_wrapper">
                        <p v-if="comments.length < 1">Отзывов нет</p>
                        <div class="comment" v-for="comment in comments" key="comment.created">
                            <div class="comment_name">{{comment.name}}</div>
                            <div class="comment_text">{{comment.text}}</div>
                        </div>
                    </div>
                    <form @submit.prevent="addNewComment">
                        <input type="text" v-model="formData.name" placeholder="Введите ваше имя" minlength="2" required>
                        <textarea rows="4" v-model="formData.text" placeholder="Введите отзыв" minlength="10" required></textarea>
                        <button type="submit">Отправить</button>
                    </form>
                </div>
            </div>
        </div>
        <div
            class="tab_name"
            @click="activeTab = activeTab === 2 ? -2 : 2"
            :class="{'tab_name-active': activeTab === 2}"
        >
            Характеристики
            <div class="mobile_tab_content" :class="{'active': activeTab === 2}">
                <div class="characteristics" v-if="activeTab === 2">
                    <div class="wrapper">
                        {{furById?.Characteristics}}
                    </div>
            <table class="table">
                <tr>
                    <td>Rus</td>
                    <td>Обхват груди</td>
                    <td>Обхват талии</td>
                    <td>Обхват бёдер</td>
                </tr>
                <tr>
                    <td>44</td>
                    <td>46</td>
                    <td>48</td>
                    <td>50</td>
                </tr>
                <tr>
                    <td>88-90</td>
                    <td>92-94</td>
                    <td>96-98</td>
                    <td>100-102</td>
                </tr>
                <tr>
                    <td>68-72</td>
                    <td>74-76</td>
                    <td>78-80</td>
                    <td>82-86</td>
                </tr>
                <tr>
                    <td>92-96</td>
                    <td>98-102</td>
                    <td>102-104</td>
                    <td>106-110</td>
                </tr>
            </table>
        </div>
            </div>
        </div>
        <div
            class="tab_name"
            @click="activeTab = activeTab === 3 ? -3 : 3"
            :class="{'tab_name-active': activeTab === 3}"
        >
            Производство
            <div class="mobile_tab_content" :class="{'active': activeTab === 3}">
                <div class="made_by" v-if="activeTab === 3">Производство</div>
            </div>
        </div>
    </div>
    <div class="tab_content">
        <div class="comments" v-if="activeTab === 1">
            <div class="comments_wrapper">
                <p v-if="comments.length < 1">Отзывов нет</p>
                <div class="comment" v-for="comment in sortedComments" key="comment.created">
                    <div class="comment_name">{{comment.name}}</div>
                    <div class="comment_text">{{comment.text}}</div>
                </div>
            </div>
            <form @submit.prevent="addNewComment">
                <input type="text" v-model="formData.name" placeholder="Введите ваше имя" minlength="2" required>
                <textarea rows="4" v-model="formData.text" placeholder="Введите отзыв" minlength="10" required></textarea>
                <button type="submit">Отправить</button>
            </form>
        </div>
        <div class="characteristics" v-if="activeTab === 2">
            <div class="wrapper">
                {{furById?.Characteristics}}
            </div>
            <table class="table">
                <tr>
                    <td>Rus</td>
                    <td>Обхват груди</td>
                    <td>Обхват талии</td>
                    <td>Обхват бёдер</td>
                </tr>
                <tr>
                    <td>44</td>
                    <td>46</td>
                    <td>48</td>
                    <td>50</td>
                </tr>
                <tr>
                    <td>88-90</td>
                    <td>92-94</td>
                    <td>96-98</td>
                    <td>100-102</td>
                </tr>
                <tr>
                    <td>68-72</td>
                    <td>74-76</td>
                    <td>78-80</td>
                    <td>82-86</td>
                </tr>
                <tr>
                    <td>92-96</td>
                    <td>98-102</td>
                    <td>102-104</td>
                    <td>106-110</td>
                </tr>
            </table>
        </div>
        <div class="made_by" v-if="activeTab === 3">Производство</div>
    </div>
</section>
</template>

<script>
import { getDocs, addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from '@/firebase/firebase.js'
export default {
    data() {
        return {
            activeTab: 2,
            formData: {
                name: this.$store.state.userName || '',
                text: '',
                created: serverTimestamp()
            },
            comments: [],
        }
    },
    watch: { 
        '$route.params.id': {
            handler: function(id) {
                this.getComments()
            },
            deep: true,
            immediate: true
        },
    },
    methods: {
        addNewComment() {
            addDoc(collection(db, "Comments", this.$route.params.id, 'Special comments'), this.formData);
            this.formData.name = ''
            this.formData.text = ''
            this.getComments()
        },
        async getComments() {
            this.comments = [];
            const querySnapshot = await getDocs(collection(db, "Comments", this.$route.params.id, 'Special comments'));
            querySnapshot.forEach((doc) => {
                this.comments.push(doc.data())
            });
        }
    },
    computed: {
        furById() {
            return this.$store.getters.specialFurById(this.$route.params.id)
        },
        sortedComments() {
            return this.comments.sort((a, b) => a.created?.seconds - b.created?.seconds)
        }
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
                user-select: none;
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
        padding: 20px 0;
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
        overflow-x: hidden;
        overflow-y: scroll;
        transition: 500ms;
        @media (min-width: 600px) {
            display: none;
        }
    }
    .active {
        height: 400px;
    }
    .comments {
        animation: fadeIn 300ms;
        font-family: 'Montserrat';
        width: 100%;
        display: flex;
        justify-content: center;
        flex-direction: column;
        > .comments_wrapper {
            display: flex;
            flex-direction: column;
            margin: 20px 0;
            .comment {
                padding: 20px;
                border: 1px solid #666;
                margin-bottom: 20px;
            }
            .comment_name {
                margin-bottom: 10px;
                border-bottom: 1px solid #666;
                padding-bottom: 10px;
            }
            > p {
                text-align: center;
                font-size: 26px;
            }
        }
        > form {
            display: flex;
            flex-direction: column;
            width: 100%;
            > input {
                margin-bottom: 10px;
                margin-top: 20px;
                padding: 4px 10px;
            }
            > textarea {
                padding: 4px 10px;
            }
            > button {
                margin-top: 10px;
                padding: 4px 0;
                min-width: 200px;
                margin-left: auto;
            }
        }
    }
    .characteristics {
        display: flex;
        flex-direction: column;
        font-family: 'Montserrat';
        font-weight: 700;
        font-size: 12px !important;
        line-height: 146.4%;
        color: #222222;
        width: 100%;
        padding: 20px 0;
        .wrapper {
            max-width: 293px;
        }
        @media (min-width: 600px) {
            justify-content: space-evenly;
            align-items: center;
            flex-direction: row;
        }
    }

    .made_by {
        animation: fadeIn 300ms;
        font-size: 30px;
        font-family: 'Montserrat';
        height: 240px;
        display: grid;
        place-content: center;
    }

    .table {
        font-family: 'Montserrat';
        font-weight: 700;
        font-size: 12px;
        line-height: 146.4%;
        color: #222222;
        border-collapse: collapse;
        max-width: 390px;
        width: 100%;
        @media (max-width: 600px) {
            margin-top: 20px;
        }
        td {
            border: 1px solid black;
            text-align: center;
            vertical-align: middle;
            width: 70px;
            height: 30px;
            padding: 6px 5px;
        }
    }
</style>