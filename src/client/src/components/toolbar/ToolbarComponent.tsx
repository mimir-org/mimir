import * as Icons from "../../assets/icons/header";
import * as selectors from "../header/helpers/selectors";
import { ToolbarElement } from "./components/ToolbarElement";
import { OnElectroClick } from "./handlers/OnElectroClick";
import { OnFilterClick } from "./handlers/OnFilterClick";
import { OnViewTypeClick } from "./handlers/OnViewTypeClick";
import { VIEW_TYPE, ViewType } from "../../models/project";
import { ToolBarBody, ToolBarBox } from "./ToolbarComponent.styled";
import { TextResources } from "../../assets/text";
import { useAppDispatch, useAppSelector, useParametricAppSelector } from "../../redux/store";

/**
 * The ToolBar - the menu below the HeaderMenu at the top of Mimir.
 * @returns a menu with icons for different features.
 */
const ToolbarComponent = () => {
  const dispatch = useAppDispatch();
  const isLibraryOpen = useAppSelector(selectors.libOpenSelector);
  const isExplorerOpen = useAppSelector(selectors.explorerSelector);
  const isTreeView = useParametricAppSelector(selectors.isActiveViewSelector, VIEW_TYPE.TREEVIEW);
  const IsVisualFilterOpen = useAppSelector(selectors.filterSelector);
  const isElectro = useAppSelector(selectors.electroSelector);

  return (
    <ToolBarBox id="ToolBar" libOpen={isLibraryOpen} explorerOpen={isExplorerOpen}>
      <ToolBarBody>
        <ToolbarElement
          active={isTreeView}
          label={TextResources.Toolbar_TreeView}
          icon={isTreeView ? Icons.TreeViewActive : Icons.TreeView}
          onClick={() => OnViewTypeClick(VIEW_TYPE.TREEVIEW as ViewType, dispatch)}
        />
        <ToolbarElement
          active={isTreeView}
          label={TextResources.Toolbar_BlockView}
          icon={isTreeView ? Icons.BlockView : Icons.BlockViewActive}
          onClick={() => OnViewTypeClick(VIEW_TYPE.BLOCKVIEW as ViewType, dispatch)}
        />
        {!isTreeView && (
          <ToolbarElement
            label={isElectro ? TextResources.Toolbar_Electro_Off : TextResources.Toolbar_Electro_On}
            icon={isElectro ? Icons.Vertical : Icons.Horizontal}
            onClick={() => OnElectroClick(dispatch)}
          />
        )}
        <ToolbarElement
          active={IsVisualFilterOpen}
          label={IsVisualFilterOpen ? TextResources.Toolbar_VisualFilters_Close : TextResources.Toolbar_VisualFilters_Open}
          icon={IsVisualFilterOpen ? Icons.FilterActive : Icons.Filter}
          onClick={() => OnFilterClick(dispatch, IsVisualFilterOpen)}
        />
      </ToolBarBody>

      {/* {IsBlockView() && IsLocation(selectedNode) && (
        <LocationBox onClick={() => OnLocation3D(dispatch, location3DActive)} active={location3DActive}>
          <img src={Location} alt={"location3D"} className="logo" />
        </LocationBox>
      )} */}
    </ToolBarBox>
  );
};

export default ToolbarComponent;
