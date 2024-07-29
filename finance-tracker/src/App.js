import './App.css';
import { HashRouter, Route, Routes } from 'react-router-dom';
import { useState } from 'react';
import Home from './pages/home/Home.js';
import Main from './pages/main/Main.js';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

function App() {
  const [isAuth, setIsAuth] = useState(cookies.get('auth-token'));

  if (!isAuth) {
    return (
      <Home setIsAuth={setIsAuth}/>
    );
  };

  return (
    <HashRouter>
      <Routes>
        <Route path='/' element={<Main setIsAuth={setIsAuth}/>}/>
      </Routes>
    </HashRouter>
  );
}

export default App;
