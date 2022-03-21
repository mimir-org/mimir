import red from "../../../../../../../redux/store";

export const GetSelectedElement = (elementId: string): string => {
  const library = red.store.getState().library;
  if (!library) return null;
  const types = [...library.nodeTypes, ...library.interfaceTypes, ...library.transportTypes];
  return types.find((x) => x.id === elementId)?.name;
};
