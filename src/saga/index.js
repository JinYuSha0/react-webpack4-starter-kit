import { all, takeLatest } from 'redux-saga/effects'
// import { all, put, take, takeLatest, takeEvery } from 'redux-saga/effects'
import sagas from '@sagas'
import { LOGIN } from '@reducer/user'

const { user } = sagas

export default function * rootSaga () {
  yield all([
    takeLatest(LOGIN, user.login),
  ])
}
