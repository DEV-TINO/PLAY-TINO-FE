<template>
  <div class="flex w-full h-16 sm:h-24 bg-white justify-between items-center pr-0 md:pr-4">
    <div class="w-30 h-10 ml-20"></div>
    <div class="flex justify-center select-none">
      <img src="/image/logo.png" class="w-30 h-14 min-h-14 min-w-16 sm:h-20 cursor-pointer" />
    </div>
    <div
      class="w-20 text-xs sm:text-md md:text-md lg:text-sm xl:text-lg text-light-purple order-last flex justify-center font-medium cursor-pointer select-none"
      @click="handleClickLogin()"
    >
      {{ this.$store.state.userId !== "" ? "Logout" : "Login" }}
    </div>
  </div>
  <div class="w-full bg-primary text-white p-3 text-sm md:p-4 md:text-xl font-medium select-none">
    Games
  </div>
  <div class="bg-primary w-full h-[calc(100svh-9rem)] select-none">
    <ul class="flex flex-col w-full h-full overflow-hidden sm:flex-col md:flex-col lg:flex-col xl:flex-row">
      <li
        id="game-list"
        v-for="(game, i) in this.$store.state.MainGameData"
        :key="i"
        :style="`background-image: url(${game.image});`"
        role="button"
        :class="isMobile ? beforeDestroy() : $store.state.MainActive === i ? 'active' : ''"
        @mouseover="!isMobile && $store.commit('handleMainActive', i)"
        @click="
          this.$store.state.MainActive === i
            ? handleRouterLink(i)
            : this.$store.commit('handleMainActive', i)
        "
      >
        <div
          :class="
            $store.state.MainActive === i
              ? 'title-default'
              : 'select-title'
          "
          class="flex flex-col justify-end p-10 min-w-72 h-full bg-opacity-50"
        >
          <h3 class="text-xl md:text-3xl font-bold">{{ game.name }}</h3>
          <div
            :class="[$store.state.MainActive === i ? '' : 'section-content', isMobile ? 'show-subtitle' : '']"
            @click="$store.commit('handleMainActive', i)"
            class="min-w-56"
          >
            <p class="text-sm md:text-md">
              {{ game.subtitle }}
            </p>
          </div>
        </div>
      </li>
    </ul>
  </div>
  <div class="pt-20 select-none md:pb-20">
    <div
      class="flex text-light-purple font-semibold text-3xl sm:text-3xl md:text-3xl lg:text-4xl xl:text-4xl justify-center pb-8"
    >
      How can use?
    </div>
    <div class="w-full text-primary flex justify-evenly">
      <ul class="pr-4 pl-4 w-96 w-min-96 sm:w-96 md:w-5/6 md:pt-8 flex flex-col justify-evenly items-center sm:items-center sm:flex-col md:items-center md:flex-row lg:items-start lg:flex-row">
        <li
          v-for="(game, i) in $store.state.MainGameData"
          :key="i"
          class="flex flex-col align-center justify-center md:w-96 pr-4 pl-4"
        >
          <h2 class="flex justify-center font-bold text-primary text-2xl pb-7">
            {{ game.name }} 
          </h2>
          <p class="text-md w-72 h-auto pb-8 md:text-xl md:h-72 md:w-full lg:h-48">{{ game.rule }}</p>
          <div class="flex justify-center pb-16 md:pb-0">
            <div @click="handlerouterLinkStatistic(i)" class="w-32 h-10 flex justify-center items-center rounded-full bg-light-purple text-white text-lg hover:cursor-pointer hover:brightness-125">
              Statistic
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
  <div
    class="bg-primary h-full p-10 pb-0 flex flex-col justify-around items-center select-none md:flex-row md:h-48"
  >
    <div
      v-for="(menu, i) in $store.state.footerMenu"
      :key="i"
      class="w-48 pb-10 flex flex-col justify-start"
    >
      <div class="text-white text-xl font-medium mb-3">{{ menu }}</div>
      <div class="text-white font-medium">{{ menu }}</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isMobile: window.innerWidth <= 768
    }
  },
  methods: {
    handleRouterLink(i) {
     if (this.$store.state.userId !== "") {
        if (i === 0) {
          this.$router.push(`/favorite`)
        } else if (i === 1) {
          this.$router.push(`/timer`)
        } else if (i === 2) {
          this.$router.push(`/quiz`)
        }
      } else {
        alert("Please Login")
      }
    },
    handlerouterLinkStatistic(i) {
      if(this.$store.state.userId !== "") {
        if(i === 0) {
          this.$router.push(`/favorite-statistic`)
        } else if (i === 1) {
          this.$router.push(`/timer-statistic`)
        } else if (i === 2) {
          this.$router.push(`/quiz-statistic`)
        }
      } else {
        alert("Please Login")
      }
    },
    handleClickLogin() {
      if (this.$store.state.userId !== "") {
        this.$store.commit("logout")
        this.$router.push("/")
        alert("User Logout")
      } else {
        window.location.href =
          "https://accounts.google.com/o/oauth2/auth?client_id=461061717960-3qjph66sbpc88fte75el297ca14ht30t.apps.googleusercontent.com&redirect_uri=https://api.favorite.play-tino.com/login/oauth2/code/google&response_type=code&scope=https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile"
      }
    },
    handleResize() {
      this.isMobile = window.innerWidth <= 768
    },
    beforeDestroy() {
      window.removeEventListener('resize', this.handleResize)
    }
  },
  mounted() {
    const user = this.$route.query.userId
    if (!user) return
    if (!this.$store.state.userId !== "" && user == "") {
      console.warn("No Login User")
    } else {
      console.log("Login User")
      this.$store.commit("setUserId", user)
      this.$router.push("/")
    }
    window.addEventListener('resize', this.handleResize)
  },
  watch: {
    isMobile() {
      if(window.innerWidth <= 768) {
        return this.isMobile;
      } else {
        return !this.isMobile;
      }
    }
  }
}
</script>

<style>
@font-face {
  font-family: "S-CoreDream-3Light";
  src: url("https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_six@1.2/S-CoreDream-3Light.woff")
    format("woff");
  font-weight: normal;
  font-style: normal;
}
.title-default,
.select-title {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-content: flex-start;
  z-index: 20;
}
#game-list {
  flex: 1;
  display: flex;
  align-items: stretch;
  cursor: pointer;
  transition: all 0.35s ease;
  position: relative;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: top center;
  overflow: hidden;
  color: white;
}
#game-list:before {
  content: "";
  position: absolute;
  z-index: 20;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
#game-list.active {
  flex: 2;
  justify-content: center;
}
.section-content {
  position: relative;
  z-index: 30;
  opacity: 0;
  align-self: flex-end;
  width: 100%;
}
#game-list.active .section-content {
  opacity: 1;
}
.section-content .inner {
  display: flex;
  align-items: flex-end;
  left: 0;
  bottom: 0;
  padding: 20px;
  opacity: 0;
  transition: opacity 0.25s ease-out;
}
#game-list.active .section-content .inner {
  opacity: 1;
}
.show-subtitle {
  opacity: 1 !important;
}
@media (max-width: 768px) {
  #game-list {
    height: 200px;
    flex-direction: column;
  }
}
</style>