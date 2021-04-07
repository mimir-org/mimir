const GetAspectHeader = (name: string) => {
  if (name === "Function") return "function_header";
  if (name === "Product") return "product_header";
  if (name === "Location") return "location_header";
  return null;
};

export default GetAspectHeader;
