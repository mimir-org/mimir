import { TextResources } from "../../../assets/textResources";
import { LibNode } from "../../../models/project";
import GetIcon from "./helpers/GetIcon";
import { SearchIcon } from "../../../assets/icons";
import {
  LibraryBody,
  LibraryElement,
  SearchInput,
} from "../../../componentLibrary";

interface Props {
  nodes: LibNode[];
}

const LibrarySidebar = ({ nodes }: Props) => {
  const onDragStart = (event, node) => {
    event.dataTransfer.setData("application/reactflow", node);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <LibraryBody>
      <img src={SearchIcon} alt="search" className="search-icon" />
      <SearchInput placeholder={TextResources.Library_SearchBox_Placeholder} />
      {nodes &&
        nodes.map((node) => {
          return (
            <LibraryElement
              className="dndnode location"
              onDragStart={(event) => onDragStart(event, JSON.stringify(node))}
              key={node.id}
              draggable
            >
              {node.name}
              <div className="icon">{GetIcon(node.icon, "30")}</div>
            </LibraryElement>
          );
        })}
    </LibraryBody>
  );
};

export default LibrarySidebar;
