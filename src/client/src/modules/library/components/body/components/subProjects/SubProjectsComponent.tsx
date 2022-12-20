import { TextResources } from "../../../../../../assets/text/TextResources";
import { LibrarySubProjectItem } from "../../../../../../models";
import {
  SubProjectHeader,
  SubProjectsItemWrapper,
  SubProjectsText,
  SubProjectsWrapper,
  SubProjectItemContainer,
  SubProjectItem,
} from "./SubProjectsComponent.styled";
import { SubProjectCategory, Movable, Version, Latest } from "../../../../../../assets/icons/library";
import { Icon } from "../../../../../../compLibrary/icon/Icon";
import { useState } from "react";

interface SubProjectProps {
  items: LibrarySubProjectItem[];
}

export const SubProjectsComponent = ({ items }: SubProjectProps) => {
  const [selected, setSelected] = useState(null);

  return (
    <SubProjectsWrapper>
      {!items ||
        (items.length <= 0 && (
          <>
            <SubProjectsText>{TextResources.SUBPROJECTS_INFO}</SubProjectsText>
            <SubProjectsText>{TextResources.SUBPROJECTS_NONE}</SubProjectsText>
          </>
        ))}
      {items &&
        items.map((item) => {
          return (
            <SubProjectsItemWrapper>
              <SubProjectHeader key={item.id} id={item.id} selected={selected} onClick={() => setSelected(item.id)}>
                <Icon size={20} src={SubProjectCategory} alt={"Sub-project"} />
                <span>{item.name}</span>
                <span>v{item.version}</span>
                <Icon size={14} src={Version} alt={"Sub-project"} />
              </SubProjectHeader>
              <SubProjectComponentItem item={item} visible={selected === item.id} />
            </SubProjectsItemWrapper>
          );
        })}
    </SubProjectsWrapper>
  );
};

interface SubProjectItemProps {
  item: LibrarySubProjectItem;
  visible: boolean;
}

const SubProjectComponentItem = ({ item, visible }: SubProjectItemProps) => {
  return (
    <>
      {item && visible && (
        <SubProjectItemContainer>
          <SubProjectItem id={item.id} draggable>
            <Icon size={20} src={Latest} alt={"Sub-project"} />
            <span>{item.name}</span>
            <span>v{item.version}</span>
            <Icon size={14} src={Movable} alt={"Sub-project"} />
          </SubProjectItem>
          <SubProjectItem id={item.id} draggable>
            <Icon size={20} src={Latest} alt={"Sub-project"} />
            <span>{item.name}</span>
            <span>v{item.version}</span>
            <Icon size={14} src={Movable} alt={"Sub-project"} />
          </SubProjectItem>
          <SubProjectItem id={item.id} draggable>
            <Icon size={20} src={Latest} alt={"Sub-project"} />
            <span>{item.name}</span>
            <span>v{item.version}</span>
            <Icon size={14} src={Movable} alt={"Sub-project"} />
          </SubProjectItem>
        </SubProjectItemContainer>
      )}
    </>
  );
};
