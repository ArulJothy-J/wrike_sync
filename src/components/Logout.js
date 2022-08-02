import React from 'react';
import { GoogleLogout } from 'react-google-login';

const clientId =
  '612799539794-e6g52une30c0ldfdh57kl7ju89jrnibo.apps.googleusercontent.com';

function Logout() {
  const onSuccess = () => {
    console.log('Logout made successfully');
    alert('Logout made successfully ✌');
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
