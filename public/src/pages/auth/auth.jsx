import Login from './login/login';
import SignUp from './signup/signup';
import Socials from './social/social';
import React from 'react';

let Auth = () => {
  return (
    <div>
      <h1>Auth</h1>
      <Login></Login>
      <SignUp></SignUp>
      <Socials></Socials>
    </div>
  );
}

export default Auth;