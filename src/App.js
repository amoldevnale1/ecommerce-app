import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Routes, Route} from "react-router-dom";
import Header from './components/Header';
import ProductList from './components/ProductList';

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<ProductList />} />
      </Routes>
    </>
  );
}

export default App;
