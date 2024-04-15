import { RouterProvider } from "react-router-dom";
import { router } from "./router/router";

export const PixelShopApp = () => {
  return <RouterProvider router={router} />;
};

export default PixelShopApp;
