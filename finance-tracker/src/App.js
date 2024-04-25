import Home from './pages/home/index.js';
import './App.css';
import { HashRouter, Route, Routes } from 'react-router-dom';
import Cookies from 'universal-cookie';
import { useState } from 'react';
import Main from './pages/main/index.js';

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
