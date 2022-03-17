import * as Icons from "../../assets/icons/header";
import * as selectors from "../header/helpers/selectors";
import { ToolbarElement } from "./components/ToolbarElement";
import { OnElectroClick, OnFilterClick, OnViewClick } from "./handlers/";
import { VIEW_TYPE, ViewType } from "../../models/project";
import { ToolbarButtonGroup, ToolBarBox } from "./ToolbarComponent.styled";
import { TextResources } from "../../assets/text/TextResources";
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

export default ToolbarComponent;
