<template>
	<div class="flex flex-col h-screen w-full bg-priamry">
    <div class="w-full h-24 flex items-center">
      <div class="text-white text-xl pl-4 font-semibold hover:cursor-pointer">PLAY - TINO</div>
    </div>
    <div class="w-full h-36 flex flex-col justify-center items-center">
      <div class="flex items-baseline">
        <div class="text-4xl md:text-5xl lg:text-7xl text-favorite-title font-extrabold text-outline">고냥이</div>
        <div class="text-xl md:text-2xl lg:text-4xl text-white font-bold ml-2">월드컵!</div>
      </div>
			<div class="text-white mt-4 text-2xl font-bold">16강</div>
    </div>
		<div class="flex flex-row justify-center">
      <img class="w-2/5 border-4" src="/image/cat1.png" />
      <!-- <img class="w-10 h-10 " src="/image/vs.png" /> -->
      <img class="w-2/5 border-4" src="/image/cat2.png" />
    </div>
    <div class="flex justify-center">
      <div class="w-2/5 justify-center text-white text-2xl">고급묘다냥 샴 고양이</div>
      <div class="w-2/5 justify-center text-white text-2xl">왕 크니까 왕 귀엽다 메인쿤</div>
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
</style>