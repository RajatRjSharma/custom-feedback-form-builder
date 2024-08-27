import { useState, useEffect } from "react";

const useLocationChange = () => {
  // Initialize state with the current URL information
  const [location, setLocation] = useState({
    href: window.location.href,
    protocol: window.location.protocol,
    host: window.location.host,
    pathname: window.location.pathname,
    search: window.location.search,
    hash: window.location.hash,
  });

  useEffect(() => {
    // Handler to update state on URL change
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

    // Add event listener for popstate (browser navigation)
    window.addEventListener("popstate", handleLocationChange);

    // Add event listener for pushState and replaceState (programmatic navigation)
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

    // Cleanup event listeners on unmount
    return () => {
      window.removeEventListener("popstate", handleLocationChange);
      window.history.pushState = originalPushState;
      window.history.replaceState = originalReplaceState;
    };
  }, []);

  return location;
};

export default useLocationChange;
