import { useSelector } from "react-redux";
import { LegendIcon } from "../../../assets/icons";
import { TextResources } from "../../../assets/textResources";
import { ProjectState } from "../../../redux/store/project/types";
import { RootState } from "../../../redux/store";
import { CheckView } from "../../../redux/store/localStorage";
import { VIEW_TYPE } from "../../../models/project";
import { GetLegendData, Legend } from "../../flow/helpers";
import {
  ModuleBody,
  ModuleHeader,
} from "../../../componentLibrary/box/modules";
import {
  LegendElement,
  LegendColor,
} from "../../../componentLibrary/box/library";

const LegendModule = ({ visible }) => {
  const projectState = useSelector<RootState>(
    (state) => state.projectState
  ) as ProjectState;

  const isBlockView = CheckView(VIEW_TYPE.BLOCKVIEW);
  let legends = null;

  if (isBlockView) {
    legends = GetLegendData(
      projectState.project,
      true,
      "e1dbb139-f033-d15a-6fb0-e4fce18c46fc" // TODO FIX
    ) as Legend[];
  }

  if (!isBlockView) {
    legends = GetLegendData(projectState.project, false, null) as Legend[];
  }

  return (
    <ModuleBody visible={visible} legend>
      <ModuleHeader legend>
        <img src={LegendIcon} alt="legend" className="module-icon" />
        {TextResources.Legend_Heading}
      </ModuleHeader>
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
