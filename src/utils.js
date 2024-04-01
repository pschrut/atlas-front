export const convertToCurrency = (number) =>
  Number(number).toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

export const formatDate = (date) => {
  const options = {
    year: "numeric",
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  };
  return new Date(date).toLocaleDateString("en-US", options);
};
