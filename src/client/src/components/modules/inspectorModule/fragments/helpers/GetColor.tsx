const GetColor = (index: number, type: string) => {
  const colors = ["#fff", "#FFDEAD", "#9ACD32", "#FF7F50", "#8B008B", "#000"];
  let color = colors[index];

  if (type === "text") {
    color = index === 4 ? colors[0] : colors[5];
  }

  return color;
};

export default GetColor;
