import { useState } from "react";

import { AnimatedModule } from "compLibrary/animated/AnimatedModule";
import { modulesSelector, useAppDispatch, useAppSelector } from "store";
import { ModuleType } from "lib";
import { Size } from "assets/size/Size";
import { MODULE_TYPE } from "models/project";
import { InspectorTab } from "models";
import { InspectorModuleHeader } from "./header/InspectorModuleHeader";
import { setModule } from "store/reducers/commonReducer";
import { InspectorModuleBody } from "./body/InspectorModuleBody";

export const InspectorModule = () => {
  const dispatch = useAppDispatch();
  const modules = useAppSelector<ModuleType[]>(modulesSelector);
  const isModuleOpen = modules.some((x) => x === ModuleType.Inspector);
  const isLibraryModuleOpen = modules.some((x) => x === ModuleType.Library);
  const isExplorerModuleOpen = modules.some((x) => x === ModuleType.Explorer);
  const moduleType = MODULE_TYPE.INSPECTOR;

  const [activeTab, setActiveTab] = useState(InspectorTab.Admin);

  return (
    <AnimatedModule
      id="InspectorModule"
      start={isModuleOpen ? Size.MODULE_CLOSED : Size.MODULE_OPEN}
      stop={isModuleOpen ? Size.MODULE_OPEN : Size.MODULE_CLOSED}
      libOpen={isLibraryModuleOpen}
      explorerOpen={isExplorerModuleOpen}
      type={moduleType}
      isHorizontal={true}
    >
      <InspectorModuleHeader
        id="InspectorModule"
        isModuleOpen={isModuleOpen}
        activeTab={activeTab}
        setActiveTab={(tab: InspectorTab) => setActiveTab(tab)}
        setModuleOpenStatus={() => dispatch(setModule({ module: ModuleType.Inspector, open: !isModuleOpen }))}
      />

      <InspectorModuleBody isModuleOpen={isModuleOpen} activeTab={activeTab} />
    </AnimatedModule>
  );
};
