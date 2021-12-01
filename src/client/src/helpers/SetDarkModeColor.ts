import { Color } from "../compLibrary/colors";

const SetDarkModeColor = (dark: boolean) => {
  let mainColor: string;
  let moduleColor: string;

  const root = document.getElementById("root");
  const menuBar = document.getElementById("ToolBar");
  const explorer = document.getElementById("ExplorerModule");
  const library = document.getElementById("LibraryModule");
  const legend = document.getElementById("LegendModule");
  const inspector = document.getElementById("InspectorModule");
  const inspectorBody = document.getElementById("InspectorBody");

  if (dark) {
    mainColor = Color.DarkModeMain;
    moduleColor = Color.DarkModeModule;
  } else {
    mainColor = Color.White;
    moduleColor = Color.GreyLighter;
  }

  if (root) root.style.background = mainColor;
  if (explorer) explorer.style.background = moduleColor;
  if (library) library.style.background = moduleColor;
  if (legend) legend.style.background = moduleColor;
  if (inspector) inspector.style.background = moduleColor;
  if (inspectorBody) inspectorBody.style.background = moduleColor;
  if (menuBar) menuBar.style.background = mainColor;
};

export default SetDarkModeColor;
