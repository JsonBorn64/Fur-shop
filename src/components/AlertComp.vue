<template>
    <div class="alert" ref="alert">
        {{ message || this.$store.state.alert[0] }}
        <img
            @click="closeAlert"
            src="../assets/images/header/Cross.svg"
            alt="x"
        >
    </div>
</template>

<script>
export default {
    data() {
        return {
            message: '',
            timerId: null,
            timerId2: null,
        }
    },
    watch: {
        "$store.state.alert": function(state) {
            if (!state) return
            if (this.$store.state.alert[0] === 'auth/user-not-found') this.message = "Пользователя с таким email не существует"
            if (this.$store.state.alert[0] === 'auth/wrong-password') this.message = "Пароль неверный"
            this.$refs.alert.style.left = "160px"
            this.$refs.alert.style.background = state[1] === "green" ? '#F5ED2A' : "#ec041f"
            clearTimeout(this.timerId)
            clearTimeout(this.timerId2)
            this.timerId = setTimeout(() => { if (this.$refs.alert) this.$refs.alert.style.left = "-160px" }, 5000)
            this.timerId2 = setTimeout(() => { this.$store.state.alert = "", this.message = '' }, 5300)
        }
    },
    methods: {
        closeAlert() {
            clearTimeout(this.timerId)
            clearTimeout(this.timerId2)
            this.$refs.alert.style.left = "-160px"
            setTimeout(() => { this.$store.state.alert = "", this.message = '' }, 300)
        }
    },
    beforeDestroy() {
        clearTimeout(this.timerId)
        clearTimeout(this.timerId2)
    }
}
</script>

<style lang="scss" scoped>
    .alert {
        position: fixed;
        display: grid;
        left: -160px;
        top: 135px;
        transform: translateX(-50%);
        place-content: center;
        padding: 15px 65px 15px 35px;
        font-family: 'Montserrat';
        font-weight: 700;
        font-size: 15px;
        background: #ec041f;
        color: #222;
        transition: 300ms;
        z-index: 1000;
        width: max-content;
        width: 320px;
        min-height: 47px;
        box-shadow: 0 0 30px 0px rgba(0, 0, 0, 0.2);
        img {
            position: absolute;
            top: 15px;
            right: 15px;
            cursor: pointer;
        }
    }
</style>