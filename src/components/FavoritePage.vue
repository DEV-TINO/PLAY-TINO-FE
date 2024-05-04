<template>
  <div>
    <Transition>
      <FinishModal v-if="$store.state.favoriteRoundFinish"></FinishModal>
    </Transition>
    <div class="flex flex-col h-screen w-full bg-primary">
      <div class="w-full h-24 flex items-center">
        <div @click="handleRouterMain()" class="text-white text-xl pl-6 font-semibold hover:cursor-pointer min-w-40">PLAY - TINO</div>
      </div>
      <div class="w-full sm:min-h-32 flex flex-col justify-end p-8">
        <div class="w-full h-24 flex justify-center items-center">
          <div class="flex items-baseline min-w-52">
            <div class="text-4xl md:text-5xl lg:text-7xl text-favorite-theme font-extrabold text-outline">고냥이</div>
            <div class="text-xl md:text-2xl lg:text-4xl text-white font-bold">월드컵!</div>
          </div>
        </div>
        <div class="w-full text-white text-xl flex justify-center items-center p-8">{{ $store.state.favoriteGameRound }}</div>
      </div>
      <div class="w-full h-full mt-2 flex justify-center relative min-w-min">
        <div @click="selectedImg(0)" :class="{ 'selected-left': $store.state.favoriteSelectedImg === 0 }" class="flex flex-col justify-center items-end cursor-pointer">
          <div :class="{ 'selected-left': $store.state.favoriteSelectedImg === 0, 'unselected-left': $store.state.favoriteSelectedImg === 1 }" class="w-favorite-content-width h-favorite-content-height aspect-w-1 aspect-h-1 border-y-16 border-l-16 border-r-8 cursor-pointer sm:min-w-72 min-h-72 overflow-hidden">
            <img class="object-cover w-full h-full" :src="currentPair.image1" />
          </div>
          <div :class="{ 'selected-left-text': $store.state.favoriteSelectedImg === 0, 'hidden':  $store.state.favoriteSelectedImg === 1 }" class="flex items-center justify-center w-favorite-content-width text-white text-2xl mt-3 min-w-72 sm:text-2xl drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">{{ currentPair.title1 }}</div>
        </div>
        <div @click="selectedImg(1)" :class="{ 'selected-right': $store.state.favoriteSelectedImg === 1 }" class="flex flex-col justify-center cursor-pointer">
          <div :class="{ 'selected-right': $store.state.favoriteSelectedImg === 1, 'unselected-right': $store.state.favoriteSelectedImg === 0 }" class="w-favorite-content-width h-favorite-content-height aspect-w-1 aspect-h-1 border-y-16 border-r-16 border-l-8 cursor-pointer sm:min-w-72 min-h-72 overflow-hidden">
            <img class="object-cover w-full h-full" :src="currentPair.image2" />
          </div>
          <div :class="{ 'selected-right-text': $store.state.favoriteSelectedImg === 1, 'hidden':  $store.state.favoriteSelectedImg === 0 }" class="flex items-center justify-center w-favorite-content-width text-white text-2xl mt-3 min-w-72 sm:text-2xl drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">{{ currentPair.title2 }}</div>
          <div v-if="this.$store.state.favoriteSelectedImg == 0" class="absolute top-0 bottom-0 left-0 right-0 flex items-center justify-center pointer-events-none">
            <img v-show="this.$store.state.favoriteSelectedImg == 0" class="w-24 h-24 sm:-translate-y-18" src="/image/vs.png" />
          </div>
        </div>
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
  mounted() {
    this.$store.commit('resetFavoriteRoundFinish')
    this.$store.dispatch('getFavoriteData')
    this.$store.dispatch('setFavoriteRankMax')
  },
  methods: {
    selectedImg(index) {
      if (this.$store.state.favoriteSelectedImg !== '') {
        return
      }

      this.$store.dispatch('selectFavoriteImgIndex', index)
    },
    handleRouterMain() {
      this.$router.push(`/`)
    },
    isDisabled() {
      return this.$store.state.favoriteSelectedImg !== ''
    }
  },
  computed: {
    currentPair() {
      if (this.$store.state.favoriteImagePairs.length === 0 || this.$store.state.favoriteCurrentPairIndex >= this.$store.state.favoriteImagePairs.length) {
        return {
          image1: '',
          image2: '',
          title1: '',
          title2: ''
        };
      }
      return this.$store.state.favoriteImagePairs[this.$store.state.favoriteCurrentPairIndex];
    }
  }
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
  transition: transform 0.5s ease, left 0.5s ease;
  transform: scale(1.1);
  transform: translateX(25%);
  z-index: 40;
}
.selected-left-text {
  transition: transform 0.5s ease;
  transform: translate(25%, -350%);
  z-index: 50;
  font-weight: 700;
  font-size: 2rem;
}
.selected-right {
  transition: transform 0.5s ease, right 0.5s ease;
  transform: scale(1.1);
  transform: translateX(-25%);
}
.selected-right-text {
  transition: transform 0.5s ease;
  transform: translate(-25%, -350%);
  z-index: 50;
  font-weight: 700;
  font-size: 2rem;
}
.hidden {
  opacity: 0;
}
.unselected-left {
  transition: transform 0.5s ease;
  transform: scale(0.5);
  z-index: 0;
}
.unselected-right {
  transition: transform 0.5s ease;
  transform: scale(0.5);
}
.click-disabled {
  pointer-events: none;
}
.click-abled {
  pointer-events: auto;
}
</style>
