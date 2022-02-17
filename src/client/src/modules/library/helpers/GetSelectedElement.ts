import red from "../../../redux/store";

const GetSelectedElement = (elementId: string): string => {
  const library = red.store.getState().library;
  const types = [...library?.nodeTypes, ...library?.interfaceTypes, ...library?.transportTypes];
  return types.find((x) => x.id === elementId)?.name;
};

export default GetSelectedElement;
