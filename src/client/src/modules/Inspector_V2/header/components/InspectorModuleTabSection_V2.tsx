import {Inspector_V2TabsWrapper} from "./InspectorModuleTabSection_V2.styled";
import {InspectorTab} from "models/enums/InspectorTab";

interface Props {
    activeTab: InspectorTab,
    setActiveTab: (tab: InspectorTab) => void,
    onOpen: () => void;
}

export const InspectorModuleTabSection_V2 = ({activeTab, setActiveTab, onOpen}: Props) => (
    <Inspector_V2TabsWrapper>

    </Inspector_V2TabsWrapper>
);