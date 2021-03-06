import * as Icons from "../../assets/icons/header";
import * as selectors from "../header/helpers/selectors";
import * as handlers from "./handlers/OnToolbarClick";
import { ToolbarElement } from "./components/ToolbarElement";
import { ViewportData } from "../../models/project";
import { ToolbarButtonGroup, ToolbarBox } from "./ToolbarComponent.styled";
import { TextResources } from "../../assets/text/TextResources";
import { useAppSelector } from "../../redux/store";
import { GetSelectedFlowNodes } from "../../helpers/Selected";
import { useReactFlow, useStoreApi } from "react-flow-renderer";
import { Dispatch } from "redux";

interface Props {
  isTreeView: boolean;
  dispatch: Dispatch;
}

/**
 * The ToolBar - the menu below the HeaderMenu at the top of Mimir.
 * @returns a menu with icons for different features.
 */
export const ToolbarComponent = ({ isTreeView, dispatch }: Props) => {
  const { setViewport, setCenter } = useReactFlow();
  const setSelectedNodes = useStoreApi().getState().addSelectedNodes;
  const selectedFlowNodes = GetSelectedFlowNodes();
  const viewportData = { setViewport, setCenter } as ViewportData;
  const isLibraryOpen = useAppSelector(selectors.libOpenSelector);
  const isExplorerOpen = useAppSelector(selectors.explorerSelector);
  const isVisualFilterOpen = useAppSelector(selectors.filterSelector);
  const isElectro = useAppSelector(selectors.electroSelector);
  const secondaryNode = useAppSelector(selectors.secondaryNodeSelector);

  return (
    <ToolbarBox id="ToolBar" libOpen={isLibraryOpen} explorerOpen={isExplorerOpen}>
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
          onClick={() => handlers.OnTreeViewClick(setSelectedNodes, isTreeView, dispatch)}
          borderLeft
          clickable={!isTreeView}
        />
        <ToolbarElement
          active={!isTreeView}
          label={TextResources.BLOCKVIEW}
          icon={isTreeView ? Icons.BlockView : Icons.BlockViewActive}
          onClick={() => handlers.OnBlockViewClick(selectedFlowNodes, viewportData, isTreeView, dispatch)}
          borderLeft
          clickable={isTreeView}
        />
        <ToolbarElement
          active={isVisualFilterOpen}
          label={isVisualFilterOpen ? TextResources.VISUALFILTER_CLOSE : TextResources.VISUALFILTER_OPEN}
          icon={isVisualFilterOpen ? Icons.FilterActive : Icons.Filter}
          onClick={() => handlers.OnFilterClick(dispatch, isVisualFilterOpen)}
          borderLeft
        />
      </ToolbarButtonGroup>
    </ToolbarBox>
  );
};
