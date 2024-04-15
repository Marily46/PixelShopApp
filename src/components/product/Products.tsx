import { Link } from "react-router-dom";
import { Product } from "../../types/index";
import { useDispatch } from "react-redux";
import { addToCart } from "../../app/redux/cartSlice";
import { MdAddShoppingCart, MdVisibility } from "react-icons/md";

export function Products({ products }: { products: Product[] }) {
  const dispatch = useDispatch();

  const handleAddToCart = (product: Product) => {
    dispatch(
      addToCart({
        id: product.id,
        title: product.title,
        image: product.image,
        price: product.price,
      })
    );
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => (
        <div
          key={product.id}
          className="flex flex-col border shadow hover:shadow-lg transition-shadow duration-300"
        >
          <Link to={`/product/${product.id}`}>
            <span className="sr-only">{product.title}</span>
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-64 object-contain cursor-pointer"
            />
          </Link>
          <div className="p-4 flex-grow">
            <p className="text-lg font-bold">{product.title}</p>
            <p className="text-gray-700 mt-2">${product.price.toFixed(2)}</p>
          </div>
          <div className="mt-auto flex justify-between items-center p-4 bg-white">
            <button
              onClick={() => handleAddToCart(product)}
              className="bg-gray-800 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              <MdAddShoppingCart className="inline-block text-xl" />
            </button>
            <Link
              to={`/product/${product.id}`}
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded"
            >
              <MdVisibility className="inline-block text-xl" />
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Products;
