import {InspectorTab} from "../../../models";
import {InspectorModuleAttributes} from "./components/attributes/InspectorModuleAttributes";
import {InspectorModuleAdmin} from "./components/admin/InspectorModuleAdmin";
import {InspectorModuleTerminalAttributes} from "./components/terminalAttributes/InspectorModuleTerminalAttributes";
import {InspectorModuleRelations} from "./components/relations/InspectorModuleRelations";
import {InspectorModuleBodyStyled} from "./InspectorModuleBody.styled";

interface Props {
    isModuleOpen: boolean;
    activeTab: InspectorTab;
}
export const InspectorModuleBody = ({isModuleOpen, activeTab}: Props) => {
    const bodyComponents = {
        [InspectorTab.Admin]: <InspectorModuleAdmin/>,
        [InspectorTab.Attributes]: <InspectorModuleAttributes />,
        [InspectorTab.TerminalAttributes]: <InspectorModuleTerminalAttributes />,
        [InspectorTab.Relations]: <InspectorModuleRelations />
    }
    return (
        <InspectorModuleBodyStyled>
            {bodyComponents[activeTab]}
        </InspectorModuleBodyStyled>

    );
};
