<template>
  <div class="w-full h-full bg-modal-background fixed flex justify-center items-center">
    <div class="w-auto h-auto bg-white rounded-2xl py-4 md:py-6 lg:py-8 px-24 md:px-28 lg:px-32 min-w-96">
      <div class="flex justify-center gap-1 items-baseline pt-1 select-none">
        <div class="text-xl md:text-2xl font-bold text-correct-modal">{{ quizIndex }}</div>
        <div class="text-sm md:text-base text-primary">/ 10</div>
      </div>
      <div class="flex justify-center select-none">
      <img class="py-8 object-cover w-52 md:w-56 lg:w-64" src="/o.png"/>
    </div>
      <div class="flex justify-center pb-0.5 md:pb-1 select-none">
        <div class="font-bold text-xl md:text-2xl text-primary py-1 md:pb-2">정답입니다</div> 
      </div>
      <div class="flex justify-center py-0.5 md:py-1">
        <div class="w-16 md:w-20 h-6 md:h-8 items-center select-none rounded-lg bg-correct-modal flex justify-center font-bold text-white cursor-pointer" @click="confirm()">
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
      },
    }
  }
</script>
  
<style>
</style>