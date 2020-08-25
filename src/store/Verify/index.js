/**
 * 1.resetCountdownTimer 2.setCountdownTimer
 */
import { createTypes } from '@/libs'
import { toMomentDate, toLocal24Time } from '@/libs/date'

const types = createTypes([
  'SET_SMS_COUNTDOWN_ID',
  'SET_SMS_COUNTDOWN_TIMER',
  'TICK_SMS_COUNTDOWN_TIMER',
  'RESET_SMS_COUNTDOWN_TIMER',
  'SET_MAIL_COUNTDOWN_ID',
  'SET_MAIL_COUNTDOWN_TIMER',
  'TICK_MAIL_COUNTDOWN_TIMER',
  'RESET_MAIL_COUNTDOWN_TIMER'
])

const state = {
  smsCountdownId: null,
  smsCountdownStartTime: null,
  smsCountdownEndTime: null,
  smsCountdownTime: null,
  mailCountdownId: null,
  mailCountdownStartTime: null,
  mailCountdownEndTime: null,
  mailCountdownTime: null
}

const getters = {
  smsStartTime: state => state.smsCountdownStartTime,
  smsRemainingTime: state => {
    return state.smsCountdownTime && state.smsCountdownEndTime
      ? toMomentDate(state.smsCountdownEndTime).diff(
        toMomentDate(state.smsCountdownTime)
      ) / 1000
      : 0
  },
  mailStartTime: state => state.mailCountdownStartTime,
  mailRemainingTime: state => {
    return state.mailCountdownTime && state.mailCountdownEndTime
      ? toMomentDate(state.mailCountdownEndTime).diff(
        toMomentDate(state.mailCountdownTime)
      ) / 1000
      : 0
  }
}

const actions = {
  setSmsCountdownId({ commit }, payload) {
    commit(types.SET_SMS_COUNTDOWN_ID.base, payload)
  },
  setSmsCountdownTimer({ commit }) {
    commit(types.SET_SMS_COUNTDOWN_TIMER.base)
  },
  tickSmsCountdownTimer({ commit }) {
    commit(types.TICK_SMS_COUNTDOWN_TIMER.base)
  },
  resetSmsCountdownTimer({ commit }) {
    commit(types.RESET_SMS_COUNTDOWN_TIMER.base)
  },
  setMailCountdownId({ commit }, payload) {
    commit(types.SET_MAIL_COUNTDOWN_ID.base, payload)
  },
  setMailCountdownTimer({ commit }) {
    commit(types.SET_MAIL_COUNTDOWN_TIMER.base)
  },
  tickMailCountdownTimer({ commit }) {
    commit(types.TICK_MAIL_COUNTDOWN_TIMER.base)
  },
  resetMailCountdownTimer({ commit }) {
    commit(types.RESET_MAIL_COUNTDOWN_TIMER.base)
  }
}

const mutations = {
  [types.SET_SMS_COUNTDOWN_ID.base](state, payload) {
    state.smsCountdownId = payload
  },
  [types.SET_SMS_COUNTDOWN_TIMER.base](state) {
    state.smsCountdownStartTime = toLocal24Time(toMomentDate())
    state.smsCountdownTime = toLocal24Time(toMomentDate())
    state.smsCountdownEndTime = toLocal24Time(toMomentDate().add(60, 'seconds'))
  },
  [types.TICK_SMS_COUNTDOWN_TIMER.base](state) {
    state.smsCountdownTime = toLocal24Time(
      toMomentDate(state.smsCountdownTime).add(1, 'seconds')
    )
  },
  [types.RESET_SMS_COUNTDOWN_TIMER.base](state) {
    if (state.smsCountdownId) {
      window.clearInterval(state.smsCountdownId)
    }
    state.smsCountdownId = null
    state.smsCountdownStartTime = null
    state.smsCountdownEndTime = null
    state.smsCountdownTime = null
  },

  [types.SET_MAIL_COUNTDOWN_ID.base](state, payload) {
    state.mailCountdownId = payload
  },
  [types.SET_MAIL_COUNTDOWN_TIMER.base](state) {
    state.mailCountdownStartTime = toLocal24Time(toMomentDate())
    state.mailCountdownTime = toLocal24Time(toMomentDate())
    state.mailCountdownEndTime = toLocal24Time(
      // toMomentDate().add(600, 'seconds')
      toMomentDate().add(60, 'seconds')
    )
  },
  [types.TICK_MAIL_COUNTDOWN_TIMER.base](state) {
    state.mailCountdownTime = toLocal24Time(
      toMomentDate(state.mailCountdownTime).add(1, 'seconds')
    )
  },
  [types.RESET_MAIL_COUNTDOWN_TIMER.base](state) {
    if (state.mailCountdownId) {
      window.clearInterval(state.mailCountdownId)
    }
    state.mailCountdownId = null
    state.mailCountdownStartTime = null
    state.mailCountdownEndTime = null
    state.mailCountdownTime = null
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
