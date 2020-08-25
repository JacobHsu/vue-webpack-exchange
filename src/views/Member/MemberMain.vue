<template>
  <b-container fluid :class="[$style.member]">
    <b-row
      :class="[
        $style.member__header,
        'd-flex flex-column justify-content-center'
      ]"
    >
      <b-container>
        <b-row>
          <b-col>
            <div :style="{ backgroundImage: account.imageUrl }"></div>
            <i class="fas fa-user-circle fa-2x"></i>
          </b-col>
        </b-row>
        <b-row>
          <b-col>
            <h3 :class="[$style.member__header__name, 'text-center']">
              <span v-text="account.username"></span>
            </h3>
          </b-col>
        </b-row>
        <b-row>
          <b-col class="d-flex justify-content-center align-items-center align-self-center">
            <!-- <router-link
              to="class"
              :class="['btn btn-sm', $style.member__header__level, {[$style['member__header__level--star']]:(account.rankID === 1)}, {[$style['member__header__level--star2']]:(account.rankID === 2)}, {[$style['member__header__level--star3']]:(account.rankID === 3)}]"
            > -->
              <i :class="[$style.member__header__level__icon, account.iconClass, 'mr-1']"></i>              <span
                class="mx-1"
                v-text="$t('me_b_memberLevel', { msg: $t(account.level) })"
              ></span>
            <!-- </router-link> -->
          </b-col>
        </b-row>
      </b-container>
    </b-row>
  </b-container>
</template>

<script>
export default {
  name: 'MemberMain',
  props: {
    account: {
      type: Object
    }
  },
  data() {
    return {
      isShow: true,
      pages: [
        {
          name: 'me_l_user',
          icon: 'icomoon-user',
          link: 'account',
          active: true,
          disabled: false,
          children: true
        },
        {
          name: 'me_l_bank',
          icon: 'icomoon-bank',
          link: 'bank',
          active: false,
          disabled: false,
          children: true
        },
        {
          name: null,
          icon: 'icomoon-medal',
          link: 'invite',
          active: false,
          disabled: false,
          children: true
        },
        {
          name: 'me_l_setting',
          icon: 'icomoon-cog',
          link: 'setting',
          active: true,
          disabled: false,
          children: true
        },
        {
          name: 'me_l_contactUs',
          icon: 'icomoon-comments',
          link: 'contact',
          active: true,
          disabled: false,
          children: false
        }
      ]
    }
  },
  mounted() {
    console.log('MemberMain', location.hostname)
  },
  methods: {},
  computed: {}
}
</script>

<style lang="scss" module>
@import 'src/theme/main.scss';
@import 'src/theme/app.scss';
@import 'src/theme/color.scss';
.member {
  padding-bottom: 3.5rem; // for TabBar
  &__header {
    flex: 1 0 auto !important;
    height: 181px;
    background-image: url($account_bg);
    background-size: cover;
    background-position: left bottom;
    &__name {
      color: $primary-text-color;
    }
    &__level {
      @include grid-flex;
      min-width: 150px;
      color: $primary-text-color;
      border: 1px solid $primary-text-color;
      border-radius: 1rem;
      &--star {
        background-color: $mbrStar1BGColor;
      }
      &--star2 {
        background-color: $mbrStar2BGColor;
      }
      &--star3 {
        background-color: $mbrStar3BGColor;
      }
      &__icon {
        font-size: 1rem;
      }
    }
  }
  &__list {
    &__item {
      padding: 0.5rem;
      line-height: 2rem;
      &__icon {
        width: 3rem;
        color: $primary-title-color;
      }
      &__detail {
        flex: 1;
        border-bottom: 1px solid $normal-placeholder-color;
        // color: $primary-title-color;
        color: #000000;
        i {
          // color: $primary-title-color;
          color: #000000;
          margin: 0 0 0 1rem;
        }
        &__text {
          color: $primary-token-color;
          font-weight: 500;
          &--verified {
            color: $upColor;
          }
          &--unverified {
            color: #ff6666;
          }
        }
      }
    }
  }
}
</style>
