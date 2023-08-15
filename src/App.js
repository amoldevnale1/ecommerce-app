import { useEffect, useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import ProductList from "./components/ProductList";
import Spinner from "react-bootstrap/Spinner";
import { useSelector } from "react-redux";
import ProductDetails from "./components/ProductDetails";
import SomethingWrong from "./components/SomethingWrong";
import CartDetails from "./components/CartDetails";
import { ToastContainer } from "react-toastify";

function App() {
  const [loader, setLoader] = useState(false);
  const getLoaderValue = useSelector((store) => store.reducer.loader);

  useEffect(() => {
    setLoader(getLoaderValue);
  }, [getLoaderValue]);

  return (
    <div className={loader ? "overlay" : ""}>
      {loader ? (
        <Spinner
          className="loading"
          animation="border"
          variant="primary"
          role="status"
        ></Spinner>
      ) : (
        ""
      )}
      <div className={loader ? "app-content" : ""}>
        <ToastContainer theme="colored" />
        <Header />
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route
            path="/productDetails/:productId"
            element={<ProductDetails />}
          />
          <Route path="cartDetails" element={<CartDetails />}></Route>
          <Route path="*" element={<SomethingWrong />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
