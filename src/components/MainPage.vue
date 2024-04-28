<template>
  <div class="flex w-full h-24 bg-white justify-between items-center">
    <div class="w-30 h-20 ml-10"></div>
    <div class="flex justify-center">
      <img src="/image/logo.png" class="w-30 h-20" />
    </div>
    <div class="text-light-purple order-last flex justify-center mr-10 font-medium cursor-pointer">Login</div>
  </div>
  <div class="w-full bg-primary text-white p-4 font-medium">Games</div>
  <div class="bg-primary w-full h-[calc(100svh-9rem)]">
    <ul class="flex w-full h-full overflow-hidden">
      <li
        id="game-list"
        v-for="(game, i) in this.$store.state.MainGameData"
        :style="`background-image: url(${game.image});` "
        role="button"
        :class="this.$store.state.MainActive === i ? 'active' : ''"
        @mouseover="this.$store.commit('handleMainActive', i)"
        @click="this.$store.state.MainActive === i ? handleRouterLink(i) : this.$store.commit('handleMainActive', i)"
      >
        <div :class="this.$store.state.MainActive === i ? 'title-default' : 'select-title'">
          <h3 class="text-3xl font-bold">{{ game.name }}</h3>
          <div
            :class="this.$store.state.MainActive === i ? '' : 'section-content'"
            @click="this.$store.commit('handleMainActive', i)"
            >
            <p>
              {{ game.subtitle }}
            </p>
          </div>
        </div>
      </li>
    </ul>
  </div>
  <div class="pb-20 pt-20">
    <div class="flex text-light-purple font-semibold text-4xl justify-center pb-8">How can use?</div>
    <div class="w-full text-primary flex justify-evenly">
      <ul class="w-5/6 pt-8 flex justify-evenly items-start">
        <li
          v-for="(game, i) in this.$store.state.MainGameData"
          class="w-96 pr-4 pl-4"
        >
          <h2 class="flex justify-center font-bold text-primary text-2xl pb-7">{{ game.name }}</h2>
          <p class="text-xl">{{ game.rule }}</p>
        </li>
      </ul>
    </div>
  </div>
  <div class="bg-primary h-64 p-10 flex flex-row justify-around items-center">
    <div v-for="(menu, i) in this.$store.state.footerMenu" class="w-48">
      <div class="text-white text-xl font-medium mb-3">{{ menu }}</div>
      <div class="text-white font-medium">{{ menu }}</div>
    </div>
  </div>
</template>
  
<script>
  export default {
    data() {
      return {
      }
    },
    methods: {
      handleRouterLink(i) {
        if(i === 0) {
          this.$router.push(`/favorite`)
        } else if(i === 1) {
          this.$router.push(`/timer`)
        } else if(i === 2) {
          this.$router.push(`/quiz`)
        }
      }
    }
  }
</script>
  
<style>
@font-face {
  font-family: 'S-CoreDream-3Light';
  src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_six@1.2/S-CoreDream-3Light.woff') format('woff');
  font-weight: normal;
  font-style: normal;
}
.title-default {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: end;
  align-content: start;
  z-index: 20;
  padding: 4rem;
}
.select-title {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: end;
  align-items: center;
  z-index: 20;
  padding: 4rem;
}
#game-list {
  flex: 1;
  display: flex;
  align-items: stretch;
  cursor: pointer;
  transition: all 0.35s ease;
  cursor: pointer;
  position: relative;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: top center;
  overflow: hidden;
  color: white;

  &:before {
    position: absolute;
    z-index: 20;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  &.active {
    flex: 2;
    justify-content: center;
    cursor: pointer;
  }
}
.section-content {
  position: relative;
  z-index: 30;
  opacity: 0;
  align-self: flex-end;
  width: 100%;

  .active & {
    opacity: 1;
  }

  .inner {
    display: flex;
    align-items: flex-end;
    left: 0;
    bottom: 0;
    padding: 20px;
    opacity: 0;
    transition: opacity 0.25s ease-out;

    .active & {
      opacity: 1;
    }
  }
}
</style>  