import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../index.css';
import { getCategories, getProductsByCategory } from '../services/index';
import { ListOfCategories, Products, FilteredProducts } from '../components';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProductsByCategory, selectFilteredProducts } from './redux/productsSlice';

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
    if (category) {
      dispatch(fetchProductsByCategory(category) as any);
    }
  }, [category, dispatch]);

  const onCategorySelected = (category: string) => {
    navigate(`/category/${category}`);
  };

  return (
    <div className="container m-auto grid min-h-screen grid-rows-[auto,1fr,auto] px-4">
      <header className="text-xl font-bold leading-[3rem]">Categories</header>
      <div className="grid grid-cols-[300px_1fr] gap-10">
        <aside>
          <ListOfCategories categories={categories} onCategorySelected={onCategorySelected} />
          <FilteredProducts />
        </aside>
        <main>
          <h1 className="text-xl font-bold leading-[3rem]">Products</h1>
          
          <Products products={filteredProducts} />
        </main>
      </div>
      <footer className="text-center leading-[3rem] opacity-70">
        Δ Pixel Shop App
      </footer>
    </div>
  );
};

export default Layout;