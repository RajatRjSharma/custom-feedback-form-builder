import { useState, useEffect } from "react";

const useDateTime = () => {
  const [dateTime, setDateTime] = useState(new Date());

  useEffect(() => {
    // Function to update the current date and time
    const updateDateTime = () => {
      setDateTime(new Date());
    };

    // Update date and time every half minute
    const intervalId = setInterval(updateDateTime, 30000);

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  return dateTime;
};

export default useDateTime;
