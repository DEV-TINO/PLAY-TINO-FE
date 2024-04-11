<template>
  <Transition name="modalFadeEffect">
    <ModalCard v-if="openModal"
      @closeModal="openModal = $event">
    </ModalCard>
  </Transition>
  <div class="flex flex-col h-screen w-full bg-primary">
    <div class="w-full h-24 min-h-20 flex items-center">
      <div class="text-white text-xl pl-4 font-semibold hover:cursor-pointer min-w-40">PLAY - TINO</div>
    </div>
    <div class="w-full min-h-40 flex justify-center items-center bg-primary">
      <div class="flex items-baseline gap-2 min-w-52">
        <div class="text-4xl md:text-5xl lg:text-7xl text-quiz-theme font-extrabold text-outline">문제를</div>
        <div class="text-xl md:text-2xl lg:text-4xl text-white font-bold">맞춰라!</div>
      </div>
    </div>
    <div class="w-full h-full flex items-start justify-center bg-primary">
      <div class="bg-white min-h-60 min-w-96 max-w-6xl py-6 md:py-8 lg:py-10 xl:py-12 h-full w-7/12 rounded-2xl flex flex-col justify-center items-center gap-2 md:gap-3">
        <div class="flex w-11/12">
          <div class="bg-quiz-theme text-white text-base sm:text-lg md:text-xl xl:text-2xl w-20 sm:w-24 md:w-28 xl:w-32 h-8 sm:h-9 md:h-10 xl:h-12 flex items-center justify-center rounded-xl">넌센스</div>
        </div>
        <div class="flex border-quiz-box border-[3px] py-6 md:py-8 xl:py-10 px-6 rounded-xl w-11/12">
          <div class="min-w-14 xl:min-w-16 text-lg md:text-xl xl:text-2xl font-semibold text-primary">Q 12.</div>
          <div class="text-lg md:text-xl xl:text-2xl font-semibold text-primary">동생과 형이 싸우는데 엄마가 동생 편만 드는 세상은?</div>
        </div>
        <div class="flex gap-2 text-gray-500 w-11/12 pt-4 md:pt-6">
          <div class="text-sm md:text-base xl:text-lg">Hint:</div>
          <div class="text-sm md:text-base xl:text-lg">평소에 형에 대해 어떻게 생각하셨나요?</div>
        </div>
        <div class="flex w-11/12 gap-4">
          <textarea placeholder="정답을 작성해주세요" class="border-primary overflow-hidden rounded-xl border-2 w-full h-12 pt-2 px-3 text-lg md:text-xl resize-none font-semibold"></textarea>
          <div @click="handleClickTitle($event)" class="bg-quiz-theme text-white font-bold w-14 rounded-lg flex justify-center items-center text-2xl">
            <font-awesome-icon :icon="['fas', 'angle-right']" />
          </div>
        </div>
      </div>
    </div>
    <div class="bg-primary w-full h-full flex items-start justify-center py-5">
      <div class="flex gap-1 items-baseline justify-center w-24 h-8 md:w-32 md:h-9 bg-quiz-theme rounded-xl">
        <div class="text-white font-medium text-xl md:text-2xl">8</div>
        <div class="text-white text-sm md:text-lg">/10</div>
      </div>
    </div>
    <div class="bg-progress-bar-light w-full h-full min-h-1 max-h-2">
      <div id="bar" class="text-right h-full bg-progress-bar-dark min-h-1 max-h-2"></div>
    </div>
  </div>
</template>
  
<script>
import ModalCard from '../components/QuizWrongModal.vue'
  export default {
    components:{
      ModalCard,
  },
    data() { 
      return {
        openModal: false,
        progressbarHandler: null,
        timeBegan: null,
        MAX_TIME: 15000, // 15s
      }
  },
  methods: {
    handleClickTitle(index){
      this.openModal = true
    },
    progressBarStart() {
      this.timeBegan = new Date()
      const el = document.getElementById("bar")
      el.style.width = "0%"

      if (this.progressbarHandler == null) {
        this.progressbarHandler = setInterval(this.updateProgressbar, 30)
      }
    },
    progressBarStop() {
      if (this.progressbarHandler != null) {
        clearInterval(this.progressbarHandler)
        this.progressbarHandler = null
      }
    },
    updateProgressbar() {
      const currentTime = new Date(),
        timeElapsed = new Date(
          this.countDownTime - (currentTime - this.timeBegan)
        )
      const time = currentTime - this.timeBegan
      const el = document.getElementById("bar")
      let width = (time / this.MAX_TIME) * 100 + "%"
      width = parseFloat((time / this.MAX_TIME) * 100 + "%").toFixed(2)
      if (width > 100) width = 100

      let widthStr = width + "%"
      el.style.width = widthStr

      if (time >= this.MAX_TIME) {
        this.handleOpenModal()
      }
    },
  },
  mounted() {
    this.progressBarStart()
  },
}
</script>
  
<style scoped>
.text-outline {
  text-shadow:
    -1px -1px 0 white, 1px -1px 0 white,
    -1px 1px 0 white, 1px 1px 0 white,
    0px -2px 0 white, 0px 2px 0 white,
    -2px 0px 0 white, 2px 0px 0 white,
    -2px -2px 0 white, 2px -2px 0 white,
    -2px 2px 0 white, 2px 2px 0 white,
    -1px -2px 0 white, 1px -2px 0 white,
    -1px 2px 0 white, 1px 2px 0 white,
    -2px -1px 0 white, 2px -1px 0 white,
    -2px 1px 0 white, 2px 1px 0 white;
}
.modalFadeEffect-enter-from {
  opacity: 0;
}
.modalFadeEffect-enter-active {
  transition: all 0.5s;
}
.modalFadeEffect-enter-to {
  opacity: 1;
}
.modalFadeEffect-leave-from {
  opacity: 1;
}
.modalFadeEffect-leave-active {
  transition: all 0.2s;
}
.modalFadeEffect-leave-to {
  opacity: 0;
}
</style>