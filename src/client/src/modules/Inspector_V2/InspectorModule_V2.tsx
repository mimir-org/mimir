import {useState} from "react";

import {AnimatedModule} from "../../compLibrary/animated/AnimatedModule";
import {modulesSelector, useAppDispatch, useAppSelector} from "../../store";
import {ModuleType} from "../../lib";
import {Size} from "../../assets/size/Size";
import {MODULE_TYPE} from "../../models/project";
import {InspectorTab} from "../../models/enums/InspectorTab";
import {InspectorModuleHeader_V2} from "./header/InspectorModuleHeader_V2";
import {setModule} from "../../store/reducers/commonReducer";


export const InspectorModule_V2 = () => {
    const dispatch = useAppDispatch();

    const [activeTab, setActiveTab] = useState(InspectorTab.Admin)

    const modules = useAppSelector<ModuleType[]>(modulesSelector);
    const open = modules.some((x) => x === ModuleType.Inspector);
    const moduleType = MODULE_TYPE.INSPECTOR;

    return (
        <AnimatedModule
            start={open ? Size.MODULE_CLOSED : Size.MODULE_OPEN}
            stop={open ? Size.MODULE_OPEN : Size.MODULE_CLOSED}
            type={moduleType}
            id="InspectorModule"
        >
            <InspectorModuleHeader_V2
                moduleExpanded={open}
                activeTab={activeTab}
                setActiveTab={(tab: InspectorTab) => setActiveTab(tab)}
                onExpanded={() => dispatch(setModule({module: ModuleType.Inspector, open: !open}))}
            />

        </AnimatedModule>
    );
}