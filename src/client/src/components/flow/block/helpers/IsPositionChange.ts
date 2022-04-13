import { NodeChange } from "react-flow-renderer";

export const IsPositionChange = (changes: NodeChange[]) => {
  return changes[0]?.type === "position";
};
