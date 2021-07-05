import { useSelector } from "react-redux";
import { ProjectState } from "../../../redux/store/project/types";
import { RootState } from "../../../redux/store";
import { ModuleBody } from "../../../compLibrary/box/modules";
import { LegendElement, LegendColor } from "../../../compLibrary/box/library";
import { Legend } from "../../flow/helpers/common";
import { LegendComponent } from "./";

const LegendModule = ({ visible }) => {
  const projectState = useSelector<RootState>(
    (state) => state.projectState
  ) as ProjectState;

  const legends = LegendComponent(projectState.project) as Legend[];

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
