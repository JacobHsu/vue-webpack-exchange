<template>
  <div id="app">
    <section class="h-100">
      <keep-alive>
        <router-view />
      </keep-alive>
      <tab-bar></tab-bar>
    </section>
  </div>
</template>

<script>
import TabBar from '@/views/components/TabBar'
export default {
  name: 'App',
  components: { TabBar },
  mounted() {
    this.$store.dispatch('getSystemSetting')
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
