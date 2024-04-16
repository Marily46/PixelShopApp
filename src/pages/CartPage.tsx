import { useDispatch, useSelector } from "react-redux";
import { RootState, removeFromCart, updateQuantity } from "../app/redux";
import { useNavigate } from "react-router-dom";
import { BsBagPlus } from "react-icons/bs";

export const CartPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cart = useSelector((state: RootState) => state.cart);

  const handleRemove = (productId: string) => {
    dispatch(removeFromCart({ productId }));
  };

  const handleIncrement = (productId: string, quantity: number) => {
    dispatch(updateQuantity({ productId, quantity: quantity + 1 }));
  };

  const handleDecrement = (productId: string, quantity: number) => {
    if (quantity > 1) {
      dispatch(updateQuantity({ productId, quantity: quantity - 1 }));
    }
  };

  const handleToCheckout = () => {
    navigate("/PaymentForm");
  };

  const handleContinueShopping = () => {
    navigate("/home");
  };

  if (cart.items.length === 0) {
    return (
      <div className="container mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg max-w-4xl text-center">
        <h1 className="text-2xl font-bold mb-6">Tu Carrito</h1>
        <BsBagPlus className="text-8xl text-gray-400 mx-auto" />
        <p className="text-lg mt-4">
          <strong>¡Empieza un carrito de compras!</strong>
        </p>
        <button
          className="bg-gray-800 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
          onClick={handleContinueShopping}
        >
          Descubrir productos
        </button>
      </div>
    );
  }

  return (
    <>
      <div className="container mx-auto mt-10 p-6 bg-white rounded shadow-md flex flex-col lg:flex-row">
        {/* Sección Productos */}
        <div className="flex-1 divide-y divide-gray-200">
          <h1 className="text-2xl font-bold mb-4">Tu Carrito</h1>
          {cart.items.map((item) => (
            <div
              key={item.product.id}
              className="py-4 flex items-center justify-between"
            >
              <img
                src={item.product.image}
                alt={item.product.title}
                className="w-16 h-16 object-cover rounded mr-4"
              />
              <div className="flex-grow">
                <h2 className="text-lg font-bold">{item.product.title}</h2>
                <p className="text-sm">
                  Precio: ${item.product.price.toFixed(2)}
                </p>
              </div>
              <div className="flex items-center">
                <button
                  className="text-lg px-2 py-1 border rounded"
                  onClick={() =>
                    handleDecrement(item.product.id, item.quantity)
                  }
                >
                  -
                </button>
                <span className="px-2">{item.quantity}</span>
                <button
                  className="text-lg px-2 py-1 border rounded"
                  onClick={() =>
                    handleIncrement(item.product.id, item.quantity)
                  }
                >
                  +
                </button>
              </div>
              <div>
                <button
                  className="text-red-500 text-sm"
                  onClick={() => handleRemove(item.product.id)}
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))}
          <div className="py-4">
            <button
              onClick={handleContinueShopping}
              className="mt-4 bg-gray-800 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded w-full lg:w-auto"
            >
              <span className="inline-block mr-2">🛒</span>
              Seguir Comprando
            </button>
          </div>
        </div>
        {/* Resumen carrito */}
        <div className="w-full lg:w-1/4 bg-gray-100 p-4 ml-0 lg:ml-6 mt-6 lg:mt-0">
          <h2 className="text-xl font-bold mb-4">Resumen de compra</h2>
          <div className="mb-4">
            <span>Total de Productos:</span>
            <span className="float-right">
              {cart.items.reduce((total, item) => total + item.quantity, 0)}
            </span>
          </div>
          <div className="mb-4">
            <span>Envío:</span>
            <span className="float-right">Gratis</span>
          </div>
          <div className="mb-4">
            <strong>Total:</strong>
            <strong className="float-right">
              $
              {cart.items
                .reduce(
                  (total, item) => total + item.product.price * item.quantity,
                  0
                )
                .toFixed(2)}
            </strong>
          </div>
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded w-full transition duration-300 ease-in-out"
            onClick={handleToCheckout}
          >
            Continuar Compra
          </button>
        </div>
      </div>
    </>
  );
};

export default CartPage;
