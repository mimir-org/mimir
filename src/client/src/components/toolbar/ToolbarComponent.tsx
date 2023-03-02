import * as Icons from "../../assets/icons/header";
import * as handlers from "./handlers/OnToolbarClick";
import { ToolbarElement } from "./components/ToolbarElement";
import { ToolbarButtonGroup, ToolbarBox } from "./ToolbarComponent.styled";
import { TextResources } from "../../assets/text/TextResources";
import { useReactFlow, useStoreApi } from "react-flow-renderer";
import { Dispatch } from "redux";
import { useState } from "react";

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
  // const selectedFlowNodes = GetSelectedFlowNodes();
  const viewportData = { setViewport, setCenter };
  const [isVisualFilterOpen, setIsVisualFilterOpen] = useState<boolean>(false);
  const [isLibraryOpen, setIslibraryOpen] = useState<boolean>(false);
  const [isExplorerOpen, setIsExplorerOpen] = useState<boolean>(false);
  const isElectro = false;

  return (
    <ToolbarBox id="ToolBar" libOpen={isLibraryOpen} explorerOpen={isExplorerOpen}>
      <ToolbarButtonGroup>
        {!isTreeView && (
          <>
            <ToolbarElement
              label={TextResources.FITSCREEN}
              icon={Icons.FitScreenIcon}
              onClick={() => handlers.OnFitToScreenClick(isTreeView, viewportData)}
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
          active={isVisualFilterOpen}
          label={isVisualFilterOpen ? TextResources.VISUALFILTER_CLOSE : TextResources.VISUALFILTER_OPEN}
          icon={isVisualFilterOpen ? Icons.FilterActive : Icons.Filter}
          onClick={() => alert("Visual filter not implemented")}
          borderLeft
        />
      </ToolbarButtonGroup>
    </ToolbarBox>
  );
};
