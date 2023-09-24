import { Route, Routes } from "react-router-dom";
import Footer from "../components/Footer/Footer";
import ServicePage from "../pages/Service";
import SearchBooksPage from "../pages/SearchBooks";
import SingleShowBookPage from "../pages/SingleShowBook";
import HomePage from "../pages/Home";
import AboutPage from "../pages/About";
import ProductPage from "../pages/Product";
import ContactPage from "../pages/Contact";
import CartPage from "../pages/Cart";
import LoginPage from "../pages/Login";
import RegisterPage from "../pages/Register";
import HeaderPage from "../pages/Header";
import { useLoginContext } from "../context";

export const AppRoutes = () => {
  return (
    <div>
      <HeaderPage />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/product" element={<ProductPage />} />
        <Route path="/service" element={<ServicePage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/sign" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/searchbooks" element={<SearchBooksPage />} />
        <Route path="/singleshowbook" element={<SingleShowBookPage />} />
      </Routes>
      <Footer />
    </div>
  );
};
