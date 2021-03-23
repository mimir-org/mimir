const GetLabel = (type) => {
  if (type === "input") {
    return "Function";
  }

  return "Default";
};

export default GetLabel;
