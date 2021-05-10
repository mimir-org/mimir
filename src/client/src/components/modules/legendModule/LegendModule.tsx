import { useState } from "react";
import { useSelector } from "react-redux";
import { LegendIcon } from "../../../assets/icons";
import { TextResources } from "../../../assets/textResources";
import { ProjectState } from "../../../redux/store/project/types";
import { RootState } from "../../../redux/store";
import { LoadState } from "../../../redux/store/localStorage/localStorage";
import { VIEW_TYPE } from "../../../models/project";
import { GetLegendData, Legend } from "../../flow/helpers";
import {
  LegendBody,
  LegendContent,
  LegendHeader,
  LegendIconWrapper,
  TransportColor,
  TransportWrapper,
} from "../../../componentLibrary/box";

const LegendModule = () => {
  const projectState = useSelector<RootState>(
    (state) => state.projectState
  ) as ProjectState;

  const blockView = VIEW_TYPE.BLOCKVIEW;
  const treeView = VIEW_TYPE.TREEVIEW;
  const [isBlockView] = useState(LoadState(blockView));
  const [isTreeview] = useState(LoadState(treeView));

  let legends = null;

  if (isBlockView) {
    legends = GetLegendData(
      projectState.project,
      true,
      "e1dbb139-f033-d15a-6fb0-e4fce18c46fc"
    ) as Legend[];
  }

  if (isTreeview) {
    legends = GetLegendData(projectState.project, false, null) as Legend[];
  }

  return (
    <LegendBody>
      <LegendHeader>
        <LegendIconWrapper>
          <img src={LegendIcon} alt="legend" />
        </LegendIconWrapper>
        {TextResources.Legend_Heading}
      </LegendHeader>
      {legends &&
        legends.map((legend) => {
          return (
            <LegendContent key={legend.key}>
              <TransportWrapper>
                <p>{legend.name}</p>
                <TransportColor color={legend.color}></TransportColor>
              </TransportWrapper>
            </LegendContent>
          );
        })}
    </LegendBody>
  );
};
export default LegendModule;
