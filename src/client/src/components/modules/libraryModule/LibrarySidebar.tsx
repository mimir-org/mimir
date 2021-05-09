import { TextResources } from "../../../assets/textResources";
import { LibNode } from "../../../models/project";
import GetIcon from "./helpers/GetIcon";
import {
  TextWrapper,
  IconWrapper,
  ContentWrapper,
  SearchBox,
  SearchIconWrapper,
} from "./styled";

interface Props {
  nodes: LibNode[];
}

const LibrarySidebar = ({ nodes }: Props) => {
  const onDragStart = (event, node) => {
    event.dataTransfer.setData("application/reactflow", node);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <>
      <SearchIconWrapper>{GetIcon("", "24")}</SearchIconWrapper>
      <SearchBox placeholder={TextResources.Library_SearchBox_Placeholder} />
      {nodes &&
        nodes.map((node) => {
          return (
            <ContentWrapper
              className="dndnode location"
              onDragStart={(event) => onDragStart(event, JSON.stringify(node))}
              key={node.id}
              draggable
            >
              <TextWrapper>{node.name}</TextWrapper>
              <IconWrapper>{GetIcon(node.icon, "30")}</IconWrapper>
            </ContentWrapper>
          );
        })}
    </>
  );
};

export default LibrarySidebar;
