<template>
  <Transition name="modalFadeEffect">
    <component
      :is="modalComponent"
      v-if="openModal"
      :correctAnswer="currentQuiz.answer"
      :quizIndex="quizCount"
      @confirm="loadNextQuiz"
      @progressBarStart="progressBarStart"
      @progressBarStop="progressBarStop"
      @closeModal="openModal = false"
      @openModal="openResultModal = true"
    />
  </Transition>
  <Transition name="modalFadeEffect">
    <ResultModalCard
      v-if="openResultModal"
      :nonsenseCorrect="nonsenseCorrect"
      :commonCorrect="commonCorrect"
      :rankIn="rankIn"
      @restart="getQuiz"
      @closeResultModal="openResultModal = $event"
      @progressBarStart="progressBarStart"
    />
  </Transition>
  <div class="flex flex-col h-screen w-full bg-primary">
    <div class="w-full h-24 min-h-16 sm:min-h-20 flex items-center cursor-pointer select-none" @click="handleRouterMain">
      <div class="text-white text-sm sm:text-xl pl-4 font-semibold hover:cursor-pointer min-w-40 select-none">PLAY - TINO</div>
    </div>
    <div class="w-full min-h-16 sm:min-h-24 md:min-h-32 lg:min-h-40 pb-6 flex justify-center items-center bg-primary">
      <div class="flex items-baseline gap-2 min-w-52 select-none">
        <div class="text-4xl md:text-5xl lg:text-7xl text-quiz-theme font-extrabold text-outline">문제를</div>
        <div class="text-xl md:text-2xl lg:text-4xl text-white font-bold">맞춰라!</div>
      </div>
    </div>
    <div class="w-full flex justify-center bg-primary">
      <div class="bg-white min-w-80 max-w-6xl py-4 lg:py-6 xl:py-8 h-full w-7/12 rounded-2xl flex flex-col justify-center items-center gap-2 md:gap-3">
        <div class="flex w-11/12 select-none">
          <div class="bg-quiz-theme text-white text-sm sm:text-lg md:text-xl xl:text-2xl w-16 sm:w-24 md:w-28 xl:w-32 h-7 sm:h-9 md:h-10 xl:h-12 flex items-center justify-center rounded-lg sm:rounded-xl">
            {{ currentQuiz.category }}
          </div>
        </div>
        <div class="flex flex-col sm:flex-row border-quiz-box border-3 py-4 sm:py-6 md:py-8 xl:py-10 px-4 sm:px-6 rounded-xl w-11/12 select-none">
          <div class="min-w-14 xl:min-w-16 text-base sm:text-lg md:text-xl xl:text-2xl font-semibold text-primary">Q {{ quizCount }}.</div>
          <div class="text-base sm:text-lg md:text-xl xl:text-2xl font-semibold text-primary">
            {{ currentQuiz.question }}
          </div>
        </div>
        <div class="flex gap-2 text-gray-500 w-11/12 pt-2 sm:pt-4 md:pt-6 select-none">
          <div class="text-sm md:text-base xl:text-lg">Hint:</div>
          <div class="text-sm md:text-base xl:text-lg">{{ currentQuiz.hint }}</div>
        </div>
        <div class="flex w-11/12 gap-2 sm:gap-4">
          <input @keypress.enter="handleOpenModal" v-model="answer" placeholder="정답을 작성해주세요" type="text" class="border-primary overflow-hidden rounded-lg sm:rounded-xl border-2 w-full h-8 sm:h-12 py-2 px-3 text-base sm:text-lg md:text-xl resize-none font-semibold"/>
          <div @click="handleOpenModal" class="select-none cursor-pointer bg-quiz-theme text-white font-bold w-10 sm:w-14 rounded-lg flex justify-center items-center text-lg sm:text-2xl">
            <font-awesome-icon :icon="['fas', 'angle-right']" />
          </div>
        </div>
      </div>
    </div>
    <div class="bg-primary w-full h-full flex items-start justify-center py-5">
      <div class="flex gap-1 items-center justify-center w-16 h-6 sm:w-24 sm:h-8 md:w-32 md:h-9 bg-quiz-theme rounded-md sm:rounded-xl select-none">
        <div class="text-white font-medium text-base sm:text-xl md:text-2xl">
          {{ quizCount }}
        </div>
        <div class="text-white text-base sm:text-xl"> / </div>
        <div class="text-white text-xs sm:text-sm md:text-lg">{{ quizNumber }}</div>
      </div>
    </div>
    <div class="bg-progress-bar-light w-full h-full min-h-1 max-h-2">
      <div ref="progressBar" class="text-right h-full bg-progress-bar-dark min-h-1 max-h-2"></div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import WrongModalCard from '../components/QuizWrongModal.vue'
