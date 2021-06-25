import { useSelector } from "react-redux";
import { ProjectState } from "../../../redux/store/project/types";
import { RootState } from "../../../redux/store";
import { ModuleBody } from "../../../compLibrary/box/modules";
import { IsBlockView } from "../../flow/helpers/block";
import { LegendElement, LegendColor } from "../../../compLibrary/box/library";
import {
  FindSelectedNode,
  GetLegendData,
  Legend,
} from "../../flow/helpers/common";

const LegendModule = ({ visible }) => {
  const projectState = useSelector<RootState>(
    (state) => state.projectState
  ) as ProjectState;

  let legends = GetLegendData(projectState.project, false, null) as Legend[];
  const selectedNode = FindSelectedNode();

  if (IsBlockView()) {
    legends = GetLegendData(
      projectState.project,
      true,
      selectedNode?.id
    ) as Legend[];
  }

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
