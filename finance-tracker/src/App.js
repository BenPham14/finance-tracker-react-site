import Home from './pages/home/index.js';
import './App.css';
import { HashRouter, Route, Routes } from 'react-router-dom';
import Login from './pages/login/index.js';

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
      </Routes>
    </HashRouter>
  );
}

export default App;
