import { useState } from "react";
import { useSelector } from "react-redux";
import { LegendIcon } from "../../../assets";
import {
  LegendHeader,
  LegendIconWrapper,
  LegendContent,
  TransportWrapper,
  TransportColor,
} from "./styled";
import { SidebarWrapper } from "../libraryModule/styled";
import textResources from "../../../textResources";
import { ProjectState } from "../../../redux/store/project/types";
import { RootState } from "../../../redux/store";
import { LoadState } from "../../../redux/store/localStorage/localStorage";
import { GetLegendData, Legend } from "../../flow/helpers";

interface Props {
  visible: boolean;
}

const LegendModule = ({ visible }: Props) => {
  const projectState = useSelector<RootState>(
    (state) => state.projectState
  ) as ProjectState;

  const blockKey = "blockview";
  const treeKey = "treeview";
  const [isBlockView] = useState(LoadState(blockKey));
  const [isTreeview] = useState(LoadState(treeKey));

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
    <>
      <LegendHeader visible={visible}>
        <LegendIconWrapper>
          <img src={LegendIcon} alt="legend-icon" />
        </LegendIconWrapper>
        {textResources.Legend_Heading}
      </LegendHeader>
      <SidebarWrapper visible={visible}>
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
      </SidebarWrapper>
    </>
  );
};
export default LegendModule;
