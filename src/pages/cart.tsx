import * as React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { getPublicURL } from "src/utils/cross-platform";

export const Cart = (): React.ReactNode => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="flex flex-col items-center justify-center h-screen"
    >
      <motion.div
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.4 }}
        className="flex items-center space-x-2"
      >
        <img
          src={getPublicURL("logo.png")}
          alt="Strawberry"
          className="w-8 h-8 lg:w-12 lg:h-12"
        />
        <h1 className="text-xl sm:text-2xl lg:text-2xl font-bold text-red-400">
          Cart is coming soon
        </h1>
      </motion.div>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => navigate("/curation")}
        className="mt-4 px-4 sm:px-6 md:px-8 py-2 sm:py-3 text-sm sm:text-base md:text-lg bg-red-400 text-white rounded-xl shadow-md w-fit text-center"
      >
        Back to Products
      </motion.button>
    </motion.div>
  );
};
