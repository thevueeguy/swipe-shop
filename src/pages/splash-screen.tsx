import * as React from "react";
import { motion } from "framer-motion";
import { getPublicURL } from "src/utils/cross-platform";

const NAME = "swipeshop";

export const SplashScreen = (): React.ReactNode => {
  return (
    <motion.div
      className="flex items-center justify-center h-screen"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: -100, opacity: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 10 }}
        className="text-4xl font-bold"
      >
        <img src={getPublicURL("logo.png")} alt="Strawberry Logo" className="w-16 h-16" />
      </motion.div>

      <div className="flex text-5xl font-bold text-red-400">
        {NAME.split("").map((char, index) => (
          <motion.span
            key={index}
            initial={{ y: 20, opacity: 0, scale: 0.5 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            transition={{
              delay: 0.3 + index * 0.1,
              type: "spring",
              stiffness: 300,
              damping: 15,
            }}
          >
            {char}
          </motion.span>
        ))}
      </div>
    </motion.div>
  );
};
