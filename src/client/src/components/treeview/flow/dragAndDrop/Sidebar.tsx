import textResources from "../../../../textResources";
import { LibNode } from '../../../../models/project';
import {
  ProductIcon,
  FunctionIcon,
  LocationIcon,
  SearchIcon,
} from "../../../../assets";
import {
  TextWrapper,
  IconWrapper,
  ContentWrapper,
  SearchBox,
  SearchIconWrapper,
} from "../../../modules/libraryModule/styled";

interface Props {
    nodes: LibNode[];
}

const icon = (icon: string) => {
    switch(icon) {
      case "FunctionIcon":
        return <img src={FunctionIcon} width="30px" height="30px" alt="func-icon" />
      case "ProductIcon":
          return <img src={ProductIcon} width="30px" height="30px" alt="prod-icon" />
      case "LocationIcon":
          return <img src={LocationIcon} width="30px" height="30px" alt="loc-icon" />
      default:
          return <img src={SearchIcon} width="30px" height="30px" alt="search-icon" />
    }
  } 

const Sidebar = ({ nodes }: Props) => {

  const onDragStart = (event, node) => {
    event.dataTransfer.setData("application/reactflow", node);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <>
      <SearchIconWrapper>
        <img src={SearchIcon} width="24px" height="24px" alt="search-icon" />
      </SearchIconWrapper>
      <SearchBox placeholder={textResources.Library_SearchBox_Placeholder} />

      {/* <ContentWrapper
        className="dndnode function"
        onDragStart={(event) => onDragStart(event, "function")}
        draggable
      >
        <TextWrapper>{textResources.Library_Function}</TextWrapper>
        <IconWrapper>
          <img src={FunctionIcon} width="30px" height="30px" alt="func-icon" />
        </IconWrapper>
      </ContentWrapper> */}

      {/* <ContentWrapper
        className="dndnode product"
        onDragStart={(event) => onDragStart(event, "product")}
        draggable
      >
        <TextWrapper>{textResources.Library_Product}</TextWrapper>
        <IconWrapper>
          <img src={ProductIcon} width="30px" height="30px" alt="func-icon" />
        </IconWrapper>
      </ContentWrapper> */}

      {/* <ContentWrapper
        className="dndnode location"
        onDragStart={(event) => onDragStart(event, "location")}
        draggable
      >
        <TextWrapper>{textResources.Library_Location}</TextWrapper>
        <IconWrapper>
          <img src={LocationIcon} width="30px" height="30px" alt="func-icon" />
        </IconWrapper>
      </ContentWrapper> */}

    {nodes && nodes.map(node => {
        return <ContentWrapper className="dndnode location" onDragStart={(event) => onDragStart(event, JSON.stringify(node))} key={node.id} draggable>
        <TextWrapper>{node.name}</TextWrapper>
        <IconWrapper>
          {icon(node.icon)}
        </IconWrapper>
      </ContentWrapper>
    })}

    </>
  );
};

export default Sidebar;
