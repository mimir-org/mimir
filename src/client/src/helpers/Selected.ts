import red from "../redux/store";
import { useReactFlow } from "react-flow-renderer";

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

export const GetMimirEdges = () => {
  return red.store.getState().projectState?.project?.edges;
};
