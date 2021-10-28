const SetPanelHeight = (inspectorRef: React.MutableRefObject<HTMLDivElement>, height: number) => {
  if (inspectorRef.current) {
    inspectorRef.current.style.height = height + "px";
  }
};

export default SetPanelHeight;
