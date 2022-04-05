import * as Icons from "../../assets/icons/header";
import * as selectors from "../header/helpers/selectors";
import { ToolbarElement } from "./components/ToolbarElement";
import { OnElectroClick, OnFilterClick, OnViewClick } from "./handlers/";
import { VIEW_TYPE, ViewType } from "../../models/project";
import { ToolbarButtonGroup, ToolBarBox } from "./ToolbarComponent.styled";
import { TextResources } from "../../assets/text/TextResources";
import { useAppDispatch, useAppSelector, useParametricAppSelector } from "../../redux/store";
import { SetZoomCenterLevel } from "../flow/block/nodes/blockParentNode/helpers/SetZoomCenterLevel";
import { GetSelectedNodes } from "../../helpers/Selected";
import { useReactFlow } from "react-flow-renderer";

/**
 * The ToolBar - the menu below the HeaderMenu at the top of Mimir.
 * @returns a menu with icons for different features.
 */
export const ToolbarComponent = () => {
  const dispatch = useAppDispatch();
  const { setViewport, setCenter } = useReactFlow();
  const isLibraryOpen = useAppSelector(selectors.libOpenSelector);
  const isExplorerOpen = useAppSelector(selectors.explorerSelector);
  const isTreeView = useParametricAppSelector(selectors.isActiveViewSelector, VIEW_TYPE.TREEVIEW);
  const IsVisualFilterOpen = useAppSelector(selectors.filterSelector);
  const isElectro = useAppSelector(selectors.electroSelector);
  const secondaryNode = useAppSelector(selectors.secondaryNodeSelector);
  const selectedNodes = GetSelectedNodes();
  const numberOfSelectedElements = selectedNodes.length;

  const onResetZoom = () => {
    if (isTreeView) return;
    SetZoomCenterLevel(setViewport, setCenter, secondaryNode !== null);
  };

  return (
    <ToolBarBox id="ToolBar" libOpen={isLibraryOpen} explorerOpen={isExplorerOpen}>
      <ToolbarButtonGroup>
        {!isTreeView && (
          <>
            <ToolbarElement
              label={TextResources.TOOLBAR_FITSCREEN}
              icon={Icons.FitScreenIcon}
              onClick={() => onResetZoom()}
              borderRight
            />
            <ToolbarElement
              label={isElectro ? TextResources.TOOLBAR_ELECTRO_OFF : TextResources.TOOLBAR_ELECTRO_ON}
              icon={isElectro ? Icons.Vertical : Icons.Horizontal}
              onClick={() => OnElectroClick(dispatch)}
              borderRight
            />
          </>
        )}
      </ToolbarButtonGroup>
      <ToolbarButtonGroup>
        <ToolbarElement
          active={isTreeView}
          label={TextResources.TOOLBAR_TREEVIEW}
          icon={isTreeView ? Icons.TreeViewActive : Icons.TreeView}
          onClick={() => OnViewClick(VIEW_TYPE.TREEVIEW as ViewType, numberOfSelectedElements, dispatch)}
          borderLeft
        />
        <ToolbarElement
          active={!isTreeView}
          label={TextResources.TOOLBAR_BLOCKVIEW}
          icon={isTreeView ? Icons.BlockView : Icons.BlockViewActive}
          onClick={() => OnViewClick(VIEW_TYPE.BLOCKVIEW as ViewType, numberOfSelectedElements, dispatch)}
          borderLeft
        />
        <ToolbarElement
          active={IsVisualFilterOpen}
          label={IsVisualFilterOpen ? TextResources.TOOLBAR_VISUALFILTERS_CLOSE : TextResources.TOOLBAR_VISUALFILTERS_OPEN}
          icon={IsVisualFilterOpen ? Icons.FilterActive : Icons.Filter}
          onClick={() => OnFilterClick(dispatch, IsVisualFilterOpen)}
          borderLeft
        />
      </ToolbarButtonGroup>
    </ToolBarBox>
  );
};
