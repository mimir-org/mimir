import red from "store";
import { AspectObject, Connection } from "lib";

export const GetMimirNodes = (): AspectObject[] => {
  return red.store.getState().projectState?.project?.aspectObjects;
};

export const GetMimirEdges = (): Connection[] => {
  return red.store.getState().projectState?.project?.connections;
};
