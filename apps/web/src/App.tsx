import { TamaguiInternalConfig, TamaguiProvider, Theme } from 'tamagui'
import { config } from '@checkmate/theme';
// import { config } from '@tamagui/config';

import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

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

import { AuthProvider } from '@checkmate/auth';
import Navbar from './components/Navbar/navbar';
import React from 'react';
// import ProtectedRoute from './components/ProtectedRoute'

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
            {/* <Routes>
              {/* <Route
                path="/profile/stats"
                 element={<ProtectedRoute><Stats /></ProtectedRoute>}
               />
            </Routes> */}
          </AuthProvider>
        </Router>
      </Theme>
    </TamaguiProvider>
  )
};

// export default function App() {
//   return (
//     <TamaguiProvider config={config}>
//       <Theme name="light">
//         <Router>
//           <AuthProvider>
//             <Navbar />
//             <div style={{ padding: 40 }}>
//               <h1>Hello Checkmate with Tamagui</h1>
//             </div>
//           </AuthProvider>
//         </Router>
//       </Theme>
//     </TamaguiProvider>
//   )
// }


// export default function App() {
//   return (
//     <TamaguiProvider config={config}>
//       <Theme name="light">
//         <div style={{ padding: 20 }}>
//           <h1>Tamagui baseline working</h1>
//         </div>
//       </Theme>
//     </TamaguiProvider>
//   )
// }
