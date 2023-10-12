export const SetPanelHeight = (inspectorRef: React.MutableRefObject<HTMLElement>, height: number) => {
  if (inspectorRef.current) inspectorRef.current.style.height = height + "px";
};
