import { LegendBody, LegendColor, LegendElement } from "./styled";
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
            <span>{legend.name}</span>
            <LegendColor color={legend.color} />
          </LegendElement>
        );
      })}
    </LegendBody>
  );
};
export default LegendModule;
