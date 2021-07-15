import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { EyeIcon, DownIcon, UpIcon } from "../../../assets/icons/common";
import { TextResources } from "../../../assets/text";
import InspectorTabs from "./InspectorTabs";
import { Size } from "../../../compLibrary";
import { MODULE_TYPE } from "../../../models/project";
import { changeModuleVisibility } from "../../../redux/store/modules/actions";
import { IsExplorerModule, IsLibraryModule } from "../../flow/helpers/common";
import { Color } from "../../../compLibrary/";
import { Project } from "../../../models";
import {
  InspectorTitle,
  InspectorBody,
  AnimatedInspector,
  IconWrapper,
  ButtonBox,
} from "../../../compLibrary/box/inspector";

const TabsBottomLine = styled.div`
  border-bottom: 1px solid ${Color.Grey};
  flex-grow: 1;
`;

const InspectorModule = () => {
  const dispatch = useDispatch();
  const key = MODULE_TYPE.INSPECTOR;

  const project = useSelector<RootState>(
    (state) => state.projectState.project
  ) as Project;

  const hasProject = project !== null;

  const animate = useSelector<RootState>(
    (state) => state.modules.types.find((x) => x.type === key).animate
  ) as boolean;

  const isInspectorOpen = useSelector<RootState>(
    (state) => state.modules.types.find((x) => x.type === key).visible
  ) as boolean;

  const isLibraryOpen = useSelector<RootState>(
    (state) => state.modules.types.find((x) => IsLibraryModule(x.type)).visible
  ) as boolean;

  const isExplorerOpen = useSelector<RootState>(
    (state) => state.modules.types.find((x) => IsExplorerModule(x.type)).visible
  ) as boolean;

  const handleClick = () => {
    dispatch(changeModuleVisibility(key, !isInspectorOpen, true));
  };

  const start = isInspectorOpen ? Size.ModuleClosed : Size.InspectorModuleOpen;
  const stop = isInspectorOpen ? Size.InspectorModuleOpen : Size.ModuleClosed;

  return (
    <AnimatedInspector
      type={key}
      isLibraryOpen={isLibraryOpen}
      isExplorerOpen={isExplorerOpen}
      start={start}
      stop={stop}
      run={animate}
      id="InspectorModule"
    >
      <InspectorBody id="InspectorBody">
        {hasProject && <InspectorTabs project={project} />}
        <TabsBottomLine>
          <ButtonBox>
            <img
              src={isInspectorOpen ? DownIcon : UpIcon}
              alt="toggle-icon"
              onClick={handleClick}
            />
          </ButtonBox>
          <IconWrapper>
            <InspectorTitle>{TextResources.Inspector_Heading}</InspectorTitle>
            <img src={EyeIcon} alt="inspector-icon" />
          </IconWrapper>
        </TabsBottomLine>
      </InspectorBody>
    </AnimatedInspector>
  );
};

export default InspectorModule;
