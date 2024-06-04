<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "App",

  mounted() {
    if (this.$router.currentRoute.path.inlcude('statistic')) {
      if (this.$store.state.userId === "") {
        alert("Please Login")
        this.$router.push("/")
      }
    }
  }
}
</script>

<style>
body {
  margin: 0;
  padding: 0;
}
</style>
