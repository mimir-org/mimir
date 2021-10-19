import { Edge } from "../../../../models";
import { createAppSelector } from "../../../../redux/store";

export const edgesSelector = createAppSelector(
  (state) => state.projectState.project.edges,
  (edges) => (edges ?? []) as Edge[]
);
