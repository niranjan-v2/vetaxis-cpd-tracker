import { createRoot } from "react-dom/client";
import { HeroUIProvider } from "@heroui/react";
import "./index.css";
import App from "./App.jsx";
import { store } from "./redux/store.js";
import { Provider } from 'react-redux'

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <HeroUIProvider>
      <App />
    </HeroUIProvider>
  </Provider>,
);
