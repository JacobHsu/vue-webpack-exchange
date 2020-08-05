<template>
  <b-container fluid :class="[$style.login, 'w-100 h-100']" ref="user">
    AuthLogin
  </b-container>
</template>

<script>
export default {
  name: 'AuthLogin',
  props: {
    countries: {
      type: Array
    },
    sessionTimeout: {
      type: Boolean,
      default: false
    }
  },
  created() {},
  data() {
    return {
      form: {
        loading: false,
        country: null,
        password: null,
        phone_number: null,
        show_password: false
      },
      showRegionModal: false
    }
  },
  methods: {},
  computed: {}
}
</script>

<style lang="scss" module>
@import 'src/theme/main.scss';
@import 'src/theme/app.scss';
@import 'src/theme/color.scss';
.login {
  background-size: cover;
  background-repeat: no-repeat;
  background-image: url($login_bg);
  overflow-y: auto;
  &__header {
    height: 4rem;
    &__close {
      font-size: $font-size15;
      color: $primary-text-color !important;
    }
  }
  &__page {
    &__logo {
      @include logoSize;
      background-image: url($logo);
      background-repeat: no-repeat;
      margin: 0 auto;
    }
    &__title {
      text-align: center;
      font-weight: 300;
      color: $primary-text-color;
      letter-spacing: 1px;
      font-size: $font-size18;
    }
  }
  &__form {
    &__background-0 {
      background: transparent;
    }
    &__input {
      &__group {
        border-bottom: 1px solid $primary-text-color;
        label,
        button {
          border: 0;
          background: 0;
          color: $normal-background-color;
          i {
            color: $normal-background-color;
          }
        }
        input {
          color: $normal-background-color;
          &:focus,
          &::placeholder {
            color: $normal-background-color;
          }
        }
        &--invalid {
          border-bottom: 1px solid $downColor !important;
          div > label,
          div > span,
          label > i,
          input,
          input:focus,
          input::placeholder {
            color: $downColor !important;
          }
        }
      }
    }
  }
  &__button {
    padding: 0.5rem 1rem;
    min-width: 4.5rem;
  }
  &__login {
    background: $primary-text-color;
    color: $primaryThemeColor !important;
  }
  &__modal {
    &__item {
      color: $primary-title-color;
      border-bottom: 1px solid $normal-placeholder-color;
      padding: 0.5rem;
    }
  }
}
</style>
