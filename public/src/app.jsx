import ReactDom from 'react-dom';
import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux'
import reducer from './redux'

/**
 * Components
 */

import Header from './components/header/header.jsx';
// import Login from './pages/auth/login/login.jsx';
// import Signup from './pages/auth/signup/signup.jsx';
import ProfileContainer from './pages/profile/profile.jsx';
import Auth from './pages/auth/auth.jsx';
import MainContainer from './pages/main/main.jsx';
import Interceptor from './pages/routing/interceptor/interceptor.jsx';
import initialStore from './redux/initial.store.js';

const store = createStore(reducer, initialStore,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

function renderApp() {
  ReactDom.render(
    <Router>
      <Provider store={store}>
        <div>
          <Interceptor></Interceptor>
          <Header></Header>
          <Switch>
            <Route exact path="/" component={MainContainer}/>
            <Route path="/auth" component={Auth}/>
            <Route path="/profile" component={ProfileContainer}/>
          </Switch>
        </div>
      </Provider>
    </Router>,
    document.getElementById('root')
  );
}

renderApp();

if (module.hot) {
  module.hot.accept('./app.jsx', renderApp);
}
