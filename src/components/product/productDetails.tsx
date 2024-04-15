import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Product } from "../../types";
import { getProductById } from "../../services";
import { useDispatch } from "react-redux";
import { addToCart } from "../../app/redux";

export const ProductDetails = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { productId } = useParams();
  const [product, setProduct] = useState<Product | null>(null);

  const handleAddToCart = (product: Product) => {
    dispatch(
      addToCart({
        id: product.id,
        title: product.title,
        image: product.image,
        price: product.price,
      })
    );
    navigate("/cart");
  };

  useEffect(() => {
    if (productId) {
      getProductById(productId).then((product) => setProduct(product));
    }
  }, [productId]);

  return (
    <div className="container mx-auto my-8 p-4">
      {product ? (
        <div className="flex flex-col md:flex-row items-center md:items-start md:space-x-8">
          <img
            src={product.image}
            alt={product.title}
            className="w-full md:w-1/2 lg:w-1/3 h-auto object-contain bg-white p-4 border border-gray-200 rounded shadow"
          />
          <div className="mt-4 md:mt-0">
            <h1 className="text-2xl font-bold text-gray-800">
              {product.title}
            </h1>
            <p className="text-gray-600 mt-2">{product.description}</p>
            <strong className="text-lg text-gray-900 mt-2">
              ${product.price}
            </strong>
            <div className="flex items-center mt-2">
              <span className="text-gray-700 mr-1">Rating:</span>
              <span className="text-yellow-400">{product.rating.rate}</span>
              <span className="text-gray-500 ml-1">
                ({product.rating.count} reviews)
              </span>
            </div>
            <span className="block mt-2 text-gray-500">
              {product.rating.count > 10 ? "In Stock" : "Out of Stock"}
            </span>
            <button
              className="bg-gray-800 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
              onClick={() => handleAddToCart(product)}
            >
              Add to Cart
            </button>
          </div>
        </div>
      ) : (
        <p className="text-center text-gray-500">Loading product details...</p>
      )}
    </div>
  );
};
export default ProductDetails;
