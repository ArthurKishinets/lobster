import ReactDom from 'react-dom'
import React from 'react'
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './redux'
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles'
import purple from 'material-ui/colors/purple'
import green from 'material-ui/colors/green'
import red from 'material-ui/colors/red'

/**
 * Components
 */

import Header from './components/header/header.jsx'
// import Login from './pages/auth/login/login.jsx';
// import Signup from './pages/auth/signup/signup.jsx';
import ProfileContainer from './pages/profile/profile.jsx'
import Auth from './pages/auth/auth.jsx'
import MainContainer from './pages/main/main.jsx'
import Interceptor from './pages/routing/interceptor/interceptor.jsx'
import Location from './components/location/location.jsx'
import { initialStore } from './redux/initial.store.js'

const theme = createMuiTheme({
  palette: {
    primary: purple,
    secondary: {
      ...green,
      A400: '#00e677'
    },
    error: red
  }
})

const store = createStore(reducer, initialStore,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

function renderApp () {
  ReactDom.render(
    <Router>
      <Provider store={store}>
        <div>
          <MuiThemeProvider theme={theme}>
            <div>
              <Interceptor />
              <Location />
              <Header />
              <Switch>
                <Route exact path='/' component={MainContainer} />
                <Route path='/auth' component={Auth} />
                <Route path='/profile' component={ProfileContainer} />
              </Switch>
            </div>
          </MuiThemeProvider>
        </div>
      </Provider>
    </Router>,
    document.getElementById('root')
  )
}

renderApp()

if (module.hot) {
  module.hot.accept('./app.jsx', renderApp)
}
