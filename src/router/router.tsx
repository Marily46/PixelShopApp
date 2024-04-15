import { createBrowserRouter } from "react-router-dom";
import Layout from "../app/layout";
import { NotFound, ProductDetails, ProductsByCategory } from "../components";
import PaymentForm from "../components/payment/PaymentForm";
import CartPage from "../pages/CartPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "category/:category",
        element: <ProductsByCategory />,
      },
    ],
  },
  {
    path: "/product/:productId",
    element: <ProductDetails />,
  },
  {
    path: "/PaymentForm",
    element: <PaymentForm />,
  },
  {
    path: "/cart",
    element: <CartPage />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);
