import { ModuleBody } from "../../compLibrary/box/modules";
import { LegendElement, LegendColor } from "../../compLibrary/box/library";
import { LegendComponent } from "./";
import { Project } from "../../models";

interface Props {
  visible: boolean;
  project: Project;
}

const LegendModule = ({ visible, project }: Props) => {
  const legends = LegendComponent(project);

  return (
    <ModuleBody visible={visible} legend>
      {legends?.map((legend) => {
        return (
          <LegendElement key={legend.key}>
            <p>{legend.name}</p>
            <LegendColor color={legend.color}></LegendColor>
          </LegendElement>
        );
      })}
    </ModuleBody>
  );
};
export default LegendModule;
