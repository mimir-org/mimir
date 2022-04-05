import { useReactFlow } from "react-flow-renderer";
import red from "../redux/store";

export const GetSelectedBlockNode = () => {
  const nodes = red.store.getState().projectState?.project?.nodes;
  return nodes?.find((node) => node?.isBlockSelected);
};

export const GetSelectedEdges = () => {
  return useReactFlow()
    .getEdges()
    .filter((edge) => edge.selected);
};

export const GetSelectedNodes = () => {
  return useReactFlow()
    .getNodes()
    .filter((n) => n.selected);
};

export const GetFlowNodes = () => {
  return useReactFlow().getNodes();
};

export const GetMimirNodes = () => {
  return red.store.getState().projectState?.project?.nodes;
};
