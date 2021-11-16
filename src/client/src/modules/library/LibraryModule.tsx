import { TextResources } from "../../assets/text";
import { LegendModule } from "../../modules/legend";
import { LibraryComponent } from "./index";
import { useMemo, useState } from "react";
import { AnimatedModule } from "../../compLibrary/animated";
import { Size } from "../../compLibrary/size";
import { GetFilteredLibCategories, GetLibCategories } from "./helpers";
import { ModuleBody, ModuleHeader, LegendHeader } from "./styled";
import { MODULE_TYPE } from "../../models/project";
import { GetSelectedNode } from "../../helpers";
import { OnLibraryClick, OnLegendClick } from "./handlers";
import { LegendIcon, LibraryIcon } from "../../assets/icons/modules";
import { useAppDispatch, useAppSelector, useParametricAppSelector } from "../../redux/store/hooks";
import { animatedModuleSelector, legendOpenSelector, libOpenSelector, librarySelector, projectSelector } from "../../redux/store";

/**
 * Component for Mimir's type library and Legend Module (to be removed).
 * @returns a module with a drop-down of Types and a search input.
 */
const LibraryModule = () => {
  const dispatch = useAppDispatch();

  const lib = MODULE_TYPE.LIBRARY;
  const legend = MODULE_TYPE.LEGEND;

  const [searchString, setSearchString] = useState("");
  const libState = useAppSelector(librarySelector);
  const project = useAppSelector(projectSelector);
  const legendOpen = useAppSelector(legendOpenSelector);
  const animate = useParametricAppSelector(animatedModuleSelector, lib);
  const libOpen = useAppSelector(libOpenSelector);
  const animateLegend = useParametricAppSelector(animatedModuleSelector, legend);

  const selectedNode = GetSelectedNode();
  const startLib = libOpen ? Size.ModuleClosed : Size.ModuleOpen;
  const stopLib = libOpen ? Size.ModuleOpen : Size.ModuleClosed;
  const startLegend = legendOpen ? Size.ModuleClosed : Size.ModuleOpen;
  const stopLegend = legendOpen ? Size.ModuleOpen : Size.ModuleClosed;

  const libCategories = useMemo(() => GetLibCategories(selectedNode, libState), [selectedNode, libState]);
  const filteredCategories = useMemo(() => GetFilteredLibCategories(libCategories, searchString), [libCategories, searchString]);

  return (
    <AnimatedModule start={startLib} stop={stopLib} run={animate} type={lib} id="LibraryModule">
      <ModuleHeader isOpen={libOpen} onClick={() => OnLibraryClick(dispatch, libOpen, lib, legend)}>
        <img className="icon" src={LibraryIcon} alt="toggle" />
        <p className="text">{TextResources.Module_Library}</p>
      </ModuleHeader>
      <ModuleBody visible={libOpen}>
        <LibraryComponent
          categories={filteredCategories}
          search={(text: string) => setSearchString(text)}
          dispatch={dispatch}
          subProjects={libState?.subProjectTypes?.filter((x) => x.id !== project?.id)}
        />
      </ModuleBody>

      <AnimatedModule start={startLegend} stop={stopLegend} run={animateLegend} type={legend} id="LegendModule">
        <ModuleHeader legend>
          <LegendHeader open={legendOpen} onClick={() => OnLegendClick(dispatch, legendOpen, legend)}>
            <img src={LegendIcon} alt="legend" className="legend-icon" />
            <p className="legend-text">{TextResources.Module_Legend}</p>
          </LegendHeader>
        </ModuleHeader>
        <LegendModule visible={true} project={project} />
      </AnimatedModule>
    </AnimatedModule>
  );
};

export default LibraryModule;
