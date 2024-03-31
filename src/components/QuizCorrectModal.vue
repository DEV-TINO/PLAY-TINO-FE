<template>
  <div class="w-full h-full bg-modal-background fixed flex justify-center items-center">
    <div class="w-auto h-auto bg-white rounded-2xl py-4 md:py-6 lg:py-8 px-24 md:px-28 lg:px-32">
      <div class="flex justify-center gap-1 items-baseline py-1">
        <div class="text-lg md:text-xl lg:text-2xl font-bold text-primary">8</div>
        <div class="text-xs md:text-sm lg:text-base text-correct-modal">/10</div>
      </div>
      <div class="text-[160px] md:text-[180px] lg:text-[200px] flex justify-center text-correct-modal py-10">
        <font-awesome-icon :icon="['far', 'circle']" />
      </div>
      <div class="flex justify-center py-0.5 md:py-1">
        <div class="font-bold text-base md:text-lg lg:text-xl text-primary py-1 md:py-2">정답입니다</div> 
      </div>
      <div class="flex justify-center py-0.5 md:py-1">
        <div class="w-16 md:w-20 h-6 md:h-8 items-center md:rounded-xl rounded-lg bg-correct-modal flex justify-center font-bold text-white" @click="$emit('closeModal', false)">
          <div>확인</div>
        </div>
      </div>
    </div>
  </div>
</template>
  
<script>
  export default {
    name: 'ModalCard',
  }
</script>
  
<style>
</style>