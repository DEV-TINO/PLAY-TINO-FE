<template>
  <Transition>
    <FinishModal v-if="round"></FinishModal>
  </Transition>
  <div class="flex flex-col h-screen w-full bg-primary">
    <div class="w-full h-24 flex items-center">
      <div class="text-white text-xl pl-6 font-semibold hover:cursor-pointer min-w-40">PLAY - TINO</div>
    </div>
    <div class="w-full sm:min-h-32 flex flex-col justify-end">
      <div class="w-full h-24 flex justify-center items-center">
        <div class="flex items-baseline min-w-52">
          <div class="text-4xl md:text-5xl lg:text-7xl text-favorite-theme font-extrabold text-outline">고냥이</div>
          <div class="text-xl md:text-2xl lg:text-4xl text-white font-bold">월드컵!</div>
        </div>
      </div>
      <div class="w-full text-white text-xl flex justify-center items-center">{{ this.$store.state.gameRound }}강</div>
    </div>
    <div class="w-full h-full mt-2 flex justify-center relative min-w-min">
      <div @click="this.$store.commit('selectImg', 1)" :class="{ 'selected-left': this.$store.state.selectedImg === 1, 'unselected-left': this.$store.state.selectedImg === 2 }" class="w-1/3 flex flex-col justify-center items-end cursor-pointer">
        <img :class="{ 'selected-left': this.$store.state.selectedImg === 1 }" class="border-8 cursor-pointer sm:min-w-72" src="/image/cat1.png" />
        <div :class="{ 'selected-left-text': this.$store.state.selectedImg === 1, 'hidden': this.$store.state.selectedImg === 2 }" class="flex items-center justify-center w-full text-white text-2xl mt-3 min-w-72 sm:text-2xl">고급묘다냥 샴 고양이</div>
      </div>
      <div @click="this.$store.commit('selectImg', 2)" :class="{ 'selected-right': this.$store.state.selectedImg === 2, 'unselected-right': this.$store.state.selectedImg === 1 }" class="w-1/3 flex flex-col justify-center cursor-pointer">
        <img :class="{ 'selected-right': this.$store.state.selectedImg === 2 }" class="border-8 cursor-pointer sm:min-w-72" src="/image/cat2.png" />
        <div :class="{ 'selected-right-text': this.$store.state.selectedImg === 2, 'hidden': this.$store.state.selectedImg === 1 }" class="flex items-center justify-center w-full text-white text-2xl mt-3 min-w-72 sm:text-2xl">왕 크니까 왕 귀엽다 메인쿤</div>
      </div>
      <div v-if="this.$store.state.selectedImg == 0" class="h-24 absolute top-72 inset-0 flex items-center justify-center">
        <img v-show="this.$store.state.selectedImg == 0" class="w-24 h-24 absolute sm:-translate-y-18" src="/image/vs.png" />
      </div>
    </div>
  </div>
</template>

<script>
import FinishModal from './FavoriteFinishModal.vue'
export default {
  components: {
    FinishModal
  },
  data () {
    return {
      round: false
    }
  },
  methods: {
  },
}
</script>

<style>
.text-outline {
  text-shadow:
    -2px -2px 0 white, 2px -2px 0 white,
    -2px 2px 0 white, 2px 2px 0 white,
    0px -3px 0 white, 0px 3px 0 white,
    -3px 0px 0 white, 3px 0px 0 white,
    -3px -2px 0 white, 3px -3px 0 white,
    -3px 3px 0 white, 3px 3px 0 white,
    -2px -3px 0 white, 2px -3px 0 white,
    -2px 3px 0 white, 2px 3px 0 white,
    -3px -2px 0 white, 3px -2px 0 white,
    -3px 2px 0 white, 3px 2px 0 white;
}
.selected-left {
  transition: transform 0.4s ease, left 0.4s ease;
  transform: scale(1.1);
  transform: translateX(25%);
  z-index: 40;
}
.selected-left-text {
  transition: transform 0.4s ease;
  transform: translate(25%, -350%);
  z-index: 50;
  font-weight: 700;
  font-size: 2rem;
}
.selected-right {
  transition: transform 0.4s ease, right 0.4s ease;
  transform: scale(1.1);
  transform: translateX(-25%);
}
.selected-right-text {
  transition: transform 0.4s ease;
  transform: translate(-25%, -350%);
  z-index: 50;
  font-weight: 700;
  font-size: 2rem;
}
.hidden {
  opacity: 0;
}
.unselected-left {
  transition: transform 0.4s ease;
  transform: scale(0.5);
  z-index: 0;
}
.unselected-right {
  transition: transform 0.4s ease;
  transform: scale(0.5);
}
</style>
