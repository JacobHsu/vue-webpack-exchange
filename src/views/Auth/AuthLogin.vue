<template>
  <b-container fluid :class="[$style.login, 'w-100 h-100']" ref="user">
    <b-row>
      <b-col
        :class="[
          $style.login__header,
          'd-flex flex-column justify-content-center'
        ]"
      >
        <b-btn
          variant="link"
          :to="{ name: 'Market' }"
          :class="[$style.login__header__close, 'p-0 text-right']"
        >
          <i class="fas fa-times-circle"></i>
        </b-btn>
      </b-col>
    </b-row>
    <section class="mx-3">
      <b-row>
        <b-col>
          <div :class="[$style.login__page__logo]"></div>
        </b-col>
      </b-row>
      <b-row>
        <b-col :class="[$style.login__page__title]">
          <span v-text="$t('login_b_login')"></span>
        </b-col>
      </b-row>
    </section>
    <section class="mt-4">
      <b-form v-on:submit.prevent="submit">
        <b-form-group>
          <b-row>
            <b-col cols="5" md="3">
              <label class="text-light" for="country-code">
                <span
                  v-text="$t('login_tf_countryCode_title')"
                  @click="showRegionModal = true"
                ></span>
              </label>
              <b-input-group
                @click="showRegionModal = true"
                :class="[
                  $style.login__form__input__group,
                  errors.has('country')
                    ? $style['login__form__input__group--invalid']
                    : ''
                ]"
              >
                <b-input-group-prepend>
                  <label for="verifiy" class="input-group-text">
                    <i class="icomoon-phone"></i>
                  </label>
                </b-input-group-prepend>
                <b-btn class="border-0 px-0 text-left">
                  <span class="ml-2" v-text="countryCodeText"></span>
                </b-btn>
                <input
                  type="hidden"
                  v-model="form.country"
                  v-validate="{ required: true }"
                  name="country"
                  id="country"
                />
              </b-input-group>
            </b-col>
            <b-col cols="7" md="9">
              <label class="text-light" for="phone-number">
                <span v-text="$t('login_tf_number_title')"></span>
              </label>
              <b-input-group
                :class="[
                  $style.login__form__input__group,
                  errors.has('phone-number')
                    ? $style['login__form__input__group--invalid']
                    : ''
                ]"
              >
                <input
                  type="text"
                  v-model="form.phone_number"
                  :class="[
                    $style['login__form__background-0'],
                    'form-control border-0'
                  ]"
                  v-validate="{ required: true, numeric: true }"
                  id="phone-number"
                  name="phone-number"
                  @focus="scroll"
                  @keydown="filterNumber"
                  :placeholder="$t('register_tf_number_placeholder')"
                />
              </b-input-group>
            </b-col>
          </b-row>
        </b-form-group>
        <b-btn
          :disabled="errors.any() || !isCompleted || form.loading"
          type="submit"
          :class="[$style.login__button, $style.login__login]"
          :block="true"
          size="md"
          variant="link"
        >
          <i v-if="form.loading" class="fas fa-spinner fa-pulse"></i>
          <span v-text="$t('login_b_login')"></span>
        </b-btn>
        <b-btn
          to="register"
          variant="info"
          :class="['btn-block']"
        >
          <span v-text="$t('login_b_register')"></span>
        </b-btn>
      </b-form>
    </section>
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
  created() {
    this.form.country = this.countries
      ? this.countries.find(_ => _.countryID === 'TW') || 'TW'
      : null
    // console.log('1created', this.countries.find(_ => _.countryID === 'TW'), this.form.country)
    // if (getAccessToken()) {
    //   logoutDisposal()
    //   if (this.sessionTimeout) {
    //     window.alert(this.$t('setting_e_autologout_30'))
    //   }
    // }
  },
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
  methods: {
    scroll() {
      setTimeout(() => this.$refs.user.scrollTo(0, 160), 200)
    },
    filterNumber(e) {
      let key = e.keyCode || e.which
      if (key === 8 || key === 9) return
      if (
        !(
          (key >= 48 && key <= 57) ||
          (key >= 96 && key <= 105) ||
          key === 37 ||
          key === 39
        )
      ) {
        e.returnValue = false
        if (e.preventDefault) e.preventDefault()
      }
    }
  },
  computed: {
    countryCodeText() {
      return this.form.country === null
        ? this.$t('login_tf_countryCode_placeholder')
        : `+${this.form.country.countryCode}`
    }
  }
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
