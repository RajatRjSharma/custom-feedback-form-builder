import { useState, useEffect } from "react";

/**
 * Custom hook to get date time change event every 10 secs.
 */
const useDateTime = () => {
  const [dateTime, setDateTime] = useState(new Date());

  useEffect(() => {
    const updateDateTime = () => {
      setDateTime(new Date());
    };

    const intervalId = setInterval(updateDateTime, 10000);

    return () => clearInterval(intervalId);
  }, []);

  return dateTime;
};

export default useDateTime;
