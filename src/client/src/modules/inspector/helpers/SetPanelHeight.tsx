const SetPanelHeight = (height: number) => {
  const module = "InspectorModule";
  const panel = document.getElementById(module);
  panel.style.height = height + "px";
};

export default SetPanelHeight;
