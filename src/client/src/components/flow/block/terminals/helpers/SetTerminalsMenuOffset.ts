export const SetTerminalsMenuOffset = (isElectroView: boolean, hasActiveTerminals: boolean, isParent: boolean) => {
  if (isParent) return "16px";
  if (!isElectroView && hasActiveTerminals) return "25px";
  return "8px";
};
