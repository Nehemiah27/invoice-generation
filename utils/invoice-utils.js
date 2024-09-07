export const amountInINR = (number) => {
  return new Intl.NumberFormat("en-IN").format(number);
};

export const formatDate = (date) => {
  return date
    .toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    })
    .replace(/ /g, "-");
};
