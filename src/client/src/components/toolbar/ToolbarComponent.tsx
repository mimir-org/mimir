import * as Icons from "../../assets/icons/header";
import * as selectors from "../header/helpers/selectors";
import * as handlers from "./handlers/OnToolbarClick";
import { ToolbarElement } from "./components/ToolbarElement";
import { VIEW_TYPE, ViewportData } from "../../models/project";
import { ToolbarButtonGroup, ToolBarBox } from "./ToolbarComponent.styled";
import { TextResources } from "../../assets/text/TextResources";
import { useAppDispatch, useAppSelector, useParametricAppSelector } from "../../redux/store";
import { GetSelectedNodes } from "../../helpers/Selected";
import { useReactFlow } from "react-flow-renderer";

/**
 * The ToolBar - the menu below the HeaderMenu at the top of Mimir.
 * @returns a menu with icons for different features.
 */
export const ToolbarComponent = () => {
  const dispatch = useAppDispatch();
  const { setViewport, setCenter } = useReactFlow();
  const viewportData = { setViewport, setCenter } as ViewportData;
  const isLibraryOpen = useAppSelector(selectors.libOpenSelector);
  const isExplorerOpen = useAppSelector(selectors.explorerSelector);
  const isTreeView = useParametricAppSelector(selectors.isActiveViewSelector, VIEW_TYPE.TREEVIEW);
  const isVisualFilterOpen = useAppSelector(selectors.filterSelector);
  const isElectro = useAppSelector(selectors.electroSelector);
  const secondaryNode = useAppSelector(selectors.secondaryNodeSelector);
  const selectedNodes = GetSelectedNodes();

  return (
    <ToolBarBox id="ToolBar" libOpen={isLibraryOpen} explorerOpen={isExplorerOpen}>
      <ToolbarButtonGroup>
        {!isTreeView && (
          <>
            <ToolbarElement
              label={TextResources.FITSCREEN}
              icon={Icons.FitScreenIcon}
              onClick={() => handlers.OnFitToScreenClick(isTreeView, viewportData, secondaryNode)}
              borderRight
            />
            <ToolbarElement
              label={isElectro ? TextResources.ELECTRO_OFF : TextResources.ELECTRO_ON}
              icon={isElectro ? Icons.Vertical : Icons.Horizontal}
              onClick={() => handlers.OnElectroClick(dispatch)}
              borderRight
            />
          </>
        )}
      </ToolbarButtonGroup>
      <ToolbarButtonGroup>
        <ToolbarElement
          active={isTreeView}
          label={TextResources.TREEVIEW}
          icon={isTreeView ? Icons.TreeViewActive : Icons.TreeView}
          onClick={() => handlers.OnTreeViewClick(dispatch)}
          borderLeft
        />
        <ToolbarElement
          active={!isTreeView}
          label={TextResources.BLOCKVIEW}
          icon={isTreeView ? Icons.BlockView : Icons.BlockViewActive}
          onClick={() => handlers.OnBlockViewClick(selectedNodes.length, viewportData, dispatch)}
          borderLeft
        />
        <ToolbarElement
          active={isVisualFilterOpen}
          label={isVisualFilterOpen ? TextResources.VISUALFILTER_CLOSE : TextResources.VISUALFILTER_OPEN}
          icon={isVisualFilterOpen ? Icons.FilterActive : Icons.Filter}
          onClick={() => handlers.OnFilterClick(dispatch, isVisualFilterOpen)}
          borderLeft
        />
      </ToolbarButtonGroup>
    </ToolBarBox>
  );
};
