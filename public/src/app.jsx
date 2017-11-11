import ReactDom from 'react-dom';
import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux'
import reducer from './redux'

/**
 * Components
 */

import Header from './components/header/header.jsx';
// import Login from './pages/auth/login/login.jsx';
// import Signup from './pages/auth/signup/signup.jsx';
import Profile from './pages/profile/profile.component.jsx';
import Auth from './pages/auth/auth.jsx';
import Main from './pages/main/main.jsx';
import Interceptor from './pages/routing/interceptor/interceptor.jsx';
import initialStore from './redux/initial.store.js';

const store = createStore(reducer, initialStore,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

function renderApp() {
  ReactDom.render(
    <Router>
      <Provider store={store}>
        <div>
          <Header></Header>
          <Route exact path="/" component={Main}/>
          <Route path="/auth" component={Auth}/>
          <Route path="/profile" component={Profile}/>
          <Interceptor></Interceptor>
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
