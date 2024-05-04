<template>
  <Transition name="modalFadeEffect">
    <component :is="modalComponent" v-if="openModal" 
               :correctAnswer="currentQuiz.answer" 
               :quizIndex="quizCount"
               @confirm="loadNextQuiz"
               @progressBarStart="progressBarStart"
               @progressBarStop="progressBarStop"
               @closeModal="openModal = false"
               @openModal="openResultModal = true" />
  </Transition>
  <Transition name="modalFadeEffect">
    <ResultModalCard v-if="openResultModal"
      :nonsenseCorrect="this.nonsenseCorrect"
      :commonCorrect="this.commonCorrect">
    </ResultModalCard>
  </Transition>
  <div class="flex flex-col h-screen w-full bg-primary">
    <div class="w-full h-24 min-h-20 flex items-center" @click="handleRouterMain()">
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
          <div class="bg-quiz-theme text-white text-base sm:text-lg md:text-xl xl:text-2xl w-20 sm:w-24 md:w-28 xl:w-32 h-8 sm:h-9 md:h-10 xl:h-12 flex items-center justify-center rounded-xl">{{ this.currentQuiz.category }}</div>
        </div>
        <div class="flex border-quiz-box border-3 py-6 md:py-8 xl:py-10 px-6 rounded-xl w-11/12">
          <div class="min-w-14 xl:min-w-16 text-lg md:text-xl xl:text-2xl font-semibold text-primary">Q {{ this.quizCount }}.</div>
          <div class="text-lg md:text-xl xl:text-2xl font-semibold text-primary">{{ this.currentQuiz.question }}</div>
        </div>
        <div class="flex gap-2 text-gray-500 w-11/12 pt-4 md:pt-6">
          <div class="text-sm md:text-base xl:text-lg">Hint:</div>
          <div class="text-sm md:text-base xl:text-lg">{{ this.currentQuiz.hint }}</div>
        </div>
        <div class="flex w-11/12 gap-4">
          <input @keyup.enter="handleOpenModal($event)" v-model="answer" placeholder="정답을 작성해주세요" type="text" class="border-primary overflow-hidden rounded-xl border-2 w-full h-12 py-2 px-3 text-lg md:text-xl resize-none font-semibold"></input>
          <div @click="handleOpenModal($event)" class="bg-quiz-theme text-white font-bold w-14 rounded-lg flex justify-center items-center text-2xl">
            <font-awesome-icon :icon="['fas', 'angle-right']" />
          </div>
        </div>
      </div>
    </div>
    <div class="bg-primary w-full h-full flex items-start justify-center py-5">
      <div class="flex gap-1 items-center justify-center w-24 h-8 md:w-32 md:h-9 bg-quiz-theme rounded-xl">
        <div class="text-white font-medium text-xl md:text-2xl">{{ this.quizCount }}</div>
        <div class="text-white text-xl"> / </div>
        <div class="text-white text-sm md:text-lg">{{ this.quizNumber }}</div>
      </div>
    </div>
    <div class="bg-progress-bar-light w-full h-full min-h-1 max-h-2">
      <div ref="progressBar" class="text-right h-full bg-progress-bar-dark min-h-1 max-h-2"></div>
    </div>
  </div>
</template>
  
<script>
const MAX_TIME = 15000 // 15s
import WrongModalCard from '../components/QuizWrongModal.vue'
import CorrectModalCard from '../components/QuizCorrectModal.vue'
import ResultModalCard from '../components/QuizResultModal.vue'
import axios from 'axios'

export default {
  components:{
    WrongModalCard,
    CorrectModalCard,
    ResultModalCard
  },
  data() { 
    return {
      openModal: false,
      openResultModal: false,
      modalComponent: null,
      progressbarHandler: null,
      timeBegan: null,
      quizNumber: 10,
      quizCount: 1,
      quizzes: [],
      currentQuiz: [],
      answer: '', 
      nonsenseCorrect: 0,
      commonCorrect: 0,
      gameId: '',
    }
  },
  methods: {
    async getQuiz() {
      const response = await axios.get(`${this.$store.state.quizHost}/quiz/start/user/${this.$store.state.userId}`)
      const obj = response.data.responseQuizList
      this.gameId = response.data.gameId
      this.quizzes = JSON.parse(obj)
      this.currentQuiz = this.quizzes[this.quizCount - 1]
    },
    async saveRank() {
      const rankData = {
        gameId: this.gameId,
        userId: this.$store.state.userId,
        nonsenseCorrect: this.nonsenseCorrect,
        commonsenseCorrect: this.commonCorrect
      }
      const response = await axios.post(`${this.$store.state.quizHost}/quiz/rank`, rankData)
    },
    loadNextQuiz() {
      if(this.quizCount < this.quizNumber) {
        this.quizCount++
        this.currentQuiz = this.quizzes[this.quizCount - 1]
        this.answer=''
      }
      else {
        this.saveRank()
        this.openModal = true
        this.modalComponent = 'ResultModalCard'
      }
    },
    handleOpenModal(){
      if (!this.openModal) {
        this.openModal = true
        this.isCorrect()
        this.progressBarStop()
      }
      else {
        this.loadNextQuiz()
        this.openModal = false
        this.progressBarStart()
        if (this.quizCount == 10) {
          this.openResultModal = true
          this.progressBarStop()
        }
      }
    },
    isCorrect() {
      const strippedAnswer = this.answer.trim().replace(/\n|\r|\s*/g, "")
      const strippedCorrectAnswer = String(this.currentQuiz.answer).trim().replace(/\n|\r|\s*/g, "")
      if (strippedAnswer == strippedCorrectAnswer) {
        this.modalComponent = 'CorrectModalCard'
        if (this.currentQuiz.category == "상식") this.commonCorrect++
        else this.nonsenseCorrect++
      } else {
        this.modalComponent = 'WrongModalCard'
      }
    },
    progressBarStart() {
      this.timeBegan = new Date()
      const el = this.$refs.progressBar
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
      const el = this.$refs.progressBar
      let width = (time / MAX_TIME) * 100 + "%"
      width = parseFloat((time / MAX_TIME) * 100 + "%").toFixed(2)
      if (width > 100) width = 100

      let widthStr = width + "%"
      el.style.width = widthStr

      if (time >= MAX_TIME) {
        this.handleOpenModal()
      }
    },
    handleRouterMain() {
      this.progressBarStop()
      this.$router.push(`/`)
    },
  },
  mounted() {
    this.progressBarStart()
    this.getQuiz()
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