import { LegendBody, LegendColor, LegendElement } from "./LegendModule.styled";
import { LegendComponent } from "./helpers/LegendComponent";
import { Project } from "@mimirorg/modelbuilder-types";

interface Props {
  project: Project;
}

export const LegendModule = ({ project }: Props) => {
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
