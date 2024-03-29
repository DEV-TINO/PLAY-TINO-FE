<template>
	<div class="flex w-full h-24 bg-white justify-between items-center">
		<div class="w-30 h-20"></div>
		<div class="flex justify-center">
			<img src="/image/logo.png" class="w-30 h-20" />
		</div>
		<div class="text-lightPurple order-last flex justify-center mr-10 font-medium">Login</div>
	</div>
	<div class="bg-priamry h-96">
		<div class="w-full text-white p-4 font-medium">Games</div>
		<!-- <ul>
			<li 
				v-for="(game, i) in this.$store.state.gameData"
				:style="`background-image: url(${game.image});`"
				role="button"
				:class="active == i ? 'active' : ''"
				@click="() => (active = i)"
			>
				<h3>{{ game.name }}</h3>
				<p>{{ game.subtitle }}</p>
			</li>
		</ul> -->
	</div>
	<div class="pb-20 pt-20">
		<div class="flex text-lightPurple font-semibold text-3xl justify-center pb-8">How can use?</div>
		<div class="w-full text-priamry flex justify-center">
			<ul class="pt-8 flex justify-center items-start">
				<li
					v-for="(game, i) in this.$store.state.gameData"
					class="w-96 pr-12 pl-12"
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
				
			}
		},
		method: {
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
</style>  