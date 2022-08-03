import React from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleLogout } from 'react-google-login';

const clientId =
  '612799539794-e6g52une30c0ldfdh57kl7ju89jrnibo.apps.googleusercontent.com';

function Logout() {
  const navigate = useNavigate();

  const onSuccess = () => {
    console.log('Logout made successfully');
    localStorage.clear();
    navigate('/', { replace: true });
  };

  return (
    <div>
      <GoogleLogout
        clientId={clientId}
        buttonText="Logout"
        onLogoutSuccess={onSuccess}
      ></GoogleLogout>
    </div>
  );
}

export default Logout;
