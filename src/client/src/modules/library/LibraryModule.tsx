import { Dispatch } from "redux";
import { TextResources } from "../../assets/text";
import { LegendModule } from "../../modules/legend";
import { LibraryComponent } from "./index";
import { useState } from "react";
import { AnimatedModule } from "../../compLibrary/animated";
import { Size } from "../../compLibrary/size";
import { Icon } from "../../compLibrary/icon";
import { LegendHeader } from "../legend/styled";
import { LibHeader, ModuleBody, ModuleHeader } from "./styled";
import { MODULE_TYPE } from "../../models/project";
import { OnLegendClick, OnLibraryClick } from "./handlers";
import { LegendIcon, LibraryIcon } from "../../assets/icons/modules";
import {
  animatedModuleSelector,
  legendOpenSelector,
  libOpenSelector,
  useAppSelector,
  useParametricAppSelector,
} from "../../redux/store";
import { Project } from "../../models";

interface Props {
  project: Project;
  dispatch: Dispatch;
}

/**
 * Component for Mimir's type library and Legend Module (to be moved).
 * @param interface
 * @returns  a module with a drop-down of Types and a search input.
 */
const LibraryModule = ({ dispatch, project }: Props) => {
  const [searchString, setSearchString] = useState("");
  const lib = MODULE_TYPE.LIBRARY;
  const legend = MODULE_TYPE.LEGEND;

  const legendOpen = useAppSelector(legendOpenSelector);
  const animate = useParametricAppSelector(animatedModuleSelector, lib);
  const libOpen = useAppSelector(libOpenSelector);
  const animateLegend = useParametricAppSelector(animatedModuleSelector, legend);

  const startLib = libOpen ? Size.ModuleClosed : Size.ModuleOpen;
  const stopLib = libOpen ? Size.ModuleOpen : Size.ModuleClosed;
  const startLegend = legendOpen ? Size.ModuleClosed : Size.ModuleOpen;
  const stopLegend = legendOpen ? Size.ModuleOpen : Size.ModuleClosed;

  return (
    <AnimatedModule start={startLib} stop={stopLib} run={animate} type={lib} id="LibraryModule">
      <ModuleHeader>
        <LibHeader isOpen={libOpen} onClick={() => OnLibraryClick(dispatch, libOpen, lib, legend)}>
          <Icon size={24} src={LibraryIcon} alt="" />
          <span>{TextResources.Module_Library}</span>
        </LibHeader>
      </ModuleHeader>

      {libOpen && (
        <ModuleBody visible={libOpen}>
          <LibraryComponent
            search={(text: string) => setSearchString(text)}
            searchString={searchString}
            projectId={project?.id}
            dispatch={dispatch}
          />
        </ModuleBody>
      )}

      <AnimatedModule start={startLegend} stop={stopLegend} run={animateLegend} type={legend} id="LegendModule">
        <ModuleHeader>
          <LegendHeader isOpen={legendOpen} onClick={() => OnLegendClick(dispatch, legendOpen, legend)}>
            <Icon size={24} src={LegendIcon} alt="" />
            <span>{TextResources.Module_Legend}</span>
          </LegendHeader>
        </ModuleHeader>
        {legendOpen && <LegendModule project={project} />}
      </AnimatedModule>
    </AnimatedModule>
  );
};

export default LibraryModule;
