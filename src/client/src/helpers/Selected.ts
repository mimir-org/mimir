import store from "store";
import { Block, Connection } from "lib";

export const GetMimirNodes = (): Block[] => {
  return store.getState().projectState?.project?.blocks;
};

export const GetMimirEdges = (): Connection[] => {
  return store.getState().projectState?.project?.connections;
};
