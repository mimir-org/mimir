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
  const menuBar = document.getElementById("MenuBar");

  if (active) {
    mainColor = "#888888";
    moduleColor = "#A8A8A8";
  } else {
    mainColor = Color.White;
    moduleColor = Color.LightGrey;
  }

  if (root) root.style.background = mainColor;
  if (explorer) explorer.style.background = moduleColor;
  if (library) library.style.background = moduleColor;
  if (legend) legend.style.background = moduleColor;
  if (inspector) inspector.style.background = moduleColor;
  if (inspectorBody) inspectorBody.style.background = moduleColor;
  if (menuBar) menuBar.style.background = moduleColor;
};

export default SetDarkModeColor;
