import type { Product } from "src/types/product-card";

import * as React from "react";
import { Cart } from "src/pages/cart";
import { Login } from "src/pages/login";
import { Wishlist } from "src/pages/wishlist";
import { Curation } from "src/pages/curation";
import { Capacitor } from "@capacitor/core";
import { CardProvider } from "src/utils/card-context";
import { SplashScreen } from "src/pages/splash-screen";
import { Routes, Route } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { StatusBar, Style } from "@capacitor/status-bar";
import { useAsyncDependency } from "src/hooks/useAsyncDependency";
import { Keyboard, KeyboardResize } from "@capacitor/keyboard";

import PRODUCT_DATA from "src/database/products.json";

export const App = () => {
  const [cards, setCards] = React.useState<Array<Product>>([]);

  const isAssetLoading = useAsyncDependency(
    () =>
      new Promise((resolve) => {
        setTimeout(() => {
          setCards(PRODUCT_DATA);
          resolve(true);
        }, 1000);
      }),
    []
  );

  React.useEffect(() => {
    if (Capacitor.getPlatform() !== "web") {
      StatusBar.setStyle({ style: Style.Dark });
      StatusBar.setBackgroundColor({ color: "transparent" });
      StatusBar.hide();
      if (Capacitor.getPlatform() === "ios") {
        Keyboard.setResizeMode({ mode: KeyboardResize.None });
      }
    }
  }, []);

  return (
    <AnimatePresence mode="wait">
      {isAssetLoading ? (
        <SplashScreen key="splash" />
      ) : (
        <CardProvider initialCards={cards}>
          <Routes>
            <Route path="/" element={<Login key="login" />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/curation" element={<Curation key="curation" />} />
          </Routes>
        </CardProvider>
      )}
    </AnimatePresence>
  );
};
