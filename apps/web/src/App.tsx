import { TamaguiInternalConfig, TamaguiProvider, Theme } from 'tamagui'
import { config } from '@checkmate/theme';
// import { config } from '@tamagui/config';

import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import HomePage from './pages/Home/Home';
import LoginPage from './pages/Login/login';
import RegisterPage from './pages/Register/register';
import ProfilePage from './pages/Profile/profile';
import GameDiscoveryPage from './pages/Game/GameDiscovery/GameDiscovery';
import GameDetailsPage from './pages/Game/GameDetails/GameDetails';
import GameSearchResults from './pages/Game/GameSearchResults/GameSearchResults';
import FindFriendsPage from './pages/Friends/FindFriends';
// import Match from './pages/Match'
// import FriendSearch from './pages/FriendSearch'
// import FriendProfile from './pages/FriendProfile'
// import Stats from './pages/Stats/stats';

import { AuthProvider } from '@checkmate/state';
import React from 'react';
// import ProtectedRoute from './components/ProtectedRoute';
import Layout from './layout/layout';


export default function App() {
  // console.log('Tamagui config:', config)
  // console.log('Tamagui config:', JSON.stringify(config, null, 2))

  const [theme, setTheme] = useState<'light' | 'dark'>('dark')
  return (
    <TamaguiProvider config={config as unknown as TamaguiInternalConfig}>
      <Theme name={theme}>
        <Router>
          <AuthProvider>
            <Routes>
              <Route path="/" element={<Layout theme="blueDark">
                <HomePage />
              </Layout>} />
              <Route
                path="/profile"
                element={
                  // <ProtectedRoute>
                  <Layout theme="blueDark">
                    <ProfilePage />
                  </Layout>
                  // </ProtectedRoute>
                }
              />
              <Route
                path="/game/:id"
                element={
                  // <ProtectedRoute>
                  <Layout theme="tealDark">
                    <GameDetailsPage />
                  </Layout>
                  // </ProtectedRoute>
                }
              />
              <Route
                path="/games"
                element={
                  <Layout theme="medBlueDark">
                    <GameDiscoveryPage />
                  </Layout>
                }
              />
              <Route
                path="/search"
                element={
                  <Layout theme="medBlueDark">
                    <GameSearchResults />
                  </Layout>
                }
              />
              <Route
                path="/friends"
                element={
                  // <ProtectedRoute>
                  <Layout theme="tealDark">
                    <FindFriendsPage />
                  </Layout>
                  // </ProtectedRoute>
                }
              />
              <Route path="/login" element={<Layout theme="tealDark">
                <LoginPage />
              </Layout>} />
              <Route path="/register" element={<Layout theme="magentaDark">
                <RegisterPage />
              </Layout>} />
            </Routes>
          </AuthProvider>
        </Router>
      </Theme>
    </TamaguiProvider>
  )
};
