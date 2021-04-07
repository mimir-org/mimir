const GetCheckboxColor = (aspect: string) => {
  if (aspect === "Function") return "function_underline";
  if (aspect === "Product") return "product_underline";
  if (aspect === "Location") return "location_underline";
  return null;
};
export default GetCheckboxColor;
