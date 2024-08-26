export const isValidURL = (url) => {
  try {
    new URL(url);
    return true;
  } catch (e) {
    return false;
  }
};
export const isValidTime = (timeString) => {
  const [hours, minutes] = timeString.split(":").map(Number);
  return hours >= 0 && hours < 24 && minutes >= 0 && minutes < 60;
};

export const isValidDate = (dateString) => {
  const date = new Date(dateString);
  return !isNaN(date.getTime());
};

export const formatDate = (date) => {
  try {
    const formatter = new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
      weekday: "short",
    });

    return formatter.format(new Date(date));
  } catch (_) {
    return null;
  }
};
