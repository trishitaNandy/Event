
import './App.css';
import Register from './components/LoginSignup/Register';
import Login from './components/LoginSignup/Login';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home/Home';
import CreateEvent from './components/CreateEvent/CreateEvent';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Register/>}></Route>
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/home" element={<Home/>}></Route>
        <Route path="/create-event" element={<CreateEvent/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
