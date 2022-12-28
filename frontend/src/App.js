import './App.css';
import {BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductPage from './Components/ProductPage';
import ProductInTable from './Components/ProductInTable';
import EditProduct from './Components/EditProduct';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<ProductInTable/>}></Route>
          <Route path='/addProduct' element={<ProductPage/>}></Route>
          <Route path='/editProduct' element={<EditProduct/>}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
