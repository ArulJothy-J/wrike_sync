import React from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from 'react-google-login';
// refresh token
import { refreshTokenSetup } from '../utils/refreshToken';

const clientId =
  '612799539794-e6g52une30c0ldfdh57kl7ju89jrnibo.apps.googleusercontent.com';

function Login() {
  const navigate = useNavigate();

  const name = localStorage.getItem('name');

  if (name) {
    navigate('/dashboard', { replace: true });
  }

  const onSuccess = (res) => {
    console.log('Login Success: currentUser:', res.profileObj);
    console.log("res....", res);
    localStorage.setItem('name', res.profileObj.name);
    refreshTokenSetup(res);
    navigate('/dashboard', { replace: true });
  };

  const onFailure = (res) => {
    console.log('Login failed: res:', res);
    alert(
      'Failed to login'
    );
  };

  return (
    <div>
      <GoogleLogin
        clientId={clientId}
        buttonText="Login"
        onSuccess={onSuccess}
        onFailure={onFailure}
        cookiePolicy={'single_host_origin'}
        style={{ marginTop: '100px' }}
        isSignedIn={true}
      />
    </div>
  );
}

export default Login;
