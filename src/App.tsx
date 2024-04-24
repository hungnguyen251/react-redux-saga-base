import React from 'react';
import './App.css';
import { AuthProvider } from 'context/AuthContext';
import Routes from 'AppRoutes';

function App() {
  return (
    <div className="App">
        <AuthProvider>
          <Routes />
        </AuthProvider>
    </div>
  );
}

export default App;
