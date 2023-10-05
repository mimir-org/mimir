import {InspectorTab} from "../../../models/enums/InspectorTab";
import {InspectorModuleTabSection_V2} from "./components/InspectorModuleTabSection_V2";
import {Button} from "@mimirorg/component-library";

interface Props {
    moduleExpanded: boolean,
    activeTab: InspectorTab,
    setActiveTab: (tab: InspectorTab) => void,
    onExpanded: () => void;
}

export const InspectorModuleHeader_V2 = ({moduleExpanded, activeTab, setActiveTab, onExpanded}: Props) => (
    <>
        {!moduleExpanded ? (
            <Button/>
        ) : (
            <InspectorModuleTabSection_V2
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                onOpen={onExpanded}
            />
        )}
    </>
);