import Immutable from 'immutable'
import { createAction, handleActions } from 'redux-actions'

export const LOGIN = 'LOGIN'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'

export const INITIAL_STATE = Immutable.fromJS({
  isLogin: false, // 是否登录
  expiredTime: null, // 过期时间
  userInfo: {
    ad: null,
  },
})

export default handleActions({
  [LOGIN_SUCCESS]: state => (
    state
  ),
}, INITIAL_STATE)

export const login = createAction(LOGIN, info => info)
