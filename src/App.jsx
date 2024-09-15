import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavbarComponent from './components/Navbar';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import ForgetPassword from './components/ForgetPassword';
import ResetPassword from './components/ResetPassword';
import ActivateAccount from './components/ActivateAccount';
import Analytics from './components/Analytics';
import URLShortener from './components/URLShortener';

function App() {
  return (
    <Router>
      <NavbarComponent />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/forget-password" element={<ForgetPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/activate/:token" element={<ActivateAccount />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/shortener" element={<URLShortener />} />
      </Routes>
    </Router>
  );
}

export default App;
