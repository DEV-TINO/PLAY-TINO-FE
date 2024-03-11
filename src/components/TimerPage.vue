<template>
  <div class="flex flex-col h-screen w-full bg-primary">
    <div class="w-full h-24 min-h-20 flex items-center bg-primary">
      <div class="text-white text-xl pl-4 font-semibold hover:cursor-pointer">PLAY - TINO</div>
    </div>
    <div class="w-full min-h-40 flex justify-center items-center bg-primary">
      <div class="flex items-baseline gap-2">
        <div class="text-4xl md:text-5xl lg:text-7xl text-timer-stop font-extrabold text-outline">정각을</div>
        <div class="text-xl md:text-2xl lg:text-4xl text-white font-bold">맞춰라!</div>
      </div>
    </div>
    <div class="w-full h-full flex items-start justify-center bg-primary">
      <div class="bg-white min-h-60 min-w-96 max-w-6xl py-5 md:py-6 lg:py-7 h-auto w-7/12 rounded-2xl flex flex-col justify-center items-center gap-3 sm:gap-4 md:gap-5">
        <div class="text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-timer-stop font-['DS-Digital']">06.00</div>
        <div class="w-8/12 h-auto py-4 sm:py-5 md:py-6 lg:py-7 bg-timer-bg rounded-2xl border-primary border-4 md:border-[5px] flex items-center justify-center">
          <div class="text-7xl sm:text-8xl md:text-9xl text-timer-number font-['DS-Digital']">88.88</div>
          <div class="text-7xl sm:text-8xl md:text-9xl text-primary -ml-[159.5px] sm:-ml-[212.8px] md:-ml-[283.5px] font-['DS-Digital']">02.37</div>
        </div>
        <div class="flex justify-center gap-4">
          <div class="w-20 md:w-24 h-10 md:h-12 hover:bg-timer-start hover:text-white text-timer-start border-timer-start border-2 flex items-center justify-center rounded-md mx-4">
            <div class="text-l md:text-2xl font-semibold hover:cursor-pointer">START</div>
          </div>
          <div class="w-20 md:w-24 h-10 md:h-12 bg-timer-stop text-white flex items-center justify-center rounded-md mx-4">
            <div class="text-l md:text-2xl font-semibold hover:cursor-pointer">STOP</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() { 
      return {
      }
    }
  }
</script>

<style scoped>
@font-face {
    font-family: 'DS-Digital';
    src: url(../../ds-digib.woff) format('woff');
}
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