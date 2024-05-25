<template>
    <div class="w-full h-full bg-modal-background fixed flex justify-center items-center">
      <div class="w-auto h-auto bg-white rounded-2xl py-4 md:py-6 lg:py-8 px-16 sm:px-24 md:px-28 xl:px-32 min-w-80">
        <div class="flex justify-center gap-1 items-baseline pt-1 select-none">
          <div class="text-xl md:text-2xl font-bold text-wrong-modal">{{ quizIndex }}</div>
          <div class="text-sm md:text-base text-primary">/ 10</div>
        </div>
        <div class="flex justify-center">
        <img class="py-6 sm:py-8 object-cover w-40 sm:w-52 md:w-56 lg:w-64 select-none" src="/x.png"/>
      </div>
        <div class="flex justify-center pb-0.5 md:pb-1 select-none">
          <div class="font-bold text-lg sm:text-xl md:text-2xl text-primary py-0 sm:py-1 md:pb-2">오답입니다</div> 
        </div>
        <div class="flex justify-center pb-1 sm:pb-2">
          <div class="flex justfy-center gap-2 select-none text-sm sm:text-base">
            <div>정답 :</div>
            <div>{{ this.correctAnswer }}</div>
          </div>
        </div>
        <div class="flex justify-center py-0.5 md:py-1">
          <div class="select-none w-16 md:w-20 h-6 md:h-8 items-center rounded-lg bg-wrong-modal flex justify-center font-bold text-white cursor-pointer" @click="confirm()">
            <div>확인</div>
          </div>
        </div>
      </div>
    </div>
  </template>
    
  <script>
    export default {
      name: 'ModalCard',
      props: {
        correctAnswer: String,
        quizIndex: Number,
      },
      methods: {
        confirm() {
          this.$emit('confirm')
          this.$emit('closeModal', false)
          this.$emit('progressBarStart')
          if (this.quizIndex == 10) {
            this.$emit('openModal', true)
            this.$emit('progressBarStop')
          }
        }
      }
    }
  </script>
    
  <style>
  </style>