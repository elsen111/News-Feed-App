import { format, isValid } from "date-fns";

export const formattedDate = (dateStr) => {
  const parsedDate = new Date(dateStr);

  if (!isValid(parsedDate)) {
    return dateStr;
  }

  return format(parsedDate, "dd MMM yyyy HH:mm:ss");
};
