import createSagaMiddleware from 'redux-saga'
import thunkMiddleware from 'redux-thunk'
import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import { createLogger } from 'redux-logger'

export default function (rootReducer, rootSaga, history) {
  const middleware = []
  const enhancers = []

  // saga中间件
  const sagaMiddleware = createSagaMiddleware()
  middleware.push(sagaMiddleware)

  // log中间件
  if (process.env.NODE_ENV !== 'production') {
    const SAGA_LOGGING_BLACKLIST = ['EFFECT_TRIGGERED', 'EFFECT_RESOLVED', 'EFFECT_REJECTED']
    const logger = createLogger({
      predicate: (getState, { type }) => SAGA_LOGGING_BLACKLIST.indexOf(type) === -1,
    })
    middleware.push(logger)
  }

  // thunk中间件
  middleware.push(thunkMiddleware)

  // 暴露store接口给中间件
  enhancers.push(applyMiddleware(...middleware))

  const store = createStore(combineReducers({
    ...rootReducer,
  }), compose(...enhancers))

  // kick off root saga
  sagaMiddleware.run(rootSaga)

  // 注册路由变化钩子 代替react-router-redux
  store.unsubscribeHistory = history.listen(nextLocation => {
    console.log(`route change ${nextLocation}`)
  })

  return store
}
