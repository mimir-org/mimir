import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { ModuleBody } from "../../compLibrary/box/modules";
import { LegendElement, LegendColor } from "../../compLibrary/box/library";
import { LegendComponent } from "./";
import { Project } from "../../models";

const LegendModule = ({ visible }) => {
  const project = useSelector<RootState>(
    (state) => state.projectState?.project
  ) as Project;

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
