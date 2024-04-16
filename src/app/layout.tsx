import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "../index.css";
import { getCategories } from "../services/index";
import {
  ListOfCategories,
  Products,
  FilteredProducts,
  CartProduct,
} from "../components";
import { useSelector, useDispatch } from "react-redux";
import {
  clearFilters,
  fetchAllProducts,
  fetchProductsByCategory,
  selectFilteredProducts,
} from "./redux/productsSlice";
import { MdClear } from "react-icons/md";

const Layout = () => {
  const [categories, setCategories] = useState<string[]>([]);
  const { category } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const filteredProducts = useSelector(selectFilteredProducts);

  // Fetch categories
  useEffect(() => {
    getCategories().then(setCategories);
  }, []);

  // Fetch products by category or all products
  useEffect(() => {
    if (!category) {
      dispatch(fetchAllProducts() as any);
    } else {
      dispatch(fetchProductsByCategory(category) as any);
    }
  }, [category, dispatch]);

  // Clear filters
  const handleClearFilters = () => {
    dispatch(clearFilters() as any);
    navigate("/home");
  };

  // Handle category selected 
  const onCategorySelected = (category: string) => {
    navigate(`/home/category/${category}`);
  };

  return (
    <div className="flex flex-col h-screen">
      <nav className="bg-gray-800 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <Link to="/home" className="text-2xl font-bold">
            Pixel Shop
          </Link>
          <CartProduct />
        </div>
      </nav>
      <main className="flex-grow container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <aside className="md:col-span-1">
            <ListOfCategories
              categories={categories}
              onCategorySelected={onCategorySelected}
            />
            <FilteredProducts />
            <div className="flex justify-center">
              <button
                onClick={handleClearFilters}
                className="flex items-center justify-center px-4 py-2 mt-4 border border-gray-300 text-gray-500 rounded-full hover:bg-gray-100 focus:outline-none focus:ring focus:border-gray-300 cursor-pointer"
              >
                <MdClear className="mr-2" />
                Limpiar filtros
              </button>
            </div>
          </aside>
          <section className="md:col-span-2 lg:col-span-3">
            <div className="mb-6">
              <div className="flex justify-between items-end">
                <h2 className="text-2xl font-bold">
                  {category
                    ? `Productos de ${category}`
                    : "Todos los productos"}
                </h2>
              </div>
              <hr className="my-4" />
            </div>
            <Products products={filteredProducts} />
          </section>
        </div>
      </main>
      <footer className="bg-gray-100 text-center py-4 opacity-70">
        Δ Pixel Shop App
      </footer>
    </div>
  );
};

export default Layout;
