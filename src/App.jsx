import {HashRouter,Routes,Route} from 'react-router-dom'
import './App.css'
import Navbar from './components/NavBar';
import Home from './pages/Home';
import ProductDetail from "./pages/ProductDetail"
import Login from "./pages/Login"
import Purchases from './pages/Purchases';
import Loader from "./components/Loader"
import { useSelector } from 'react-redux';
import Footer from './components/Footer';
import ProtectedRoutes from './components/ProtectedRoutes';

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

            <Route element={<ProtectedRoutes />}>
              <Route path="/purchases" element={<Purchases />} />
            </Route>

          </Routes>
        <Footer />
    </HashRouter>
  );
}

export default App;
