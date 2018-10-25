import React, { Component } from 'react'
import createStore from '@/redux/createStore'
import rootReducer from '@reducer'
import rootSaga from '@/saga'
import createHashHistory from 'history/createBrowserHistory'
import routes from '@/routes'
import { Provider } from 'react-redux'
import { Router, Switch } from 'react-router-dom'
import { renderRoutes } from 'react-router-config'
import { hot } from 'react-hot-loader'

import '@assets/styles/index.less'

export const history = createHashHistory()
export const store = createStore(rootReducer, rootSaga, history)

class Main extends Component {
  render () {
    return (
      <Provider key={Math.random()} store={store}>
        <Router history={history}>
          <div className="page-container">
            <Switch>
              {renderRoutes(routes)}
            </Switch>
          </div>
        </Router>
      </Provider>
    )
  }
}

export default hot(module)(Main)
