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
      <b-form @submit.prevent="validateBeforeSubmit">
        <b-form-group>
          <b-row>
            <b-col cols="5" md="3">
              <b-input-group
                @click="showRegionModal = true"
                :class="[
                  $style.user__form__input__group,
                  errors.has('country') || form.phone.status === false
                    ? $style['user__form__input__group--invalid']
                    : ''
                ]"
              >
                <b-input-group-prepend>
                  <label for="verifiy" class="input-group-text">
                    <i class="icomoon-phone"></i>
                  </label>
                </b-input-group-prepend>
                <div class="form-control border-0 px-0 text-left">
                  <span class="ml-2" v-text="countryCodeText"></span>
                </div>
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
              <b-input-group
                :class="[
                  $style.user__form__input__group,
                  errors.has('phone-number') || form.phone.status === false
                    ? $style['user__form__input__group--invalid']
                    : ''
                ]"
              >
                <input
                  type="text"
                  v-model="form.phone.number"
                  :class="[
                    $style['user__form__background-0'],
                    'form-control border-0'
                  ]"
                  v-validate="{ required: true, numeric: true }"
                  id="phone-number"
                  name="phone-number"
                  @keydown="filterNumber"
                  :placeholder="$t('login_tf_number_placeholder')"
                />
              </b-input-group>
              <small v-text="form.phone.message" class="text-danger"></small>
            </b-col>
          </b-row>
        </b-form-group>
        <b-form-group>
          <b-row>
            <b-col>
              <b-input-group
                :class="[
                  $style.user__form__input__group,
                  errors.has('verify')
                    ? $style['user__form__input__group--invalid']
                    : ''
                ]"
              >
                <b-input-group-prepend>
                  <label for="verifiy" class="input-group-text">
                    <i class="icomoon-shield"></i>
                  </label>
                </b-input-group-prepend>
                <input
                  type="text"
                  v-model="form.verify"
                  :class="[
                    $style['user__form__background-0'],
                    'form-control border-0'
                  ]"
                  v-validate="{ required: true }"
                  id="verifiy"
                  name="verify"
                  :placeholder="$t('register_tf_code_placeholder')"
                />
                <b-input-group-append class="border-0">
                  <b-btn
                    :disabled="
                      form.processingVerification ||
                        !form.phone.number ||
                        !form.country
                    "
                    v-if="smsRemainingTime === 0"
                    :class="[
                      $style.user__form__input__group__verify,
                      'border-0'
                    ]"
                    @click="processNumberValidate"
                  >
                    <i
                      v-if="form.processingVerification"
                      class="fas fa-spinner fa-pulse"
                    ></i>
                    <span
                      v-if="!form.processingVerification"
                      v-text="$t('g_b_countdown_get')"
                    ></span>
                  </b-btn>

                </b-input-group-append>
              </b-input-group>
            </b-col>
          </b-row>
        </b-form-group>

        <b-btn :disabled="errors.any() || !isCompleted || form.loading"
               type="submit"
               :block="true"
               size="md"
               :class="[$style.user__form__submit, 'border-0']">
          <i v-if="form.loading"
             class="fas fa-spinner fa-pulse"></i>
          <span v-text="$t('login_b_register')"></span>
        </b-btn>
      </b-form>
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
import { mapGetters } from 'vuex'
export default {
  name: 'AuthRegister',
  props: {
    countries: {
      type: Array
    }
  },
  data() {
    return {
      showRegionModal: false,
      form: {
        processingVerification: false,
        loading: false,
        country: null,
        phone: {
          number: null,
          status: null,
          message: null
        },
        verify: null,
        nickname: {
          text: null,
          status: null,
          message: null
        },
        password: null,
        confirm_password: null,
        geeCaptcha: null
      }
    }
  },
  computed: {
    countryCodeText() {
      return this.form.country === null
        ? this.$t('login_tf_countryCode_placeholder')
        : `+${this.form.country.countryCode}`
    },
    ...mapGetters(['smsRemainingTime'])
  },
  created() {
    this.form.country = this.countries
      ? this.countries.find(_ => _.countryID === 'TW') || null
      : null
  },
  mounted() {},
  watch: {},
  methods: {
    processNumberValidate() {
      this.form.processingVerification = true
      // verifyPhoneNumber()
      this.getSmsCode()
    },
    getSmsCode() {
      alert(1234)
      // this.dispatch('resetSmsCountdownTimer')
      // this.dispatch('setSmsCountdownTimer')
    }
  },
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
