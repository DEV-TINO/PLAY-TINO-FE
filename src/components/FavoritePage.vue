<template>
  <div>
    <Transition>
      <FinishModal v-if="this.$store.state.favoriteRoundFinish"></FinishModal>
    </Transition>
    <div class="flex flex-col h-screen w-full bg-primary select-none">
      <div class="w-full h-24 flex items-center pt-4">
        <div @click="handleRouterMain()" class="text-white text-md md:text-xl pl-6 font-semibold hover:cursor-pointer min-w-40">PLAY - TINO</div>
      </div>
      <div class="w-full sm:min-h-32 flex flex-col justify-end pt-20 md:pt-16">
        <div class="w-full h-16 md:h-24 flex justify-center items-center">
          <div class="flex justify-center items-baseline min-w-52">
            <div class="text-3xl sm:text-4xl md:text-5xl lg:text-7xl text-favorite-theme font-extrabold text-outline">고냥이</div>
            <div class="text-xl md:text-2xl lg:text-4xl text-white font-bold">월드컵!</div>
          </div>
        </div>
        <div class="w-full text-white text-sm pb-4 md:text-xl flex justify-center items-center md:pt-5">{{ this.$store.state.favoriteGameRound }}</div>
      </div>
      <div :class="{ 'click-disabled': isDisabled() }" class="w-full h-auto xl:h-full mt-2 mb-5 flex justify-center relative min-w-50">
        <div @click="selectImage(this.imageIndex.left)" :class="{ 'selected-left': this.$store.state.favoriteSelectedImg === this.imageIndex.left }" class="flex flex-col lg:justify-center items-center cursor-pointer">
          <div :class="{ 'selected-left': this.$store.state.favoriteSelectedImg === this.imageIndex.left, 'unselected-left': this.$store.state.favoriteSelectedImg === this.imageIndex.right }" class="w-40 h-40 xl:w-favorite-content-width xl:h-favorite-content-height aspect-w-1 aspect-h-1 border-8 cursor-pointer sm:min-w-72 sm:min-h-72 overflow-hidden">
            <div v-if="!imagePair[this.imageIndex.left]" class="skeleton-loader"></div>
            <img v-show="imagePair[this.imageIndex.left]" @load="handleImageLoad(this.imageIndex.left)" @error="handleImageError(this.imageIndex.left)" class="object-cover w-full h-full" :src="currentPair.image1" />
          </div>
          <div :class="{ 'selected-left-text': this.$store.state.favoriteSelectedImg === this.imageIndex.left, 'hidden': this.$store.state.favoriteSelectedImg === this.imageIndex.right }" class="flex items-center justify-center xl:w-favorite-content-width text-white min-w-40 text-favortire-default-title sm:text-sm mt-1 md:mt-3 md:text-lg lg:text-xl xl:text-2xl md:min-w-72 selected-text-outline">{{ currentPair.title1 }}</div>
        </div>
        <div @click="selectImage(this.imageIndex.right)" :class="{ 'selected-right': this.$store.state.favoriteSelectedImg === this.imageIndex.right }" class="flex flex-col lg:justify-center cursor-pointer">
          <div :class="{ 'selected-right': this.$store.state.favoriteSelectedImg === this.imageIndex.right, 'unselected-right': this.$store.state.favoriteSelectedImg === this.imageIndex.left }" class="w-40 h-40 xl:w-favorite-content-width xl:h-favorite-content-height aspect-w-1 aspect-h-1 border-8 cursor-pointer sm:min-w-72 sm:min-h-72 overflow-hidden">
            <div v-if="!imagePair[this.imageIndex.right]" class="skeleton-loader"></div>
            <img v-show="imagePair[this.imageIndex.right]" @load="handleImageLoad(this.imageIndex.right)" @error="handleImageError(this.imageIndex.right)" class="object-cover w-full h-full" :src="currentPair.image2" />
          </div>
          <div :class="{ 'selected-right-text': this.$store.state.favoriteSelectedImg === this.imageIndex.right, 'hidden': this.$store.state.favoriteSelectedImg === this.imageIndex.left }" class="flex items-center justify-center xl:w-favorite-content-width text-white min-w-40 text-favortire-default-title sm:text-sm mt-1 md:mt-3 md:text-lg md:text-md lg:text-xl xl:text-2xl md:min-w-72 selected-text-outline">{{ currentPair.title2 }}</div>
          <div v-if="this.$store.state.favoriteSelectedImg === ''" class="absolute top-0 bottom-0 left-0 right-0 flex items-center justify-center pointer-events-none">
            <img class="w-8 h-8 sm:w-16 sm:h-16 md:w-16 md:h-16 lg:w-20 lg:h-20 sm:-translate-y-18" src="/image/vs.png" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import FinishModal from './FavoriteFinishModal.vue'

