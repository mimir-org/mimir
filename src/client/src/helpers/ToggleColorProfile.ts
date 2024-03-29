import { Color } from "../assets/color/Color";

/**
 * Component to toggle Mimir's color profile between light and dark.
 * Note: the dark color scheme is temporary, the UX-approved version is pending.
 * @param isDarkMode
 */
export const ToggleColorProfile = (isDarkMode: boolean) => {
  const root = document.getElementById("root");
  const menuBar = document.getElementById("ToolBar");
  const explorerTree = document.getElementById("ExplorerTreeModule");
  const explorerBlock = document.getElementById("ExplorerBlockModule");
  const library = document.getElementById("LibraryModule");
  const legend = document.getElementById("LegendModule");
  const inspector = document.getElementById("InspectorModule");
  const inspectorBody = document.getElementById("InspectorBody");

  const mainColor = isDarkMode ? Color.DARKMODE_MAIN : Color.WHITE;
  const moduleColor = isDarkMode ? Color.DARKMODE_MODULE : Color.GHOST_WHITE;

  if (root) root.style.background = mainColor;
  if (menuBar) menuBar.style.background = mainColor;

  if (explorerTree) explorerTree.style.background = moduleColor;
  if (explorerBlock) explorerBlock.style.background = moduleColor;
  if (library) library.style.background = moduleColor;
  if (legend) legend.style.background = moduleColor;
  if (inspector) inspector.style.background = moduleColor;
  if (inspectorBody) inspectorBody.style.background = moduleColor;
};
