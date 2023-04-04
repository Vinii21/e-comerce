import {HashRouter,Routes,Route} from 'react-router-dom'
import './App.css'
import Navbar from './components/NavBar';
import Home from './pages/Home';
import ProductDetail from "./pages/ProductDetail"
import Login from "./pages/Login"
import Pursheices from './pages/Pursheices';
import Loader from "./components/Loader"
import { useState } from 'react';
import { useSelector } from 'react-redux';

function App() {
  const isLoading = useSelector(state => state.isLoading)

  return (
    <HashRouter>
      {
        isLoading && <Loader />
      }
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/pursheices" element={<Pursheices />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
