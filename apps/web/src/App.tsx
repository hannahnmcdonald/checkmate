import { TamaguiProvider, Theme } from 'tamagui'
import config from '../tamagui.config';
import { useState } from 'react';
// import { Button } from 'tamagui';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
// Replace BrowserRouter with React Navigation for Mobile Dev

// import Home from './pages/Home'
// import Login from './pages/Login'
// import Register from './pages/Register'
// import Profile from './pages/Profile'
// import GameSearch from './pages/GameSearch'
// import GameDetails from './pages/GameDetails'
// import Match from './pages/Match'
// import FriendSearch from './pages/FriendSearch'
// import FriendProfile from './pages/FriendProfile'
// import Stats from './pages/Stats'

import { AuthProvider } from './context/AuthContext'
import Navbar from './components/Navbar/navbar';
// import ProtectedRoute from './components/ProtectedRoute'

export default function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark')
  return (

    // Toggle theme or no? Dark mode is superior
    //     <Button onPress={() => setTheme(t => (t === 'light' ? 'dark' : 'light'))}>
    //       Toggle Theme
    //     </Button>

    <TamaguiProvider config={config}>
      <Theme name={theme}>
        <Router>
          <AuthProvider>
            <Navbar />
            <Routes>
              {/* //           <Route path="/" element={<Home />} />
    //           <Route path="/login" element={<Login />} />
    //           <Route path="/register" element={<Register />} />

    //           <Route
    //             path="/profile"
    //             element={<ProtectedRoute><Profile /></ProtectedRoute>}
    //           />
    //           <Route
    //             path="/profile/stats"
    //             element={<ProtectedRoute><Stats /></ProtectedRoute>}
    //           />
    //           <Route
    //             path="/games"
    //             element={<GameSearch />}
    //           />
    //           <Route
    //             path="/games/:id"
    //             element={<GameDetails />}
    //           />
    //           <Route
    //             path="/game/:id/match"
    //             element={<ProtectedRoute><Match /></ProtectedRoute>}
    //           />
    //           <Route
    //             path="/friends/search"
    //             element={<ProtectedRoute><FriendSearch /></ProtectedRoute>}
    //           />
    //           <Route
    //             path="/friends/:id"
    //             element={<ProtectedRoute><FriendProfile /></ProtectedRoute>}
    //           /> */}
            </Routes>
          </AuthProvider>
        </Router>
      </Theme>
    </TamaguiProvider>
  )
};
