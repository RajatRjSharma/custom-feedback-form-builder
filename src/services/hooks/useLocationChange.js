import { useState, useEffect } from "react";

/**
 * Custom hook to get location details on each route change.
 */
const useLocationChange = () => {
  const [location, setLocation] = useState({
    href: window.location.href,
    protocol: window.location.protocol,
    host: window.location.host,
    pathname: window.location.pathname,
    search: window.location.search,
    hash: window.location.hash,
  });

  useEffect(() => {
    const handleLocationChange = () => {
      setLocation({
        href: window.location.href,
        protocol: window.location.protocol,
        host: window.location.host,
        pathname: window.location.pathname,
        search: window.location.search,
        hash: window.location.hash,
      });
    };

    window.addEventListener("popstate", handleLocationChange);

    const originalPushState = window.history.pushState;
    const originalReplaceState = window.history.replaceState;

    window.history.pushState = function (...args) {
      originalPushState.apply(this, args);
      handleLocationChange();
    };

    window.history.replaceState = function (...args) {
      originalReplaceState.apply(this, args);
      handleLocationChange();
    };

    return () => {
      window.removeEventListener("popstate", handleLocationChange);
      window.history.pushState = originalPushState;
      window.history.replaceState = originalReplaceState;
    };
  }, []);

  return location;
};

export default useLocationChange;
