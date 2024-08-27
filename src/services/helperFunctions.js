export const isValidURL = (url) => {
  try {
    new URL(url);
    return true;
  } catch {
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
      hour12: true,
    });

    return formatter.format(new Date(date));
  } catch {
    return null;
  }
};

export const normalizeDate = (date) => {
  const d = date ? new Date(date) : new Date();
  if (isNaN(d.getTime())) {
    throw new Error("Invalid date");
  }
  console.log(d.toUTCString(), d.toISOString());
  return d.toISOString().split("T")[0]; // YYYY-MM-DD
};

export const isDateEqualWithCurrentDate = (date1) => {
  try {
    const normalizedDate1 = normalizeDate(date1);
    const normalizedDate2 = normalizeDate();

    if (normalizedDate1 === normalizedDate2) {
      return true;
    }
    return false;
  } catch {
    return false;
  }
};

export const normalizeTime = (time) => {
  const d = time ? new Date(`1970-01-01T${time}Z`) : new Date();
  if (isNaN(d.getTime())) {
    throw new Error("Invalid time");
  }
  console.log(d.toUTCString(), d.toISOString());
  return d.toISOString().split("T")[1].slice(0, 5); // HH:MM
};

export const isTimeEqualToCurrentTime = (time1) => {
  try {
    const normalizedTime1 = normalizeTime(time1);
    const normalizedTime2 = normalizeTime();

    if (normalizedTime1 === normalizedTime2) {
      return true;
    }
    return false;
  } catch {
    return false;
  }
};
