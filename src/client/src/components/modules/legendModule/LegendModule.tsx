import { useSelector } from "react-redux";
import { ProjectState } from "../../../redux/store/project/types";
import { RootState } from "../../../redux/store";
import { CheckView } from "../../../redux/store/localStorage";
import { Node, VIEW_TYPE } from "../../../models/project";
import { GetLegendData, Legend } from "../../flow/helpers";
import { ModuleBody } from "../../../componentLibrary/box/modules";
import {
  LegendElement,
  LegendColor,
} from "../../../componentLibrary/box/library";

const LegendModule = ({ visible }) => {
  const projectState = useSelector<RootState>(
    (state) => state.projectState
  ) as ProjectState;

  const isBlockView = CheckView(VIEW_TYPE.BLOCKVIEW);
  let legends = GetLegendData(projectState.project, false, null) as Legend[];

  let selectedNode = projectState.project?.nodes?.find(
    (x) => x.isSelected
  ) as Node;

  if (isBlockView) {
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
