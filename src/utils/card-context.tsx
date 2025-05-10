import type { Product } from "src/types/product-card";
import * as React from "react";

interface CardContextType {
  products: Array<Product>;
  swipedTop: Array<Product>;
  swipedLeft: Array<Product>;
  swipedRight: Array<Product>;
  onSwipeTop: (id: number) => void;
  onSwipeLeft: (id: number) => void;
  onSwipeRight: (id: number) => void;
  setProducts: React.Dispatch<React.SetStateAction<Array<Product>>>;
}

interface CardProviderProps {
  children: React.ReactNode;
  initialCards: Array<Product>;
}

const CardContext = React.createContext<CardContextType | null>(null);

export const CardProvider = ({ children, initialCards }: CardProviderProps) => {
  const [products, setProducts] = React.useState<Array<Product>>(initialCards);
  const [swipedTop, setSwipedTop] = React.useState<Array<Product>>([]);
  const [swipedLeft, setSwipedLeft] = React.useState<Array<Product>>([]);
  const [swipedRight, setSwipedRight] = React.useState<Array<Product>>([]);

  const filterProduct = (id: number) => {
    setProducts((prev) => prev.filter((product) => product.id !== id));
  };

  const onSwipeTop = (id: number) => {
    filterProduct(id);
    setSwipedTop((prev) => {
      const swipedProduct = products.find((product) => product.id === id);
      return swipedProduct ? [...prev, swipedProduct] : prev;
    });
  };

  const onSwipeLeft = (id: number) => {
    filterProduct(id);
    setSwipedLeft((prev) => {
      const swipedProduct = products.find((product) => product.id === id);
      return swipedProduct ? [...prev, swipedProduct] : prev;
    });
  };

  const onSwipeRight = (id: number) => {
    filterProduct(id);
    setSwipedRight((prev) => {
      const swipedProduct = products.find((product) => product.id === id);
      return swipedProduct ? [...prev, swipedProduct] : prev;
    });
  };

  return (
    <CardContext.Provider
      value={{
        products,
        swipedTop,
        swipedLeft,
        swipedRight,
        setProducts,
        onSwipeTop,
        onSwipeLeft,
        onSwipeRight,
      }}
    >
      {children}
    </CardContext.Provider>
  );
};

export const useCardContext = () => {
  const context = React.useContext(CardContext);
  if (!context) {
    throw new Error("useCardContext must be used within a CardProvider");
  }
  return context;
};
