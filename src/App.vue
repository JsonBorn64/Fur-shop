<template>
    <router-view></router-view>
    <transition name="fade">
      <div class="loader" v-if="!this.$store.state.fursLoaded">Зашубогрузочка...</div>
    </transition>
</template>

<script>
export default {
  beforeCreate() {
    if (!localStorage.getItem('favorites')) localStorage.setItem('favorites', JSON.stringify([]))
    this.$store.dispatch('getAuthState')
    this.$store.dispatch('getData')
    this.$store.dispatch('getEditableContent')
  }
}
</script>

<style lang="scss" scoped>
  .loader {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 1000;
    display: grid;
    place-content: center;
    font-size: 30px;
    backdrop-filter: blur(18px);
  }
  .fade-enter-active, .fade-leave-active {
    transition: opacity 1s ease;
  }
  .fade-enter-from, .fade-leave-to {
    opacity: 0;
  }
</style>
