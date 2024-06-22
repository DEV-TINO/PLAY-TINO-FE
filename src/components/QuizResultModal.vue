<template>
  <div class="w-full h-full bg-modal-background bg-opacity-50 fixed flex justify-center items-center">
    <div class="bg-white rounded-3xl">
      <div class="flex flex-col items-center py-4 sm:py-8 md:py-10 px-12 sm:px-20 md:px-24 sm:m-2 sm:border-3 md:border-4 border-quiz-theme rounded-3xl select-none">
        <div class="text-lg sm:text-xl md:text-2xl font-extrabold text-primary py-1 sm:py-2 md:py-3">퀴즈를 맞춰라</div>
        <div v-if="rankIn" class="flex items-center flex-col">
          <div class="text-2xl sm:text-3xl md:text-4xl font-bold text-quiz-theme pt-1 sm:pt-2">축하드려요!</div>
          <div class="text-2xl sm:text-3xl md:text-4xl font-bold text-quiz-theme pb-1 sm:pb-2">랭킹에 오르셨어요</div>
        </div>
        <div v-else class="flex items-center flex-col">
          <div class="text-2xl sm:text-3xl md:text-4xl font-bold text-quiz-theme pt-1 sm:pt-2">랭킹을 위해</div>
          <div class="text-2xl sm:text-3xl md:text-4xl font-bold text-quiz-theme pb-1 sm:pb-2">한번 더 도전해볼까요?</div>
        </div>
        <div class="flex py-4">
          <hr class="w-8 h-0.5 sm:h-1 bg-quiz-theme">
        </div>
        <div class="flex flex-col items-center mb-5">
          <div class="flex gap-4 items-center sm:py-1 md:py-2 select-none">
            <div class="text-lg sm:text-xl md:text-2xl font-semibold text-primary">상식</div>
            <div class="text-quiz-theme text-lg sm:text-xl md:text-2xl font-semibold">{{ this.commonCorrect }} 문제</div>
          </div>
          <div class="flex gap-4 pb-1 sm:pb-2 md:pb-3 items-center select-none">
            <div class="text-lg sm:text-xl md:text-2xl font-semibold text-primary">넌센스</div>
            <div class="text-quiz-theme text-lg sm:text-xl md:text-2xl font-semibold">{{ this.nonsenseCorrect }} 문제</div>
          </div>
        </div>
        <div class="flex flex-col sm:flex-row items-center gap-2 md:gap-4 select-none w-full pb-2 sm:pb-0">
          <div @click="handleRouterRank" class="w-full sm:w-auto bg-quiz-theme text-white border-quiz-theme border-2 py-0.5 sm:px-5 sm:py-1 rounded-lg flex justify-center font-bold text-base sm:text-xl cursor-pointer">확인</div>
          <div @click="reload" class="w-full sm:w-auto bg-white border-quiz-theme border-2 sm:px-4 py-0.5 sm:py-1 rounded-lg text-quiz-theme font-bold text-base sm:text-xl flex justify-center cursor-pointer">다시하기</div>
          <div @click="handleRouterMain" class="w-full sm:w-auto bg-white border-quiz-theme border-2 py-0.5 sm:px-4 sm:py-1 rounded-lg text-quiz-theme font-bold text-base sm:text-xl flex justify-center cursor-pointer">메인으로</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useRouter } from 'vue-router'
export default {
  props: {
    commonCorrect: Number,
    nonsenseCorrect: Number,
    rankIn: Boolean,
  },
  setup({ emit }) {
    const router = useRouter()

    const handleRouterMain = () => {
      router.push(`/`)
    }

    const handleRouterRank = () => {
      router.push('/quiz-statistic')
    }

    const reload = () => {
      emit('restart')
      emit('closeResultModal', false)
      emit('progressBarStart')
    }
    return {
      handleRouterMain,
      handleRouterRank,
      reload,
    }
  }
}
</script>

<style>
</style>