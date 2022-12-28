<template>
    <router-view></router-view>
    <transition name="fade">
      <div class="loader" v-if="!this.$store.state.fursLoaded"><span class="square"></span></div>
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
  font-size: 64px;
  backdrop-filter: blur(18px);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.square {
  width: 64px;
  height: 64px;
  display: inline-block;
  position: relative;
}

.square::after,
.square::before {
  content: 'ИХN';
  color: rgb(0, 0, 0);
  width: 64px;
  height: 64px;
  position: absolute;
  display: grid;
  place-content: center;
  left: 0;
  top: 0;
  box-sizing: border-box;
  animation: rotation 2s ease-in-out infinite;
}

.square::after {
  animation-delay: 1s;
  color: #ffffff1c;
}

@keyframes rotation {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}
</style>
