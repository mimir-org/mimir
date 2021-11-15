import { LegendBody, LegendElement, LegendColor } from "./styled";
import { LegendComponent } from "./";
import { Project } from "../../models";

interface Props {
  visible: boolean;
  project: Project;
}

const LegendModule = ({ visible, project }: Props) => {
  const legends = LegendComponent(project);

  return (
    <LegendBody visible={visible}>
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
