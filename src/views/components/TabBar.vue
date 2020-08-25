<template>
  <div>
    <b-container fluid class="tabBar fixed-bottom" v-if="isEntry">
      <b-row class="d-flex">
        <b-col
          class="tabBar__items text-center btn"
          v-for="(tab, id) in tabs"
          :key="id"
          @click="handleClick(id)"
        >
          <div class="py-1">
            <i
              v-if="tab.loading"
              class="fas fa-spinner fa-pulse fa-2x text-theme"
            ></i>
            <i
              v-else
              :class="[
                tab.icon[Number(tab.active)],
                tab.active ? 'text-theme' : 'text-black-50'
              ]"
            ></i>
          </div>
          <div>
            <span
              v-text="tab.text"
              :class="tab.active ? 'text-theme' : 'text-black-50'"
            >
            </span>
          </div>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
export default {
  name: 'TabBar',
  created() {
    this.init()
  },
  data() {
    return {
      entries: ['Markets', 'Trade', 'Fund', 'Member'],
      icons: [
        ['icomoon-markets', 'icomoon-markets-active'],
        ['icomoon-trade', 'icomoon-trade-active'],
        ['icomoon-fund', 'icomoon-fund-active'],
        ['icomoon-account', 'icomoon-account-active']
      ],
      isEntry: false,
      tabs: []
    }
  },
  computed: {
    texts() {
      return [
        this.$t('tab_markets'),
        this.$t('tab_trade'),
        this.$t('tab_funds'),
        this.$t('tab_member')
      ]
    }
  },
  methods: {
    init() {
      this.isEntry = true
      this.tabs = this.entries.map((entry, id) => {
        return {
          icon: this.icons[id],
          text: this.texts[id],
          active: this.$route.name === this.entries[id],
          path: this.entries[id],
          loading: false
        }
      })
    },
    handleClick(idx) {
      const entryIndex = this.entries.indexOf(this.$route.name)
      console.log(this.$route.name, entryIndex, idx, this.tabs)
      if (entryIndex !== idx) {
        this.tabs.map(_ => (_.active = false))
        this.tabs[idx].loading = true
        window.setTimeout(() => {
          this.$router.push({
            name: this.tabs[idx].path
          })
        }, 50)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'src/theme/main.scss';
.tabBar {
  background-color: $primary-text-color;
  height: 3.5rem;
  box-shadow: 0 0 0.4em grey;
  &__items {
    font-size: $font-size05;
  }
}
</style>
