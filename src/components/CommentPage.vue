<template>
    <div class="flex flex-col h-screen w-full bg-primary">
      <div class="w-full h-14 min-h-8 flex items-center">
        <div class="text-white text-xl pl-4">Comment</div>
      </div>
      <hr class="w-full h-px bg-white">
      <div class="w-full h-10 min-h-10 flex justify-end items-center gap-3 lg:gap-5 px-4 lg:px-6 pt-0 md:pt-2 lg:pt-4 min-w-36 text-base md:text-lg lg:text-xl">
        <div class="text-white font-semibold">추천순</div>
        <div class="text-quiz-box">최신순</div>
      </div>
      <div class="w-full h-30 flex justify-center items-start bg-primary py-2 md:py-5">
        <div class="w-10/12">
          <div class="bg-white w-full h-auto rounded-xl py-3 px-7 flex justify-center items-center min-w-72">
            <textarea placeholder="댓글을 입력해주세요 (최대 300자)" class="w-full resize-none overflow-hidden text-lg md:text-2xl"></textarea>
            <div class="text-gray-300 text-3xl">
              <font-awesome-icon :icon="['fas', 'circle-chevron-up']" />
            </div>
          </div>
        </div>
      </div>
      <div class="w-full h-full items-start bg-primary flex justify-center">
        <div class="w-10/12">
          <div class="bg-white w-full h-auto rounded-xl py-3 my-3 items-center px-7 min-w-72">
            <div class="px-0.5 flex gap-3 items-end">
              <div class="text-primary font-extrabold text-lg md:text-2xl">asdf00</div>
              <div class="text-quiz-box text-base md:text-lg">2024.03.01 10:28</div>
            </div>
            <div class="text-lg text-primary md:text-2xl pt-0 md:pt-1">일단 지금은 너무 피곤한 것 같아요...</div>
            <div class="flex justify-end items-center gap-1 text-quiz-theme">
              <div class="text-sm md:text-lg">65</div>
              <font-awesome-icon class="text-base md:text-xl" :icon="['fas', 'heart']" />
            </div>
          </div>
          <div class="bg-white w-full h-auto rounded-xl py-3 my-3 items-center px-7 min-w-72">
            <div class="px-0.5 flex gap-3 items-end">
              <div class="text-primary font-extrabold text-lg md:text-2xl">정윤</div>
              <div class="text-quiz-box text-base md:text-lg">2024.03.01 10:28</div>
            </div>
            <div class="text-lg md:text-2xl text-primary pt-0 md:pt-1">댓글을 뭐라고 작성해야 할 지 모르겠네,,, 근데 이런 게임을 하고 나서 적을만한 댓글이 있을까요? 왜 내 최애가 1등이 아닌데!! 같은 느낌인가?</div>
            <div class="flex justify-end items-center gap-1 text-quiz-theme">
              <div class="text-sm md:text-lg">32</div>
              <font-awesome-icon class="text-base md:text-xl" :icon="['far', 'heart']" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
<script>
</script>

<style>
</style>