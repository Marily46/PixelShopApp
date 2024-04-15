import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../index.css';
import { getCategories } from '../services/index';
import { ListOfCategories, Products, FilteredProducts, CartProduct } from '../components';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAllProducts, fetchProductsByCategory, selectFilteredProducts } from './redux/productsSlice';

const Layout = () => {
  const [categories, setCategories] = useState<string[]>([]);
  const { category } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const filteredProducts = useSelector(selectFilteredProducts);

  useEffect(() => {
    getCategories().then(setCategories);
  }, []);

  useEffect(() => {
    if (!category) {
      dispatch(fetchAllProducts() as any);
    } else {
      dispatch(fetchProductsByCategory(category) as any);
    }
  }, [category, dispatch]);

  const onCategorySelected = (category: string) => {
    navigate(`/category/${category}`);
  };

  return (
    <div className="flex flex-col h-screen">
      <nav className="bg-gray-800 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Pixel Shop</h1>
          <CartProduct />
        </div>
      </nav>
      <main className="flex-grow container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <aside className="md:col-span-1">
            <ListOfCategories categories={categories} onCategorySelected={onCategorySelected} />
            <FilteredProducts />
          </aside>
          <section className="md:col-span-2 lg:col-span-3">
            <div className="mb-6">
            <div className="flex justify-between items-end">
              <h2 className="text-2xl font-bold">{category ? `Productos de ${category}` : 'Todos los productos'}</h2>  
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