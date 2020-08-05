<template>
  <router-view></router-view>
</template>

<script>
import { getLoginInfo } from '@/libs/ls'
export default {
  name: 'Wallet',
  created() {
    if (!getLoginInfo().accessToken) {
      this.$router.replace({
        name: 'Auth'
      })
    }
  }
}
</script>

<style lang="scss">
p,
span,
strong,
small {
  user-select: none;
}
</style>

<style lang="scss" module>
.wallet {
  padding-top: 3rem;
}
</style>
