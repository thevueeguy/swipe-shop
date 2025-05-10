import * as React from "react";
import { motion, useMotionValue, useAnimation } from "framer-motion";

interface SwipeCardProps {
  children: React.ReactNode;
  onSwipeTop?: () => void;
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
}

export const SwipeCard = ({
  children,
  onSwipeTop,
  onSwipeLeft,
  onSwipeRight,
}: SwipeCardProps): React.ReactNode => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const controls = useAnimation();

  const handleDragEnd = (
    _: unknown,
    info: {
      offset: { x: number; y: number };
      velocity: { x: number; y: number };
    }
  ) => {
    const { offset, velocity } = info;
    const swipePower = (offset: number, velocity: number) =>
      Math.abs(offset) * velocity;

    const xSwipe = swipePower(offset.x, velocity.x);
    const ySwipe = swipePower(offset.y, velocity.y);

    const threshold = 750;

    if (ySwipe < -threshold) {
      controls.start({ y: -1000, opacity: 0 });
      onSwipeTop?.();
    } else if (xSwipe > threshold) {
      controls.start({ x: 1000, opacity: 0 });
      onSwipeRight?.();
    } else if (xSwipe < -threshold) {
      controls.start({ x: -1000, opacity: 0 });
      onSwipeLeft?.();
    } else {
      controls.start({ x: 0, y: 0, rotate: 0 });
    }
  };

  React.useEffect(() => {
    controls.start({ opacity: 1 });
  }, [controls]);

  return (
    <motion.div
      drag
      style={{ x, y }}
      animate={controls}
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      dragElastic={0.3}
      onDragEnd={handleDragEnd}
      whileTap={{ scale: 1.05 }}
      className="w-full h-full"
    >
      {children}
    </motion.div>
  );
};
