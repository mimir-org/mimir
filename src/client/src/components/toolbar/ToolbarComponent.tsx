import * as handlers from "./handlers/OnToolbarClick";
import { ToolbarElement } from "./components/ToolbarElement";
import { ViewportData } from "../../models/project";
import { ToolbarButtonGroup, ToolbarBox } from "./ToolbarComponent.styled";
import { TextResources } from "../../assets/text/TextResources";
import { useReactFlow } from "react-flow-renderer";
import { Block, ViewType, Project, ModuleType } from "lib";
import { OverflowComponent } from "compLibrary/menu/overflow/OverflowComponent";
import { ToolbarParentContainer } from "./components/ToolbarParentElement.styled";
import { OverflowComponentTitle } from "compLibrary/menu/overflow/OverflowComponent.styled";
import { useState, useEffect } from "react";
import { MenuItem } from "compLibrary/menu/overflow/OverflowItem";
import { libraryStateSelector, modulesSelector, projectSelector, useAppSelector, viewTypeSelector } from "store";
import { onViewTypeChange } from "components/handlers/commonHandlers";
import { useDispatch } from "react-redux";
import { onTerminalAdd, onTerminalChecked, onTerminalRemove } from "components/handlers/ProjectHandlers";
import { LibraryState } from "store/reducers/libraryReducer";
import {
  BlockViewActiveIcon,
  BlockViewIcon,
  FilterActiveIcon,
  FilterIcon,
  FitViewIcon,
  HorizontalIcon,
  TreeViewActiveIcon,
  TreeViewIcon,
} from "@mimirorg/component-library";

interface Props {
  isVisualFilterOpen: boolean;
}

/**
 * The ToolBar - the menu below the HeaderMenu at the top of Mimir.
 * @returns a menu with icons for different features and selected block node toolbar.
 */
export const ToolbarComponent = ({ isVisualFilterOpen }: Props) => {
  const dispatch = useDispatch();
  const [aspectObject, setAspectObject] = useState<Block>(null);
  const [leftMenuItems, setLeftMenuItems] = useState<MenuItem[]>(null);
  const [rightMenuItems, setRightMenuItems] = useState<MenuItem[]>(null);

  const { setViewport, setCenter } = useReactFlow();
  const viewportData = { setViewport, setCenter } as ViewportData;

  const project = useAppSelector<Project>(projectSelector);
  const libraryState = useAppSelector<LibraryState>(libraryStateSelector);
  const viewType = useAppSelector<ViewType>(viewTypeSelector);
  const modules = useAppSelector<ModuleType[]>(modulesSelector);

  useEffect(() => {
    setAspectObject(project.getBlockSelectedAspectObject());
    setLeftMenuItems(project.getBlockSelectedAspectObject()?.toMenuItems("Left"));
    setRightMenuItems(project.getBlockSelectedAspectObject()?.toMenuItems("Right"));
  }, [project]);

  return (
    <ToolbarBox
      id="ToolBar"
      libOpen={modules.some((x) => x === ModuleType.Library)}
      explorerOpen={modules.some((x) => x === ModuleType.Explorer)}
    >
      <ToolbarButtonGroup>
        {viewType !== ViewType.Tree && (
          <>
            <ToolbarElement
              label={TextResources.FITSCREEN}
              icon={<FitViewIcon size={14} />}
              onClick={() => handlers.OnFitToScreenClick(false, viewportData)}
              borderRight
            />
            <ToolbarElement
              label={TextResources.ELECTRO_ON}
              icon={<HorizontalIcon width={"14px"} height={"10px"} />}
              onClick={() => null}
              // onClick={() => handlers.OnElectroClick(dispatch)}
              borderRight
            />
          </>
        )}
      </ToolbarButtonGroup>
      {viewType === ViewType.Block && (
        <ToolbarParentContainer bgColor="#FFFAA9">
          <OverflowComponent
            orientation={"Left"}
            borderColor={"#FEF445"}
            onSelect={(id, checked) => onTerminalChecked(project, aspectObject.id, id, checked, dispatch)}
            onAdd={(id) =>
              onTerminalAdd(aspectObject.id, libraryState.terminalTypes, libraryState.aspectObjectTypes, id, project, dispatch)
            }
            onRemove={(id) =>
              onTerminalRemove(aspectObject.id, libraryState.terminalTypes, libraryState.aspectObjectTypes, id, project, dispatch)
            }
            items={leftMenuItems}
          />
          <OverflowComponentTitle>{aspectObject?.name ?? "Missing"}</OverflowComponentTitle>
          <OverflowComponent
            orientation={"Right"}
            borderColor={"#FEF445"}
            onSelect={(id, checked) => onTerminalChecked(project, aspectObject.id, id, checked, dispatch)}
            onAdd={(id) =>
              onTerminalAdd(aspectObject.id, libraryState.terminalTypes, libraryState.aspectObjectTypes, id, project, dispatch)
            }
            onRemove={(id) =>
              onTerminalRemove(aspectObject.id, libraryState.terminalTypes, libraryState.aspectObjectTypes, id, project, dispatch)
            }
            items={rightMenuItems}
          ></OverflowComponent>
        </ToolbarParentContainer>
      )}
      <ToolbarButtonGroup>
        <ToolbarElement
          active={viewType === ViewType.Tree}
          label={TextResources.TREEVIEW}
          icon={
            viewType === ViewType.Tree ? (
              <TreeViewActiveIcon width={"19px"} height={"14px"} />
            ) : (
              <TreeViewIcon width={"19px"} height={"14px"} />
            )
          }
          // onClick={() => handlers.OnTreeViewClick(setSelectedNodes, viewType === ViewType.Tree, dispatch)}
          onClick={() => onViewTypeChange(ViewType.Tree, dispatch)}
          borderLeft
          clickable={viewType !== ViewType.Tree}
        />
        <ToolbarElement
          active={viewType === ViewType.Block}
          label={TextResources.BLOCKVIEW}
          icon={viewType === ViewType.Tree ? <BlockViewIcon size={14} /> : <BlockViewActiveIcon size={14} />}
          onClick={() => onViewTypeChange(ViewType.Block, dispatch)}
          borderLeft
          clickable={viewType !== ViewType.Block && aspectObject != null}
        />
        <ToolbarElement
          active={isVisualFilterOpen}
          label={isVisualFilterOpen ? TextResources.VISUALFILTER_CLOSE : TextResources.VISUALFILTER_OPEN}
          icon={isVisualFilterOpen ? <FilterActiveIcon size={14} /> : <FilterIcon size={14} />}
          // onClick={() => handlers.OnFilterClick(dispatch, isVisualFilterOpen)}
          onClick={() => null}
          borderLeft
        />
      </ToolbarButtonGroup>
    </ToolbarBox>
  );
};

ToolbarComponent.displayName = "ToolbarComponent";
