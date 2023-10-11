import {InspectorTab} from "models";
import {InspectorModuleHeaderStyled} from "./InspectorModuleHeader.styled";
import {ModuleTabs} from "components/menus/tabMenu/ModuleTabs";

interface Props {
    id: string;
    isModuleOpen: boolean;
    activeTab: InspectorTab;
    setActiveTab: (tab: InspectorTab) => void;
    setModuleOpenStatus: (isModuleOpen: boolean) => void;
}

export const InspectorModuleHeader = ({id, isModuleOpen, activeTab, setActiveTab, setModuleOpenStatus}: Props) => (
    <InspectorModuleHeaderStyled>
        <ModuleTabs id={id} activeTab={activeTab} setActiveTab={setActiveTab} onOpen={setModuleOpenStatus}/>
    </InspectorModuleHeaderStyled>
);