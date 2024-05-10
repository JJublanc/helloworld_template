import './App.css';
import React, {useState} from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Navbar from './components/AppNavBar';
import HomePage from './pages/HomePage';
import MainPage from './pages/MainPage';
import Blog from './pages/blog/BlogPage';
import LoginForm from './components/LoginForm';

function App() {

    const [isShowLogin, setIsShowLogin] = useState(true);

    const handleLoginClick = () => {
        setIsShowLogin((isShowLogin) => !isShowLogin);
    };

    return (
        <Router className={App}>
            <div className="main">
                <div>
                    <Navbar handleLoginClick={handleLoginClick}/>
                </div>
                <div>
                    <LoginForm isShowLogin={isShowLogin}/>
                    <div className="PageContainer">
                        <Routes>
                            <Route path="/" element={<HomePage/>}/>
                            <Route path="/home" element={<HomePage/>}/>
                            <Route path="/main" element={<MainPage/>}/>
                            <Route path="/blog" element={<Blog/>}/>
                        </Routes>
                    </div>
                </div>
            </div>
            <div className="footer">
                <div className="footer-column">
                   Credits :
                    "Picture" By Freepik on Flaticon.com
                    "User" By Febrian Hidayat on Flaticon.com
                    Image article 1 by Quang NGUYEN DANG from Pixabay
                    Image article 2 by Karl Egger from Pixabay
                </div>
                <div className="footer-column">
                   Colonne 2
                </div>
                <div className="footer-column">
                   Colonne 3
                </div>
            </div>
        </Router>
    )
        ;
}

export default App;


