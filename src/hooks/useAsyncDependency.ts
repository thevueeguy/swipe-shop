import * as React from "react";

export const useAsyncDependency = (
    callback: () => Promise<unknown>,
    deps: React.DependencyList
  ): boolean => {
    const [loading, setLoading] = React.useState(true);
    const isMounted = React.useRef(true);
  
    React.useEffect(() => {
      isMounted.current = true;
      setLoading(true);
  
      callback()
        .catch((error) => {
          if (isMounted.current) {
            console.error("Async error in useAsyncDependency:", error);
          }
        })
        .finally(() => {
          if (isMounted.current) {
            setLoading(false);
          }
        });
  
      return () => {
        isMounted.current = false;
      };
    }, deps);
  
    return loading;
  };