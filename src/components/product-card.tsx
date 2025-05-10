import type { Product } from "src/types/product-card";
import { motion } from "framer-motion";
import { Card } from "src/components/card";

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const {
    id,
    name,
    brand,
    price,
    imageUrl,
    originalPrice,
    discountPercentage,
  } = product;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 30 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="w-full h-full max-w-[500px] mx-auto p-4 cursor-pointer"
      data-test-id={id}
    >
      <Card className="overflow-hidden hover:shadow-2xl transition-shadow duration-300 w-full h-full bg-white">
        <div className="relative w-[95%] h-[75%] m-auto">
          <img
            src={imageUrl}
            alt={name}
            draggable="false"
            className="w-full h-full object-cover rounded-2xl"
          />
          {Boolean(discountPercentage) && (
            <div className="absolute top-3 right-3 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
              {discountPercentage}% OFF
            </div>
          )}
        </div>
        <div className="p-4">
          <h2 className="text-lg md:text-xl font-semibold text-gray-800 mb-1 capitalize">
            {name}
          </h2>
          <p className="text-sm md:text-base text-gray-500 mb-1">{brand}</p>
          <div className="flex items-center space-x-2">
            <span className="text-xl font-bold text-gray-800">₹{price}</span>
            <span className="text-sm line-through text-gray-400">
              ₹{originalPrice}
            </span>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};
