import { useSelector } from "react-redux";
import { RootState } from "../../app/redux";
import { IoMdCart } from "react-icons/io";
import { useNavigate } from "react-router-dom";

export const CartProduct = () => {
  const navigate = useNavigate();
  const cartQuantity = useSelector(
    (state: RootState) => state.cart.items.reduce((total, item) => total + item.quantity, 0)
  );

  const handleNavigateToCart = () => {
    navigate('/cart');
  };

  return (
    <button
      onClick={handleNavigateToCart}
      className="relative flex items-center justify-center w-12 h-12 rounded-full bg-gray-800 hover:bg-blue-700 text-white"
    >
      <IoMdCart size={24} />
      {cartQuantity > 0 && (
        <span className="absolute -top-2 -right-2 flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-600 rounded-full">
          {cartQuantity}
        </span>
      )}
    </button>
  );
};