<template>
  <router-view :countries="countries"></router-view>
</template>

<script>
import find from 'lodash/find'
export default {
  name: 'Auth',
  computed: {
    countries() {
      const originData = this.$store.state.common.getSystemSettingData || []
      const countries = find(originData, { key: 'RegisterCountryList' })
        ? find(originData, { key: 'RegisterCountryList' }).value
        : []
      return countries
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss"></style>
