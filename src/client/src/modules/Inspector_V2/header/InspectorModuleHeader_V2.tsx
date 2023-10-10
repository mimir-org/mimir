import {InspectorTab} from "models";
import {InspectorModuleHeader_V2Styled} from "./InspectorModuleHeader_V2.styled";
import {ModuleTabs} from "components/menus/tabMenu/ModuleTabs";

interface Props {
    id: string;
    isModuleOpen: boolean;
    activeTab: InspectorTab;
    setActiveTab: (tab: InspectorTab) => void;
    setModuleOpenStatus: (isModuleOpen: boolean) => void;
}

export const InspectorModuleHeader_V2 = ({id, isModuleOpen, activeTab, setActiveTab, setModuleOpenStatus}: Props) => (
    <InspectorModuleHeader_V2Styled>
        <ModuleTabs id={id} activeTab={activeTab} setActiveTab={setActiveTab} onOpen={setModuleOpenStatus}/>
    </InspectorModuleHeader_V2Styled>
);