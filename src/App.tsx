import { Routes, Route } from "react-router";
import { Toaster } from "sonner";
import Home from "@/pages/Home";
import FactoriesPage from "@/pages/FactoriesPage";
import FactoryDetail from "@/pages/FactoryDetail";
import ProductsPage from "@/pages/ProductsPage";
import ProductDetail from "@/pages/ProductDetail";
import CategoriesPage from "@/pages/CategoriesPage";
import SearchResults from "@/pages/SearchResults";
import MapPage from "@/pages/MapPage";
import AboutPage from "@/pages/AboutPage";
import NewsPage from "@/pages/NewsPage";
import ContactPage from "@/pages/ContactPage";
import JobsPage from "@/pages/JobsPage";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import AdminPage from "@/pages/AdminPage";
import FactoryDashboard from "@/pages/FactoryDashboard";
import ExhibitionPage from "@/pages/ExhibitionPage";
import NotFound from "@/pages/NotFound";

export default function App() {
  return (
    <>
      <Toaster position="top-center" richColors />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/factories" element={<FactoriesPage />} />
        <Route path="/factories/:id" element={<FactoryDetail />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="/categories" element={<CategoriesPage />} />
        <Route path="/search" element={<SearchResults />} />
        <Route path="/map" element={<MapPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/about/news" element={<NewsPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/jobs" element={<JobsPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/factory-dashboard" element={<FactoryDashboard />} />
        <Route path="/exhibition" element={<ExhibitionPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}
