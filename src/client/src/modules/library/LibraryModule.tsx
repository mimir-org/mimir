import { TextResources } from "../../assets/text";
import { LegendModule } from "../../modules/legend";
import { LibraryComponent } from "./index";
import { useEffect } from "react";
import { searchLibrary } from "../../redux/store/library/actions";
import { AnimatedModule, Size } from "../../compLibrary";
import { GetLibCategories } from "./helpers";
import { ModuleBody, ModuleHead } from "../../compLibrary/box/modules";
import { LegendIcons } from "../../compLibrary/box/library";
import { MODULE_TYPE } from "../../models/project";
import { GetSelectedNode } from "../../components/flow/helpers";
import { OnLibraryClick, OnLegendClick } from "./handlers";
import { Project } from "../../models";
import { LegendIcon, LibraryIcon } from "../../assets/icons/modules";
import { useAppDispatch, useAppSelector } from "../../redux/store";

/**
 * Component for Mimir's type library and Legend Module (to be removed).
 * @returns a module with a drop-down of Types and a search input.
 */
const LibraryModule = () => {
  const dispatch = useAppDispatch();
  const lib = MODULE_TYPE.LIBRARY;
  const legend = MODULE_TYPE.LEGEND;
  const search = (text: string) => dispatch(searchLibrary(text));

  useEffect(() => {
    dispatch(searchLibrary(""));
  }, [dispatch]);

  const project = useAppSelector((s) => s.projectState?.project) as Project;
  const libState = useAppSelector((s) => s.library);
  const splitView = useAppSelector((s) => s.splitView.visible);
  const legendOpen = useAppSelector((s) => s.modules.types.find((x) => x.type === legend).visible);
  const animate = useAppSelector((s) => s.modules.types.find((x) => x.type === lib).animate);
  const libOpen = useAppSelector((s) => s.modules.types.find((x) => x.type === lib).visible);
  const animateLegend = useAppSelector((s) => s.modules.types.find((x) => x.type === legend).animate);

  const selectedNode = GetSelectedNode();
  const startLib = libOpen ? Size.ModuleClosed : Size.ModuleOpen;
  const stopLib = libOpen ? Size.ModuleOpen : Size.ModuleClosed;
  const startLegend = legendOpen ? Size.ModuleClosed : Size.ModuleOpen;
  const stopLegend = legendOpen ? Size.ModuleOpen : Size.ModuleClosed;

  return (
    <AnimatedModule start={startLib} stop={stopLib} run={animate} type={lib} id="LibraryModule">
      <ModuleHead library visible={libOpen}>
        <img
          className="icon"
          src={LibraryIcon}
          alt="toggle"
          onClick={() => OnLibraryClick(dispatch, libOpen, lib, legend)}
        />
        <p className="text">{TextResources.Module_Library}</p>
      </ModuleHead>
      <ModuleBody visible={libOpen}>
        <LibraryComponent categories={GetLibCategories(selectedNode, splitView, libState)} search={search} />
      </ModuleBody>

      <AnimatedModule start={startLegend} stop={stopLegend} run={animateLegend} type={legend} id="LegendModule">
        <ModuleHead legend>
          <LegendIcons open={legendOpen} onClick={() => OnLegendClick(dispatch, legendOpen, legend)}>
            <img src={LegendIcon} alt="legend" className="icon" />
            <p className="text">{TextResources.Module_Legend}</p>
          </LegendIcons>
        </ModuleHead>
        <LegendModule visible={true} project={project} />
      </AnimatedModule>
    </AnimatedModule>
  );
};

export default LibraryModule;
