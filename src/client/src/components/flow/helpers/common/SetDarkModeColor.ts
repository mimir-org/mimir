import { Color } from "../../../../compLibrary";

const SetDarkModeColor = (active: boolean) => {
  let mainColor: string;
  let moduleColor: string;

  const root = document.getElementById("root");
  const explorer = document.getElementById("ExplorerModule");
  const library = document.getElementById("LibraryModule");
  const legend = document.getElementById("LegendModule");
  const inspector = document.getElementById("InspectorModule");
  const inspectorBody = document.getElementById("InspectorBody");

  if (active) {
    mainColor = "#888888";
    moduleColor = "#A8A8A8";
  } else {
    mainColor = Color.White;
    moduleColor = Color.LightGrey;
  }

  root.style.background = mainColor;
  explorer.style.background = moduleColor;
  library.style.background = moduleColor;
  legend.style.background = moduleColor;
  inspector.style.background = moduleColor;
  inspectorBody.style.background = moduleColor;
};

export default SetDarkModeColor;
