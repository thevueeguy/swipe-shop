import * as React from "react";

export function useAsyncAction<A extends unknown[]>(
  action: (...args: A) => Promise<unknown>
): {
  isLoading: boolean;
  act: (...args: A) => Promise<void>;
} {
  const [isLoading, setIsLoading] = React.useState(false);

  return {
    isLoading,
    act: async (...args: A): Promise<void> => {
      if (!isLoading) {
        setIsLoading(true);
        try {
          await action(...args);
        } finally {
          setIsLoading(false);
        }
      }
    },
  };
}
