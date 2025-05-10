import * as React from "react";
import { SwipeCard } from "src/components/swipe-card";
import { useNavigate } from "react-router-dom";
import { ProductCard } from "src/components/product-card";
import { getPublicURL } from "src/utils/cross-platform";
import { useCardContext } from "src/utils/card-context";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { ShoppingCart, Heart } from "lucide-react";

import PRODUCT_DATA from "src/database/products.json";

export const Curation = (): React.ReactNode => {
  const {
    products,
    swipedTop,
    swipedRight,
    onSwipeTop,
    setProducts,
    onSwipeLeft,
    onSwipeRight,
  } = useCardContext();

  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-40, 40]);
  const navigate = useNavigate();

  return (
    <div className="relative w-full h-screen flex flex-col">
      <motion.header
        initial={{ y: "-100%" }}
        animate={{ y: "0%" }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="mt-safe-top w-full flex items-center justify-between px-4 sm:px-8 py-4 bg-transparent z-10"
      >
        <div className="flex items-center text-4xl font-bold">
          <img
            src={getPublicURL("logo.png")}
            alt="Strawberry"
            className="w-8 h-8 lg:w-12 lg:h-12"
          />
          <h1 className="text-xl sm:text-2xl lg:text-2xl font-bold text-red-400">
            SwipeShop
          </h1>
        </div>
        <div className="flex items-center space-x-4">
          <div
            onClick={() => navigate("/wishlist")}
            className="relative cursor-pointer"
          >
            <Heart className="w-5 h-5 md:w-7 md:h-7 text-gray-700" />
            <span className="absolute -top-2 -right-2 text-xs bg-red-500 text-white rounded-full w-5 h-5 md:w-6 md:h-6 flex items-center justify-center">
              {swipedRight.length}
            </span>
          </div>
          <div
            onClick={() => navigate("/cart")}
            className="relative cursor-pointer"
          >
            <ShoppingCart className="w-5 h-5 md:w-7 md:h-7 text-gray-700" />
            <span className="absolute -top-2 -right-2 text-xs bg-red-500 text-white rounded-full w-5 h-5 md:w-6 md:h-6 flex items-center justify-center">
              {swipedTop.length}
            </span>
          </div>
        </div>
      </motion.header>

      <div className="flex-1 relative flex items-center justify-center">
        {products.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="flex flex-col items-center justify-center text-center space-y-4"
          >
            <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-red-400">
              You've gone through all the products!
            </h2>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setProducts(PRODUCT_DATA)}
              className="bg-red-400 text-white text-base sm:text-lg px-6 sm:px-8 py-2 sm:py-3 rounded-xl shadow-md"
            >
              Start Again
            </motion.button>
          </motion.div>
        ) : (
          products.map((card, index) => {
            const isTop = index === products.length - 1;
            const scale = 1 - (products.length - index - 1) * 0.05;

            return (
              <motion.div
                key={card.id}
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full"
                style={{
                  scale,
                  zIndex: index,
                  ...(isTop && { x, rotate }),
                }}
              >
                {isTop && (
                  <SwipeCard
                    key={card.id}
                    onSwipeTop={() => onSwipeTop(card.id)}
                    onSwipeLeft={() => onSwipeLeft(card.id)}
                    onSwipeRight={() => onSwipeRight(card.id)}
                  >
                    <ProductCard product={card} />
                  </SwipeCard>
                )}
              </motion.div>
            );
          })
        )}
      </div>
    </div>
  );
};
