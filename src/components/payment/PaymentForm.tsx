import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, clearCart } from "../../app/redux";
import { Link, useNavigate } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";
import { IoIosArrowBack } from "react-icons/io";

const PaymentForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cart = useSelector((state: RootState) => state.cart.items);
  const [payment, setPayment] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });
  const [Loading, setLoading] = useState(false);
  const [confirmation, setConfirmation] = useState(false);

  // simular el pago
  const handlePayment = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setConfirmation(true);
    }, 4000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPayment({ ...payment, [name]: value });
  };

  const handleSubmit = () => {
    if (
      !payment.name ||
      !payment.email ||
      !payment.address ||
      !payment.city ||
      !payment.postalCode ||
      !payment.country ||
      !payment.cardNumber ||
      !payment.expiryDate ||
      !payment.cvv
    ) {
      alert("Todos los campos deben ser diligenciados");
      return;
    }
    handlePayment();
  };

  if (Loading) {
    return (
      <div className="container mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg max-w-4xl text-center">
        <img
          src="https://media.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.gif"
          className="w-50 h-50 mx-auto"
        />
        <strong className="text-lg mt-4 bold">
          Por favor espere, su transacción está siendo procesada. No actualice
          la página.
        </strong>
      </div>
    );
  }

  if (confirmation) {
    const handleReturnShopping = () => {
      dispatch(clearCart());
      navigate("/");
    };

    return (
      <div className="container mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg max-w-4xl">
        <FaCheckCircle className="text-6xl text-green-500 mx-auto" />
        <strong className="text-2xl block text-center mt-4">
          {" "}
          Gracias. Se le enviará un mensaje de confirmación a su correo
          electrónico.
        </strong>
        <Link
          to="/"
          className="block text-center mt-6 text-blue-500"
          onClick={handleReturnShopping}
        >
          Seguir Comprando
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg max-w-4xl flex">
      <IoIosArrowBack
        className="text-2xl text-gray-500"
        onClick={() => navigate("/cart")}
      />
      <div className="w-3/5 p-5">
        <h2 className="text-xl font-semibold mb-5">Personal Information</h2>
        {/* Formulario de información personal */}
        <div className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            className="w-full py-3 px-4 border rounded"
            onChange={handleChange}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full py-3 px-4 border rounded"
            onChange={handleChange}
          />
          <input
            type="text"
            name="address"
            placeholder="Address"
            className="w-full py-3 px-4 border rounded"
            onChange={handleChange}
          />
          <input
            type="text"
            name="city"
            placeholder="City"
            className="w-full py-3 px-4 border rounded"
            onChange={handleChange}
          />
          <input
            type="text"
            name="postalCode"
            placeholder="Postal Code"
            className="w-full py-3 px-4 border rounded"
            onChange={handleChange}
          />
          <input
            type="text"
            name="country"
            placeholder="Country"
            className="w-full py-3 px-4 border rounded"
            onChange={handleChange}
          />
        </div>
        <h2 className="text-xl font-semibold mt-6 mb-5">Card Information</h2>
        {/* Formulario información de pago */}
        <div className="space-y-4">
          <input
            type="number"
            name="cardNumber"
            placeholder="Card Number"
            className="w-full py-3 px-4 border rounded"
            onChange={handleChange}
          />
          <div className="flex justify-between space-x-4">
            <input
              type="number"
              name="expiryDate"
              placeholder="MM/YY"
              className="w-full py-3 px-4 border rounded"
              onChange={handleChange}
            />
            <input
              type="number"
              name="cvv"
              placeholder="CVV"
              className="w-full py-3 px-4 border rounded"
              onChange={handleChange}
            />
          </div>
          <div className="mt-6">
            <button
              className="bg-gray-800 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded w-full"
              onClick={handleSubmit}
            >
              Pagar $
              {cart
                .reduce(
                  (total, item) => total + item.product.price * item.quantity,
                  0
                )
                .toFixed(2)}
            </button>
          </div>
        </div>
      </div>
      <div className="w-1/3 bg-white p-4 ml-6 max-h-[500px] overflow-y-auto">
        <h2 className="text-xl font-bold mb-4 sticky top-0 bg-white z-10 p-4">
          Resumen de compra
        </h2>
        <div className="divide-y divide-gray-200">
          {cart.map((item) => (
            <div key={item.product.id} className="flex mb-4">
              <img
                src={item.product.image}
                alt={item.product.title}
                className="w-20 h-20 object-cover rounded mr-4"
              />
              <div className="flex flex-col justify-between">
                <span className="font-semibold">{item.product.title}</span>
                <span className="text-sm">Cantidad: {item.quantity}</span>
                <span className="text-sm">
                  Precio: ${item.product.price.toFixed(2)}
                </span>
              </div>
            </div>
          ))}
        </div>
        <div className="p-4 bg-white shadow-md sticky bottom-0 z-20">
          <div className="flex justify-between items-center">
            <span>Total de Productos:</span>
            <span>
              {cart.reduce((total, item) => total + item.quantity, 0)}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span>Envío:</span>
            <span>Gratis</span>
          </div>
          <div className="flex justify-between items-center font-bold">
            <span>Total:</span>
            <span>
              $
              {cart
                .reduce(
                  (total, item) => total + item.product.price * item.quantity,
                  0
                )
                .toFixed(2)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentForm;
