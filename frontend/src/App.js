import './App.css';
import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Navbar from './components/AppNavBar';
import HomePage from './pages/HomePage';
import MainPage from "./pages/MainPage";
import {Routes} from 'react-router-dom';

function App() {
    return (
        <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/main" element={<MainPage />} />
        </Routes>
      </div>
    </Router>
    );
}

export default App;
