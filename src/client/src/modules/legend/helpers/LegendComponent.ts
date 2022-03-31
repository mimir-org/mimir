import { Legend } from "./types";
import { Project } from "../../../models";
import { AddLegend } from "./AddLegend";

export const LegendComponent = (project: Project) => {
  let legends = [] as Legend[];

  if (!project) return legends;
  const edges = project.edges;
  const nodes = project.nodes?.filter((node) => !node.isHidden);

  nodes?.forEach((node) => {
    legends = [...legends, ...AddLegend(node, edges)];
  });

  return legends.filter((value, index, self) => self.map((x) => x.name + x.color).indexOf(value.name + value.color) === index);
};
