import * as React from "react";

interface WindowSize {
  width?: number;
  height?: number;
}

export const useWindowSize = (): WindowSize => {
  const [windowSize, setWindowSize] = React.useState<WindowSize>({
    width: undefined,
    height: undefined,
  });

  const handleResize = React.useCallback(() => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  }, []);

  React.useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [handleResize]);

  React.useEffect(() => handleResize(), [])

  return windowSize;
};
