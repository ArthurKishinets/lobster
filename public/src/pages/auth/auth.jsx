import Login from './login/login.jsx';
import Signup from './signup/signup.jsx';
import Socials from './social/social.jsx';
import React from 'react';

let Auth = () => {
  return (
    <div>
      <h1>Auth</h1>
      <Login></Login>
      <Signup></Signup>
      <Socials></Socials>
    </div>
  );
}

export default Auth;