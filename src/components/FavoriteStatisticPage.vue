<template>
  <div class="flex w-full h-24 bg-white justify-between items-center">
    <div class="w-30 h-20 ml-10"></div>
    <div class="flex justify-center">
      <img src="/image/logo.png" class="w-30 h-20" />
    </div>
    <div class="text-light-purple order-last flex justify-center mr-10 font-medium cursor-pointer">Login</div>
  </div>
  <div class="w-full bg-primary flex flex-col">
    <div class="w-full h-14 min-h-8 flex items-center">
      <div class="text-white text-2xl pl-4">고냥이월드컵</div>
    </div>
    <div class="w-full h-[calc(100svh-9.5rem)] pt-8 pb-8 bg-white">
      <div v-for="rank, i in 3" :key="i"  class="flex justify-center pb-8">
        <div class="w-3/4 flex justify-around items-center">
          <div class="w-16 h-16 flex justify-center items-center p-4 text-light-purple text-4xl font-bold">{{ i + 1 }}</div>
          <img class="w-48 border-8 border-light-purple" src="/image/cat1.png" />
          <div class="text-primary text-3xl">고급묘다냥 샴 고양이</div>
          <div class="w-1/3 bg-gray-200 rounded-lg dark:bg-gray-700">
            <div class="pt-3 pb-3 bg-light-purple text-xl font-medium text-primary text-center p-0.5 leading-none rounded-lg" style="width: 45%">45%</div>
          </div>
        </div>
      </div>
      <div class="flex justify-center w-full">
        <div class="flex items-center justify-between w-1/6 text-2xl">
          <font-awesome-icon class="text-gray-200 cursor-pointer active:text-gray-200 hover:text-primary" :icon="['fas', 'angle-left']" />
          <div class="font-bold text-primary cursor-pointer active:text-primary">1</div>
          <div class="font-bold text-gray-200 cursor-pointer active:text-primary">2</div>
          <div class="font-bold text-gray-200 cursor-pointer active:text-primary">3</div>
          <div class="font-bold text-gray-200 cursor-pointer active:text-primary">4</div>
          <font-awesome-icon class="text-gray-200 cursor-pointer active:text-gray-200 hover:text-primary" :icon="['fas', 'angle-right']" />    
        </div>
      </div>
    </div>
  </div>
  <CommentPage />
</template>

<script>
import CommentPage from './CommentPage.vue';

export default {
  components: {
    CommentPage,
  }
}
</script>

<style>
</style>