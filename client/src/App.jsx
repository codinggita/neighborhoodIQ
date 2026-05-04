import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Explore from './pages/Explore';
import Dashboard from './pages/Dashboard';
import About from './pages/About';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import Compare from './pages/Compare';
import Search from './pages/Search';
import Profile from './pages/Profile';
import PlaceDetails from './pages/PlaceDetails';
import Support from './pages/Support';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import { AuthProvider } from './context/AuthContext';

function AppContent() {
  const location = useLocation();
  const isAuthPage = location.pathname === '/login' || location.pathname === '/register';
  const isDashboard = location.pathname === '/home' || location.pathname === '/dashboard';

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {!isAuthPage && !isDashboard && <Navbar />}
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          
          <Route path="/explore" element={<Explore />} />
          <Route path="/explore/grid" element={<Explore />} />
          <Route path="/explore/map" element={<Explore />} />
          
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/compare" element={<Compare />} />
          
          <Route path="/search" element={<Search />} />
          <Route path="/search/Mumbai" element={<Search />} />
          <Route path="/search/Bangalore" element={<Search />} />
          
          <Route path="/about" element={<About />} />
          <Route path="/support" element={<Support />} />
          <Route path="/contact" element={<Support />} />
          
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile/Saved%20Neighborhoods" element={<Profile />} />
          <Route path="/profile/Activity" element={<Profile />} />
          <Route path="/profile/Preferences" element={<Profile />} />
          <Route path="/profile/Alerts" element={<Profile />} />
          
          <Route path="/place/whitefield" element={<PlaceDetails />} />
          <Route path="/place/koramangala" element={<PlaceDetails />} />
          <Route path="/place/bandra" element={<PlaceDetails />} />
          <Route path="/place/powai" element={<PlaceDetails />} />
        </Routes>
      </main>
      {!isAuthPage && !isDashboard && <Footer />}
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}

export default App;
