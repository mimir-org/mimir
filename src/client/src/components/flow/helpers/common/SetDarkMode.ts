const SetDarkMode = () => {
  const mainColor = "#888888";
  const moduleColor = "#A8A8A8";
  //   const menuColor = "#D8D8D8";

  const root = document.getElementById("root");
  const explorer = document.getElementById("Explorer");
  const library = document.getElementById("Library");
  const legend = document.getElementById("Legend");
  const inspector = document.getElementById("Inspector");
  const inspectorBody = document.getElementById("InspectorBody");

  root.style.background = mainColor;
  explorer.style.background = moduleColor;
  library.style.background = moduleColor;
  legend.style.background = moduleColor;
  inspector.style.background = moduleColor;
  inspectorBody.style.background = moduleColor;
};

export default SetDarkMode;
