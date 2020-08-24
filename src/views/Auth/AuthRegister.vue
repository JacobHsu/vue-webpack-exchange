<template>
  <b-container fluid :class="[$style.user, 'w-100 h-100']">
    <section>
      <b-row>
        <b-col class="mt-2 ml-2">
          <b-btn
            @click="$router.go(-1)"
            variant="link"
            :class="[$style.user__header__close, 'align-self-center']"
          >
            <i class="icomoon-angle-down"></i>
          </b-btn>
        </b-col>
      </b-row>
      <b-row>
        <b-col :class="[$style.user__title]">
          <span v-text="$t('register_l_title')"></span>
        </b-col>
      </b-row>
    </section>
    <section class="mt-3">

      <b-row>
        <b-col :class="[$style.user__link]">
          <span v-text="$t('register_b_agreement_part1')"></span>
          <span
            v-text="$conf.appFullName"
            :class="[$style.user__link__name]"
            @click="displayAgreement = true"
          ></span>
          <span v-text="$t('register_b_agreement_part2')"></span>
        </b-col>
      </b-row>
    </section>
  </b-container>
</template>

<script>
export default {
  name: 'AuthRegister',
  props: {},
  data() {
    return {}
  },
  computed: {},
  created() {},
  mounted() {},
  watch: {},
  methods: {},
  components: {}
}
</script>

<style lang="scss" module>
@import 'src/theme/main.scss';
@import 'src/theme/app.scss';
@import 'src/theme/color.scss';
.user {
  &__dropdown {
    color: $primaryThemeColor;
    i {
      color: $primaryThemeColor;
      font-size: 0.5rem;
    }
  }
  &__title {
    @include auth-title-primary-gradient;
    letter-spacing: 1px;
    font-weight: 800;
    font-size: $font-size18;
  }
  &__invite {
    color: $primaryThemeColor;
  }
  &__form {
    &__background-0 {
      background: transparent;
    }
    &__input {
      &__group {
        padding: 0.5rem 0;
        border-bottom: 1px solid $normal-placeholder-color;
        label {
          border: 0;
          background: 0;
          i {
            color: $primary-title-color;
          }
        }
        div {
          color: $normal-placeholder-color;
        }
        input {
          color: $normal-placeholder-color;
          border: 0;
          &:focus {
            color: $primary-token-color;
          }
          &::placeholder {
            color: $normal-placeholder-color;
          }
        }
        &__country {
          padding: 0.5rem 0;
          border-bottom: 1px solid $normal-placeholder-color;
          padding: 0.375rem 0;
        }
        &__verify {
          min-width: 4rem;
          border-radius: 2rem !important;
          background-color: $primaryThemeColor;
        }
        &__countdown {
          min-width: 4rem;
          border-radius: 2rem !important;
          background-color: $countdownColor;
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
    &__submit {
      background-color: $primaryButtonColor;
    }
  }
  &__modal {
    &__region {
      color: $primary-title-color;
      border-bottom: 1px solid $normal-placeholder-color;
      padding: 0.5rem;
    }
  }
  &__link {
    color: $primaryRemarkColor;
    margin: 1.5rem 0;
    font-size: $font-size09;
    text-align: center;
    &__name {
      text-decoration: underline;
    }
  }
}
</style>
