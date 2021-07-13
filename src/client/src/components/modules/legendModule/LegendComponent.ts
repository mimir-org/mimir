import { Project } from "../../../models";
import { Legend } from "../../flow/helpers/common";
import { AddLegend } from "./helpers";

const LegendComponent = (project: Project) => {
  const legends = [] as Legend[];
  const edges = project.edges;

  if (!project) return legends;
  const nodes = project.nodes?.filter((x) => !x.isHidden);

  nodes?.forEach((node) => {
    legends.push.apply(legends, AddLegend(node, edges));
  });

  return legends.filter(
    (value, index, self) =>
      self.map((x) => x.name + x.color).indexOf(value.name + value.color) ===
      index
  );
};

export default LegendComponent;
