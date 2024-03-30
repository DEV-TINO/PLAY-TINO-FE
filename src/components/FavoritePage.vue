<template>
	<div class="flex flex-col h-screen w-full bg-priamry">
    <div class="w-full h-24 flex items-center">
      <div class="text-white text-xl pl-6 font-semibold hover:cursor-pointer">PLAY - TINO</div>
    </div>
    <div class="w-full h">
      <div class="w-full h-24 flex justify-center items-center">
        <div class="flex items-baseline">
          <div class="text-4xl md:text-5xl lg:text-7xl text-favorite-title font-extrabold text-outline">고냥이</div>
          <div class="text-xl md:text-2xl lg:text-4xl text-white font-bold">월드컵!</div>
        </div>
      </div>
      <div class="w-full text-white text-xl flex justify-center items-center">16강</div>
    </div>
    <div class="w-full h-full min-w-1 mt-2 flex justify-center">
      <div class="w-1/3 flex flex-col justify-center items-end cursor-pointer">
        <img class="border-8" src="/image/cat1.png" />
        <div class="flex items-center justify-center w-full text-white text-2xl mt-3">고급묘다냥 샴 고양이</div>
      </div>
      <div class="w-1/3 flex flex-col justify-center cursor-pointer">
        <img class="border-8" src="/image/cat2.png" />
        <div class="flex items-center justify-center w-full text-white text-2xl mt-3">왕 크니까 왕 귀엽다 메인쿤</div>
      </div>
      <img class="fixed right-47% top-31.5rem w-24 h-24" src="/image/vs.png" />
    </div>
	</div>
</template>

<script>
export default {
	
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
</style>