const ImageIndex = {
  left: 0,
  right: 1
}

export default {
  components: {
    FinishModal
  },
  data() {
    return {
      imageIndex: ImageIndex
    }
  },
  mounted() {
    if (this.$store.state.userId === '') {
      alert("로그인 없이 이용할 수 없습니다")
      this.$router.push(`/`)
      return
    }
    this.getFavoriteGame()
  },
  methods: {
    getFavoriteGame() {
      this.$store.commit('resetFavoriteRoundFinish')
      this.$store.dispatch('getFavoriteData')
      this.$store.dispatch('setFavoriteRankMax')
    },
    handleImageError(index) {
      this.imagePair[index] = false
    },
    handleImageLoad(index) {
      this.imagePair[index] = true
    },
    selectImage(index) {
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
        }
      }
      return this.$store.state.favoriteImagePairs[this.$store.state.favoriteCurrentPairIndex]
    },
    imagePair() {
      return [this.currentPair.image1, this.currentPair.image2];
    }
  },
  watch: {
    currentPair() {
      this.imagePair = [false, false]
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
.selected-text-outline {
  text-shadow:
    -2px -2px 0 black, 2px -2px 0 black,
    -2px 2px 0 black, 2px 2px 0 black,
    0px -3px 0 black, 0px 3px 0 black,
    -3px 0px 0 black, 3px 0px 0 black,
    -3px -2px 0 black, 3px -3px 0 black,
    -3px 3px 0 black, 3px 3px 0 black,
    -2px -3px 0 black, 2px -3px 0 black,
    -2px 3px 0 black, 2px 3px 0 black,
    -3px -2px 0 black, 3px -2px 0 black,
    -3px 2px 0 black, 3px 2px 0 black;
}
.selected-left {
  transition: transform 0.5s ease, left 0.5s ease;
  transform: translateX(25%);
  z-index: 40;
}
.selected-left-text {
  font-size: 0.825rem;
  transition: transform 0.5s ease;
  transform: translate(25%, -350%);
  z-index: 50;
  font-weight: 700;
}
.selected-right {
  transition: transform 0.5s ease, right 0.5s ease;
  transform: translateX(-25%);
}
.selected-right-text {
  font-size: 0.825rem;
  transition: transform 0.5s ease;
  transform: translate(-25%, -350%);
  z-index: 50;
  font-weight: 700;
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
.skeleton-loader {
  width: 100%;
  height: 100%;
  background-color: #e0e0e0;
  animation: pulse 1.5s infinite;
}
@keyframes pulse {
  0% {
    background-color: #e0e0e0;
  }
  50% {
    background-color: #f0f0f0;
  }
  100% {
    background-color: #e0e0e0;
  }
}
@media (min-width: 640px) {
  .selected-left-text {
    font-size: 1rem;
    transition: transform 0.5s ease;
    transform: translate(45%, -350%);
  }
  .selected-right-text {
    font-size: 1rem;
    transition: transform 0.5s ease;
    transform: translate(-25%, -350%);
  }
} 
@media (min-width: 768px) {
  .selected-left-text {
    font-size: 1.25rem;
    transition: transform 0.5s ease;
    transform: translate(25%, -350%);
  }
  .selected-right-text {
    font-size: 1.25rem;
    transition: transform 0.5s ease;
    transform: translate(-25%, -350%);
  }
}
@media (min-width: 1024px) {
  .selected-left-text {
    font-size: 1.75rem;
    transition: transform 0.5s ease;
    transform: translate(25%, -350%);
  }
  .selected-right-text {
    font-size: 1.75rem;
    transition: transform 0.5s ease;
    transform: translate(-25%, -350%);
  }
}
</style>
// 내가 보기엔 ! 최소값을 기본 애니메이션으로 지정한 후에, 나머지를 media 사용해서 하는 게 맞는 거 같군!