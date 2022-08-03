import React from 'react';
import {
  Route,
  Routes,
  useLocation,
  Navigate,
  BrowserRouter
} from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import Dashboard from './pages/dashboard';

function RequireAuth({ children }) {
  const location = useLocation();
  const name = localStorage.getItem('name');

  if (!name) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return children;
}

function RedirectToDashboard({ children }) {
  const location = useLocation();
  const name = localStorage.getItem('name');

  if (name) {
    return <Navigate to="/dashboard" state={{ from: location }} replace />;
  }

  return children;
}

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path='/dashboard' element={<RequireAuth><Dashboard /></RequireAuth>} />
          <Route path='/' element={<RedirectToDashboard><Login /></RedirectToDashboard>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
