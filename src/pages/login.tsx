import * as React from "react";
import { Card } from "src/components/card";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { getPublicURL } from "src/utils/cross-platform";
import { useAsyncAction } from "src/hooks/useAsyncAction";

const imageUrls = [
  "images/1.jpeg",
  "images/2.jpeg",
  "images/3.jpeg",
  "images/4.jpeg",
  "images/5.jpeg",
  "images/6.jpeg",
  "images/7.jpeg",
  "images/8.jpeg",
];

export const Login = (): React.ReactNode => {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const fashionImages = [...imageUrls, ...imageUrls, ...imageUrls];

  const { isLoading, act: onSubmit } = useAsyncAction(async () => {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    navigate("/curation");
  });

  return (
    <div className="min-h-screen relative overflow-hidden w-full">
      <motion.div
        className="absolute inset-0 z-0 overflow-hidden"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 0.2, y: 0 }}
        exit={{ opacity: 0, y: -50 }}
        transition={{ duration: 0.6 }}
      >
        <motion.div
          className="grid grid-cols-2 lg:grid-cols-3 gap-5"
          animate={{ y: "-100%" }}
          transition={{
            duration: 60,
            ease: "linear",
            repeat: Infinity,
          }}
        >
          {fashionImages.map((image, index) => (
            <div
              key={index}
              className={`aspect-[3/4] overflow-hidden mb-3 ${
                index % 2 === 0 ? "mt-14" : ""
              }`}
            >
              <img
                src={getPublicURL(image)}
                alt={`Fashion ${index + 1}`}
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
          ))}
        </motion.div>
      </motion.div>
      <div className="flex items-center justify-center min-h-screen w-full">
        <Card className="relative bg-red-50 mx-5 lg:mx-0">
          <div className="flex flex-col items-center h-fit w-xs sm:w-sm md:w-md min-w-52 space-y-1">
            <div className="flex items-center text-4xl font-bold">
              <img
                src={getPublicURL("logo.png")}
                alt="Strawberry"
                className="w-8 h-8 lg:w-16 lg:h-16"
              />
              <h1 className="text-xl sm:text-2xl lg:text-4xl font-bold text-red-400">
                SwipeShop
              </h1>
            </div>

            {isLoading ? (
              <motion.div
                key="spinner"
                className="flex items-center justify-center my-5"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <div className="h-8 w-8 lg:h-12 lg:w-12 animate-spin rounded-full border-4 border-gray-300 border-t-red-200" />
              </motion.div>
            ) : (
              <motion.form
                key="form"
                onSubmit={handleSubmit(onSubmit)}
                className="p-5 rounded-3xl shadow-xl w-full max-w-md space-y-6"
                exit={{ opacity: 0, scale: 0.95 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <div className="space-y-1">
                  <label className="block text-sm md:text-md md:text-md font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    type="email"
                    {...register("email", { required: "Email is required" })}
                    className="w-full px-4 py-2 text-base rounded-xl border border-gray-300 shadow-sm bg-white focus:outline-none focus:ring-2 focus:ring-red-300 focus:border-transparent transition duration-200"
                    placeholder="you@example.com"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-sm md:text-md md:text-md font-medium text-gray-700">
                    Password
                  </label>
                  <input
                    type="password"
                    {...register("password", {
                      required: "Password is required",
                    })}
                    className="w-full px-4 py-2 text-base rounded-xl border border-gray-300 shadow-sm bg-white focus:outline-none focus:ring-2 focus:ring-red-300 focus:border-transparent transition duration-200"
                    placeholder="••••••••"
                  />
                </div>

                <motion.button
                  whileTap={{ scale: 0.95 }}
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  type="submit"
                  className="cursor-pointer w-full py-2 bg-red-400 hover:bg-red-500 text-white font-semibold rounded-xl shadow-md"
                >
                  Submit
                </motion.button>

                <div className="text-center text-sm text-gray-600 space-y-1">
                  <button
                    type="button"
                    onClick={() => {}}
                    className="text-red-400 hover:underline focus:outline-none cursor-pointer"
                  >
                    Forgot Password?
                  </button>
                </div>
              </motion.form>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};
