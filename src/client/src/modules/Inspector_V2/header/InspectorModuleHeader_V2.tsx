import {InspectorTab} from "../../../models/enums/InspectorTab";
import {InspectorModuleTabSection_V2} from "./components/InspectorModuleTabSection_V2";
import {Button} from "@mimirorg/component-library";
import {InspectorModuleHeader_V2Styled} from "./InspectorModuleHeader_V2.styled";

interface Props {
    isModuleOpen: boolean,
    activeTab: InspectorTab,
    setActiveTab: (tab: InspectorTab) => void,
    setModuleOpenStatus: (isModuleOpen: boolean) => void;
}

export const InspectorModuleHeader_V2 = ({isModuleOpen, activeTab, setActiveTab, setModuleOpenStatus}: Props) => (
    <InspectorModuleHeader_V2Styled>
        <Button onClick={() => {setModuleOpenStatus(!isModuleOpen)}}></Button>
    </InspectorModuleHeader_V2Styled>
);