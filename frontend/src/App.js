import React, { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import axios from "axios";
import { Toaster } from "./components/ui/sonner";
import { toast } from "sonner";

// Components
import Header from "./components/Header";
import LandingPage from "./components/LandingPage";
import Dashboard from "./pages/Dashboard";
import MyPlaces from "./pages/MyPlaces";
import Market from "./pages/Market";
import Community from "./pages/Community";
import Wars from "./pages/Wars";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in (from localStorage)
    const savedUser = localStorage.getItem('europaUser');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const handleLogin = async (loginData) => {
    try {
      // Mock login - in real app this would call backend API
      const mockUser = {
        id: 1,
        name: 'John Doe',
        email: loginData.email,
        country: 'Albania',
        gold: 150,
        coins: 2500,
        level: 15,
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face'
      };
      
      setUser(mockUser);
      localStorage.setItem('europaUser', JSON.stringify(mockUser));
      toast.success('Welcome to Europa!');
    } catch (error) {
      console.error('Login error:', error);
      toast.error('Login failed. Please try again.');
    }
  };

  const handleRegister = async (registrationData) => {
    try {
      // Mock registration - in real app this would call backend API
      const newUser = {
        id: Date.now(),
        name: registrationData.username,
        email: registrationData.email,
        country: registrationData.country,
        gold: 50,
        coins: 1000,
        level: 1,
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face'
      };
      
      setUser(newUser);
      localStorage.setItem('europaUser', JSON.stringify(newUser));
      toast.success(`Welcome to Europa, ${newUser.name}!`);
    } catch (error) {
      console.error('Registration error:', error);
      toast.error('Registration failed. Please try again.');
    }
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('europaUser');
    toast.success('Logged out successfully');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading Europa...</div>
      </div>
    );
  }

  return (
    <div className="App min-h-screen bg-slate-900">
      <BrowserRouter>
        <Header user={user} onLogin={handleLogin} onLogout={handleLogout} />
        <main>
          <Routes>
            <Route 
              path="/" 
              element={
                !user ? (
                  <LandingPage onRegister={handleRegister} />
                ) : (
                  <Navigate to="/dashboard" replace />
                )
              } 
            />
            <Route 
              path="/dashboard" 
              element={user ? <Dashboard user={user} /> : <Navigate to="/" replace />} 
            />
            <Route 
              path="/my-places/*" 
              element={user ? <MyPlaces user={user} /> : <Navigate to="/" replace />} 
            />
            <Route 
              path="/market/*" 
              element={user ? <Market user={user} /> : <Navigate to="/" replace />} 
            />
            <Route 
              path="/community/*" 
              element={user ? <Community user={user} /> : <Navigate to="/" replace />} 
            />
            <Route 
              path="/wars" 
              element={user ? <Wars user={user} /> : <Navigate to="/" replace />} 
            />
          </Routes>
        </main>
        <Toaster position="top-right" />
      </BrowserRouter>
    </div>
  );
}

export default App;