<template>
  <router-view :account.sync="account"> </router-view>
</template>

<script>
export default {
  name: 'Member',
  props: {
    reload: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return { account: null }
  },
  computed: {},
  created() {
    this.init()
  },
  mounted() {},
  watch: {},
  methods: {
    init() {
      //   this.$router.replace({
      //     name: 'Auth'
      //   })
      const rankID = 1
      this.assignMemberLevel(rankID)
    },
    assignMemberLevel(rankID) {
      const [level, iconClass] =
        rankID === 1
          ? ['me_memberLevel_star', 'icomoon-star']
          : [`me_memberLevel_star${rankID}`, `icomoon-star${rankID}`]
      this.account = {
        username: 'jacobhsu',
        level: level,
        iconClass: iconClass
      }
    }
  },
  components: {}
}
</script>

<style scoped lang="scss"></style>