import CorrectModalCard from '../components/QuizCorrectModal.vue'
import ResultModalCard from '../components/QuizResultModal.vue'
import axios from 'axios'

const MAX_TIME = 15000 // 15s
const QUIZ_NUMBER = 10

export default {
  components: {
    WrongModalCard,
    CorrectModalCard,
    ResultModalCard
  },
  setup() {
    const router = useRouter()
    const store = useStore()
    const openModal = ref(false)
    const openResultModal = ref(false)
    const modalComponent = ref(null)
    const progressbarHandler = ref(null)
    const timeBegan = ref(null)
    const quizNumber = ref(QUIZ_NUMBER)
    const quizCount = ref(1)
    const quizzes = ref([])
    const currentQuiz = ref({})
    const answer = ref('')
    const nonsenseCorrect = ref(0)
    const commonCorrect = ref(0)
    const gameId = ref('')
    const rankIn = ref(false)

    const getQuiz = async () => {
      quizCount.value = 1
      nonsenseCorrect.value = 0
      commonCorrect.value = 0
      answer.value = ''
      const response = await axios.get(
        `${store.state.host}/quiz/start/user/${store.state.userId}`
      )
      const obj = response.data.responseQuizList
      gameId.value = response.data.gameId
      quizzes.value = JSON.parse(obj)
      currentQuiz.value = quizzes.value[quizCount.value - 1]
    }

    const saveRank = async () => {
      const rankData = {
        gameId: gameId.value,
        userId: store.state.userId,
        nonsenseCorrect: nonsenseCorrect.value,
        commonsenseCorrect: commonCorrect.value
      }
      const response = await axios.post(
        `${store.state.host}/quiz/rank`,
        rankData
      )
      rankIn.value = response.data.rankIn
    }

    const loadNextQuiz = () => {
      if (quizCount.value < quizNumber.value) {
        quizCount.value++
        currentQuiz.value = quizzes.value[quizCount.value - 1]
        answer.value = ''
      } else {
        saveRank()
        openModal.value = true
        modalComponent.value = 'ResultModalCard'
      }
    }

    const handleOpenModal = async () => {
      if (openResultModal.value) return
      if (!openModal.value) {
        openModal.value = true
        isCorrect()
        progressBarStop()
      } else {
        if (quizCount.value == 10) {
          await saveRank()
          openModal.value = false
          openResultModal.value = true
          progressBarStop()
          return
        }
        loadNextQuiz()
        openModal.value = false
        progressBarStart()
      }
    }

    const isCorrect = () => {
      const strippedAnswer = answer.value.trim().replace(/\n|\r|\s*/g, "").toLowerCase()
      const strippedCorrectAnswer = String(currentQuiz.value.answer).trim().replace(/\n|\r|\s*/g, "").toLowerCase()
      if (strippedAnswer == strippedCorrectAnswer) {
        modalComponent.value = 'CorrectModalCard'
        if (currentQuiz.value.category == "상식") commonCorrect.value++
        else nonsenseCorrect.value++
      } else {
        modalComponent.value = 'WrongModalCard'
      }
    }

    const progressBarStart = () => {
      timeBegan.value = new Date()
      const el = progressBar.value
      el.style.width = "0%"

      if (progressbarHandler.value == null) {
        progressbarHandler.value = setInterval(updateProgressbar, 30)
      }
    }

    const progressBarStop = () => {
      if (progressbarHandler.value != null) {
        clearInterval(progressbarHandler.value)
        progressbarHandler.value = null
      }
    }

    const updateProgressbar = () => {
      const currentTime = new Date(),
        timeElapsed = new Date(
          MAX_TIME - (currentTime - timeBegan.value)
        )
      const time = currentTime - timeBegan.value
      const el = progressBar.value
      let width = (time / MAX_TIME) * 100 + "%"
      width = parseFloat((time / MAX_TIME) * 100 + "%").toFixed(2)
      if (width > 100) width = 100

      let widthStr = width + "%"
      el.style.width = widthStr

      if (time >= MAX_TIME) {
        handleOpenModal()
      }
    }

    const handleRouterMain = () => {
      progressBarStop()
      router.push(`/`)
    }

    const progressBar = ref(null)

    onMounted(() => {
      if (store.state.userId == '') {
        alert("로그인 없이 이용할 수 없습니다")
        router.push(`/`)
        return
      }
      progressBarStart()
      getQuiz()
    })

    return {
      openModal,
      openResultModal,
      modalComponent,
      quizCount,
      nonsenseCorrect,
      commonCorrect,
      rankIn,
      currentQuiz,
      progressBar,
      answer,
      quizNumber,
      getQuiz,
      loadNextQuiz,
      handleOpenModal,
      progressBarStart,
      progressBarStop,
      updateProgressbar,
      handleRouterMain,
    }
  }
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