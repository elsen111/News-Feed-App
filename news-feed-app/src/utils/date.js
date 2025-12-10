import { parse, format } from "date-fns";

export const formattedDate = (date) => {
  const parsedDate = parse(date, "yyyy-MM-dd", new Date());
  const formattedDate = format(parsedDate, "dd MMM yyyy");
  return formattedDate;
};