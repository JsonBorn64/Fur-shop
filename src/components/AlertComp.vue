<template>
    <div class="alert" ref="alert">{{ message || this.$store.state.alert[0] }}</div>
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
            this.$refs.alert.style.top = "60px"
            this.$refs.alert.style.background = state[1] === "green" ? '#58f84a' : "#f84a4a"
            clearTimeout(this.timerId)
            clearTimeout(this.timerId2)
            this.timerId = setTimeout(() => { this.$refs.alert.style.top = "-40px" }, 5000)
            this.timerId2 = setTimeout(() => { this.$store.state.alert = "", this.message = '' }, 5300)
        }
    }
}
</script>

<style lang="scss" scoped>
    .alert {
        position: fixed;
        display: grid;
        left: 50%;
        top: -60px;
        transform: translateX(-50%);
        place-content: center;
        padding: 10px 20px;
        font-family: 'Montserrat', sans-serif;
        font-weight: 700;
        background: #58f84a;
        transition: 300ms;
        z-index: 999;
    }
</style>