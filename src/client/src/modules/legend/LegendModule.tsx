import { LegendBody, LegendElement, LegendColor } from "./styled";
import { LegendComponent } from "./";
import { Project } from "../../models";

interface Props {
  project: Project;
}

const LegendModule = ({ project }: Props) => {
  const legends = LegendComponent(project);

  return (
    <LegendBody>
      {legends?.map((legend) => {
        return (
          <LegendElement key={legend.key}>
            <p>{legend.name}</p>
            <LegendColor color={legend.color}></LegendColor>
          </LegendElement>
        );
      })}
    </LegendBody>
  );
};
export default LegendModule;
