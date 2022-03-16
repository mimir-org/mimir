import * as Icons from "../../assets/icons/header";
import * as selectors from "../header/helpers/selectors";
import { ToolbarElement } from "./components/ToolbarElement";
import { OnElectroClick, OnFilterClick, OnViewClick } from "./handlers/";
import { VIEW_TYPE, ViewType } from "../../models/project";
import { ToolBarBody, ToolBarBox } from "./ToolbarComponent.styled";
import { TextResources } from "../../assets/text";
import { useAppDispatch, useAppSelector, useParametricAppSelector } from "../../redux/store";
import { useStoreState, useZoomPanHelper } from "react-flow-renderer";
import { SetZoomCenterLevel } from "../flow/block/nodes/blockParentNode/helpers/SetZoomCenterLevel";

/**
 * The ToolBar - the menu below the HeaderMenu at the top of Mimir.
 * @returns a menu with icons for different features.
 */
const ToolbarComponent = () => {
  const dispatch = useAppDispatch();
  const { setCenter } = useZoomPanHelper();
  const isLibraryOpen = useAppSelector(selectors.libOpenSelector);
  const isExplorerOpen = useAppSelector(selectors.explorerSelector);
  const isTreeView = useParametricAppSelector(selectors.isActiveViewSelector, VIEW_TYPE.TREEVIEW);
  const IsVisualFilterOpen = useAppSelector(selectors.filterSelector);
  const isElectro = useAppSelector(selectors.electroSelector);
  const secondaryNode = useAppSelector(selectors.secondaryNodeSelector);
  const numberOfSelectedElements = useStoreState((x) => x.selectedElements?.length);

  const onResetZoom = () => {
    if (isTreeView) return;
    const canvasData = SetZoomCenterLevel(secondaryNode !== null);
    setCenter(canvasData.x, canvasData.y, canvasData.zoom);
  };

  return (
    <ToolBarBox id="ToolBar" libOpen={isLibraryOpen} explorerOpen={isExplorerOpen}>
      <ToolBarBody>
        {!isTreeView && (
          <ToolbarElement
            label={TextResources.Toolbar_FitScreen}
            icon={Icons.FitScreenIcon}
            onClick={() => onResetZoom()}
            isLeft
          />
        )}
        <ToolbarElement
          active={isTreeView}
          label={TextResources.Toolbar_TreeView}
          icon={isTreeView ? Icons.TreeViewActive : Icons.TreeView}
          onClick={() => OnViewClick(VIEW_TYPE.TREEVIEW as ViewType, numberOfSelectedElements, dispatch)}
          borderLeft
        />
        <ToolbarElement
          active={!isTreeView}
          label={TextResources.Toolbar_BlockView}
          icon={isTreeView ? Icons.BlockView : Icons.BlockViewActive}
          onClick={() => OnViewClick(VIEW_TYPE.BLOCKVIEW as ViewType, numberOfSelectedElements, dispatch)}
          borderLeft
          borderRight
        />
        {!isTreeView && (
          <ToolbarElement
            label={isElectro ? TextResources.Toolbar_Electro_Off : TextResources.Toolbar_Electro_On}
            icon={isElectro ? Icons.Vertical : Icons.Horizontal}
            onClick={() => OnElectroClick(dispatch)}
            borderRight
          />
        )}
        <ToolbarElement
          active={IsVisualFilterOpen}
          label={IsVisualFilterOpen ? TextResources.Toolbar_VisualFilters_Close : TextResources.Toolbar_VisualFilters_Open}
          icon={IsVisualFilterOpen ? Icons.FilterActive : Icons.Filter}
          onClick={() => OnFilterClick(dispatch, IsVisualFilterOpen)}
        />
      </ToolBarBody>
    </ToolBarBox>
  );
};

export default ToolbarComponent;
