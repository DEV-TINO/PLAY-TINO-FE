<template>
	<div class="flex w-full h-24 bg-white justify-between items-center">
		<div class="w-30 h-20"></div>
		<div class="flex justify-center">
			<img src="/image/logo.png" class="w-30 h-20" />
		</div>
		<div class="text-lightPurple order-last flex justify-center mr-10 font-medium cursor-pointer">Login</div>
	</div>
	<div class="w-full bg-priamry text-white p-4 font-medium">Games</div>
	<div class="bg-priamry w-full h-690 pb-8">
		<ul class="flex w-full h-full overflow-hidden">
			<li
				id="game-list"
				v-for="(game, i) in this.$store.state.gameData"
				:style="`background-image: url(${game.image});` "
				role="button"
				:class="active === i ? 'active' : ''"
				@click="() => (active = i)"
			>
				<div :class="active === i ? 'title-default' : 'select-title'">
					<h3 class="text-3xl font-bold">{{ game.name }}</h3>
					<div
						:class="active === i ? '' : 'section-content'"
						@click="() => (active = i)"
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
		<div class="flex text-lightPurple font-semibold text-3xl justify-center pb-8">How can use?</div>
		<div class="w-full text-priamry flex justify-evenly">
			<ul class="w-3/4 pt-8 flex justify-evenly items-start">
				<li
					v-for="(game, i) in this.$store.state.gameData"
					class="w-96 pr-4 pl-4"
				>
					<h2 class="flex justify-center font-bold text-priamry text-xl pb-7">{{ game.name }}</h2>
					<p>{{ game.rule }}</p>
				</li>
			</ul>
		</div>
	</div>
	<div class="bg-priamry h-64 p-10 flex flex-row justify-around items-center">
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
				active: 0
			}
		},
		methods: {
			nextSlide() {
				if (this.active <= this.artists.length) {
					this.active = this.active += 1;
				}
			},
			prevSlide() {
				if (this.active > 0) {
					this.active = this.active + -1;
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
    content: "";
    position: absolute;
    z-index: 20;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(180deg, rgba(15, 15, 15, 0) 0%, #111111 100%);
  }

  &.active {
    flex: 2;
		justify-content: center;
    cursor: default;

    &:before {
      background: linear-gradient(180deg, rgba(15, 15, 15, 0) 0%, #111111 100%);
    }
  }
}
.section-content {
  position: relative;
  z-index: 30;
  opacity: 0;
  align-self: flex-end;
  width: 100%;
  transition: all 0.35s 0.1s ease-out;

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

    @media only screen and (min-width: 768px) {
      grid-auto-flow: column;
      grid-template-columns: calc(100% - 340px) 300px;
      grid-column-gap: 40px;
      padding: 40px;
    }

    @media only screen and (min-width: 1280px) {
      grid-auto-flow: column;
      grid-template-columns: 460px 200px;
      grid-column-gap: 40px;
      padding: 40px;
    }

    .active & {
      opacity: 1;
    }
  }
}
</style>  