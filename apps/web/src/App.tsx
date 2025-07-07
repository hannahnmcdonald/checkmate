import { TamaguiInternalConfig, TamaguiProvider, Theme } from 'tamagui'
import { config } from '@checkmate/theme';

import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import {
  HomePage,
  FindFriendsPage,
  GameDetailsPage,
  GameDiscoveryPage,
  GameSearchResultsPage,
  ProfilePage,
  RegisterPage,
  LoginPage,
  MatchStartPage,
  MatchDetailsPage,
  MatchFinalPage,
  PublicProfilePage
} from './pages/index'

import React from 'react';
import ProtectedRoute from './components/ProtectedRoute';
import Layout from './layout/layout';


export default function App() {

  const [theme, setTheme] = useState<'light' | 'dark'>('dark')
  return (
    <TamaguiProvider config={config as unknown as TamaguiInternalConfig}>
      <Theme name={theme}>
        <Router>
          <Routes>
            <Route path="/" element={<Layout theme="blueDark">
              <HomePage />
            </Layout>} />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Layout theme="blueDark">
                    <ProfilePage />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/game/:gameId/start-match"
              element={
                <ProtectedRoute>
                  <Layout theme="magentaDark">
                    <MatchStartPage />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/match/:matchId"
              element={
                <ProtectedRoute>
                  <Layout theme="tealDark">
                    <MatchDetailsPage />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/match/:matchId/finalize"
              element={
                <ProtectedRoute>
                  <Layout theme="greenDark">
                    <MatchFinalPage />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile/:userId"
              element={
                <ProtectedRoute>
                  <Layout theme="tealDark">
                    <PublicProfilePage />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/game/:id"
              element={
                <Layout theme="tealDark">
                  <GameDetailsPage />
                </Layout>
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
                  <GameSearchResultsPage />
                </Layout>
              }
            />
            <Route
              path="/friends"
              element={
                <ProtectedRoute>
                  <Layout theme="tealDark">
                    <FindFriendsPage />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route path="/login" element={<Layout theme="tealDark">
              <LoginPage />
            </Layout>} />
            <Route path="/register" element={<Layout theme="magentaDark">
              <RegisterPage />
            </Layout>} />
          </Routes>
        </Router>
      </Theme>
    </TamaguiProvider>
  )
};
