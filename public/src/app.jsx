import ReactDom from 'react-dom';
import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

/**
 * Components
 */

import Header from './components/header/header.jsx';
// import Login from './pages/auth/login/login.jsx';
// import Signup from './pages/auth/signup/signup.jsx';
import Profile from './pages/profile/profile.jsx';
import Auth from './pages/auth/auth.jsx';
import Main from './pages/main/main.jsx';

function renderApp() {
  ReactDom.render(
    <Router>
      <div>
        <Header></Header>
        <Route exact path="/" component={Main}/>
        <Route path="/auth" component={Auth}/>
        <Route path="/profile" component={Profile}/>
      </div>
    </Router>,
    document.getElementById('root')
  );
}

renderApp();

if (module.hot) {
  module.hot.accept('./app.jsx', renderApp);
}
