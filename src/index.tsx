import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import PixelShopApp from "./PixelShopApp";
import { store } from "./app/redux/store";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PixelShopApp />
    </Provider>
  </React.StrictMode>
);
