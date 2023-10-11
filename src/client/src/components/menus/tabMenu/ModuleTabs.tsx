import { LibraryTab, InspectorTab } from "../../../models";
import { enumToTabTextResourceName, activeTabEnum } from "../../../helpers/TabHelpers";
import { TabsWrapper, TabHeader, TabHeaderText } from "./ModuleTabs.styled";
import { ExpandButton } from "../../Buttons/ExpandButton";
interface Props {
  id: string;
  activeTab: LibraryTab | InspectorTab;
  setActiveTab: (tab: LibraryTab | InspectorTab) => void;
  onOpen: (state: boolean) => void;
  expandButtonText: string;
  expandButtonIcon: string;
}

/**
 * Tabs component in library module
 * @param interface
 * @returns every tab in library module
 */

export const ModuleTabs = ({ id, activeTab, setActiveTab, onOpen, expandButtonText, expandButtonIcon }: Props) => {
  const stringIsNumber = (v: string) => isNaN(Number(v)) === false;
  return (
    <TabsWrapper>
      <ExpandButton text={expandButtonText} icon={expandButtonIcon} offset={[0, 10]} onOpen={onOpen} />

      {Object.keys(activeTabEnum(id))
        .filter(stringIsNumber)
        .map((key) => {
          return (
            <div key={key} onClick={() => setActiveTab(Number(key) as LibraryTab | InspectorTab)}>
              <TabHeader key={key} isActive={activeTab === Number(key)}>
                <TabHeaderText>{enumToTabTextResourceName(Number(key) as LibraryTab | InspectorTab, id)}</TabHeaderText>
              </TabHeader>
            </div>
          );
        })}
    </TabsWrapper>
  );
};
