import { LibraryTab } from "../../../../../models";
import { ConvertToLibTabName } from "./helpers/ConvertToLibTabName";
import { LibraryTabsWrapper, LibraryTabHeader, LibraryTabHeaderText } from "./ModuleTabs.styled";
import { ExpandButton } from "./ExpandButton";
import { TextResources } from "../../../../../assets/text/TextResources";

interface Props {
  activeTab: LibraryTab;
  setActiveTab: (tab: LibraryTab) => void;
  onOpen: (state: boolean) => void;
}

/**
 * Tabs component in library module
 * @param interface
 * @returns every tab in library module
 */

export const ModuleTabs = ({ activeTab, setActiveTab, onOpen }: Props) => {
  const stringIsNumber = (v: string) => isNaN(Number(v)) === false;

  return (
    <LibraryTabsWrapper>
      <ExpandButton text={TextResources.CLOSE_LIB_PANEL} offset={[0, 10]} onOpen={onOpen} />

      {Object.keys(LibraryTab)
        .filter(stringIsNumber)
        .map((key) => {
          return (
            <div key={key} onClick={() => setActiveTab(Number(key) as LibraryTab)}>
              <LibraryTabHeader key={key} isActive={activeTab === Number(key)}>
                <LibraryTabHeaderText>{ConvertToLibTabName(Number(key) as LibraryTab)}</LibraryTabHeaderText>
              </LibraryTabHeader>
            </div>
          );
        })}
    </LibraryTabsWrapper>
  );
};
