import { TamaguiInternalConfig, TamaguiProvider, Theme } from 'tamagui'
import { config } from '@checkmate/theme';
// import { config } from '@tamagui/config';

import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

// import Home from './pages/Home'
// import Login from './pages/Login'
// import Register from './pages/Register'
import Profile from './pages/Profile/profile';
// import GameSearch from './pages/GameSearch'
// import GameDetails from './pages/GameDetails'
// import Match from './pages/Match'
// import FriendSearch from './pages/FriendSearch'
// import FriendProfile from './pages/FriendProfile'
// import Stats from './pages/Stats/stats';

import { AuthProvider } from '@checkmate/auth';
import Navbar from './components/Navbar/navbar';
import React from 'react';
import ProtectedRoute from './components/protectedRoute';

export default function App() {
  console.log('Tamagui config:', config)
  console.log('Tamagui config:', JSON.stringify(config, null, 2))

  const [theme, setTheme] = useState<'light' | 'dark'>('dark')
  return (
    <TamaguiProvider config={config as unknown as TamaguiInternalConfig}>
      <Theme name={theme}>
        <Router>
          <AuthProvider>
            <Navbar />
            <Routes>
              <Route
                path="/profile/stats"
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </AuthProvider>
        </Router>
      </Theme>
    </TamaguiProvider>
  )
};
