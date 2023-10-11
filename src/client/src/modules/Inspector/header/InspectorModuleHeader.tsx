import {InspectorTab} from "models";
import {InspectorModuleHeaderStyled} from "./InspectorModuleHeader.styled";
import {ModuleTabs} from "components/menus/tabMenu/ModuleTabs";
import {TextResources} from "assets/text/TextResources";
import {ExpandButton} from "components/Buttons/ExpandButton";
// Temporary icon. We need a inspector module icon.
import {ExpandIcon} from "assets/icons/controls";

interface Props {
    id: string;
    isModuleOpen: boolean;
    activeTab: InspectorTab;
    setActiveTab: (tab: InspectorTab) => void;
    setModuleOpenStatus: (isModuleOpen: boolean) => void;
}

export const InspectorModuleHeader = ({id, isModuleOpen, activeTab, setActiveTab, setModuleOpenStatus}: Props) => (
    <InspectorModuleHeaderStyled>
        {!isModuleOpen ? (
            <ExpandButton text={TextResources.EXPAND} icon={ExpandIcon} offset={[0, 5]} onOpen={setModuleOpenStatus} />
        ) : (
            <ModuleTabs
                id={id}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                onOpen={setModuleOpenStatus}
                expandButtonText={TextResources.CLOSE}
                expandButtonIcon={ExpandIcon}
            />
        )}
    </InspectorModuleHeaderStyled>
);