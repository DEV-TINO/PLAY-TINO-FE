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
  <footer class="bg-primary pt-4">
    <div class="w-full p-4 py-6 lg:py-8">
        <div class="md:flex md:justify-between px-0 md:px-6 lg:px-12">
          <div class="mb-6 md:mb-0">
              <a href="https://github.com/dev-tino/" class="flex items-center">
                  <img src="/image/logo.png" class="h-8 me-3" alt="Dev-Tino Logo" />
                  <span class="self-center text-2xl font-semibold whitespace-nowrap text-white">Play-Tino</span>
              </a>
          </div>
          <div class="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
              <div>
                  <h2 class="mb-6 text-sm font-semibold text-white uppercase">Resources</h2>
                  <ul class="text-gray-500 font-medium">
                      <li class="mb-4">
                          <a href="https://vuejs.org/" class="hover:underline hover:text-white">Vue.js</a>
                      </li>
                      <li>
                          <a href="https://spring.io/" class="hover:underline hover:text-white">Spring Boot</a>
                      </li>
                  </ul>
              </div>
              <div>
                  <h2 class="mb-6 text-sm font-semibold text-white uppercase">Follow us</h2>
                  <ul class="text-gray-500 font-medium">
                      <li class="mb-4">
                          <a href="https://github.com/dev-tino" class="hover:underline hover:text-white">Github</a>
                      </li>
                      <li @click="copyToClipboard">
                          <a href="mailto:kinsongjun13@gmail.com" class="hover:underline hover:text-white">Email</a>
                      </li>
                  </ul>
              </div>
              <div>
                  <h2 class="mb-6 text-sm font-semibold text-white uppercase">Legal</h2>
                  <ul class="text-gray-500 font-medium">
                      <li class="mb-4">
                          <a href="#" class="hover:underline">Privacy Policy</a>
                      </li>
                      <li>
                          <a href="#" class="hover:underline">Terms &amp; Conditions</a>
                      </li>
                  </ul>
              </div>
          </div>
      </div>
      <hr class="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
      <div class="sm:flex sm:items-center sm:justify-between">
          <span class="text-sm text-white sm:text-center">© 2024 <a href="https://github.com/dev-tino/" class="hover:underline">Dev-Tino Team</a>. All Rights Reserved.
          </span>
          <div class="flex mt-4 sm:justify-center sm:mt-0">
              <a href="https://github.com/dev-tino/" class="text-gray-500 hover:text-white dark:hover:text-white ms-5">
                  <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M10 .333A9.911 9.911 0 0 0 6.866 19.65c.5.092.678-.215.678-.477 0-.237-.01-1.017-.014-1.845-2.757.6-3.338-1.169-3.338-1.169a2.627 2.627 0 0 0-1.1-1.451c-.9-.615.07-.6.07-.6a2.084 2.084 0 0 1 1.518 1.021 2.11 2.11 0 0 0 2.884.823c.044-.503.268-.973.63-1.325-2.2-.25-4.516-1.1-4.516-4.9A3.832 3.832 0 0 1 4.7 7.068a3.56 3.56 0 0 1 .095-2.623s.832-.266 2.726 1.016a9.409 9.409 0 0 1 4.962 0c1.89-1.282 2.717-1.016 2.717-1.016.366.83.402 1.768.1 2.623a3.827 3.827 0 0 1 1.02 2.659c0 3.807-2.319 4.644-4.525 4.889a2.366 2.366 0 0 1 .673 1.834c0 1.326-.012 2.394-.012 2.72 0 .263.18.572.681.475A9.911 9.911 0 0 0 10 .333Z" clip-rule="evenodd"/>
                  </svg>
                  <span class="sr-only">GitHub account</span>
              </a>
              <a href="#" class="text-gray-500 hover:text-white dark:hover:text-white ms-5">
                  <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 0a10 10 0 1 0 10 10A10.009 10.009 0 0 0 10 0Zm6.613 4.614a8.523 8.523 0 0 1 1.93 5.32 20.094 20.094 0 0 0-5.949-.274c-.059-.149-.122-.292-.184-.441a23.879 23.879 0 0 0-.566-1.239 11.41 11.41 0 0 0 4.769-3.366ZM8 1.707a8.821 8.821 0 0 1 2-.238 8.5 8.5 0 0 1 5.664 2.152 9.608 9.608 0 0 1-4.476 3.087A45.758 45.758 0 0 0 8 1.707ZM1.642 8.262a8.57 8.57 0 0 1 4.73-5.981A53.998 53.998 0 0 1 9.54 7.222a32.078 32.078 0 0 1-7.9 1.04h.002Zm2.01 7.46a8.51 8.51 0 0 1-2.2-5.707v-.262a31.64 31.64 0 0 0 8.777-1.219c.243.477.477.964.692 1.449-.114.032-.227.067-.336.1a13.569 13.569 0 0 0-6.942 5.636l.009.003ZM10 18.556a8.508 8.508 0 0 1-5.243-1.8 11.717 11.717 0 0 1 6.7-5.332.509.509 0 0 1 .055-.02 35.65 35.65 0 0 1 1.819 6.476 8.476 8.476 0 0 1-3.331.676Zm4.772-1.462A37.232 37.232 0 0 0 13.113 11a12.513 12.513 0 0 1 5.321.364 8.56 8.56 0 0 1-3.66 5.73h-.002Z" clip-rule="evenodd"/>
                </svg>
                  <span class="sr-only">Dribbble account</span>
              </a>
          </div>
      </div>
    </div>
</footer>
</template>

<script>
import { initFlowbite } from 'flowbite'
const CONTACT_TEXT = ""
const TEAM_TEXT = ""
const SOCIAL_TEXT = ""

export default {
  data() {
    return {
      isMobile: window.innerWidth <= 768
    }
  },
  methods: {
    copyToClipboard() {
      const textToCopy = "kinsongjun13@gmail.com";
      navigator.clipboard.writeText(textToCopy).then(() => {
        alert("이메일이 클립보드에 복사되었습니다.");
      }).catch(err => {
        console.error("클립보드에 복사하는 중 오류가 발생했습니다: ", err);
      });
    },

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
          "https://accounts.google.com/o/oauth2/auth?client_id=461061717960-3qjph66sbpc88fte75el297ca14ht30t.apps.googleusercontent.com&redirect_uri=https://api.play-tino.com/login/oauth2/code/google&response_type=code&scope=https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile"
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
    initFlowbite();
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