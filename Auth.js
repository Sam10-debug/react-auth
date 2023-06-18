import { useState, useEffect } from 'react';

function App() {
  const [accessToken, setAccessToken] = useState('');
  const [refreshToken, setRefreshToken] = useState('');

  // Function to handle user login
  const handleLogin = async (username, password) => {
    // Make a request to the server to authenticate the user
    const response = await fetch('/api/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      const data = await response.json();
      setAccessToken(data.accessToken);
      setRefreshToken(data.refreshToken);
    } else {
      // Handle login error
      console.error('Login failed');
    }
  };

  // Function to handle token refresh
  const handleTokenRefresh = async () => {
    // Make a request to the server to refresh the access token using the refresh token
    const response = await fetch('/api/refresh', {
      method: 'POST',
      body: JSON.stringify({ refreshToken }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      const data = await response.json();
      setAccessToken(data.accessToken);
    } else {
      // Handle token refresh error
      console.error('Token refresh failed');
    }
  };

  // useEffect hook to automatically refresh the access token when it expires
  useEffect(() => {
    const refreshTokenInterval = setInterval(() => {
      handleTokenRefresh();
    }, 600000); // Refresh token every 10 minutes

    return () => {
      clearInterval(refreshTokenInterval);
    };
  }, []);

  return (
    <div>
      <h1>React Authentication Example</h1>
      {accessToken ? (
        <p>User is logged in.</p>
      ) : (
        <p>User is not logged in.</p>
      )}
      <button onClick={() => handleLogin('username', 'password')}>
        Login
      </button>
    </div>
  );
}

export default App;
