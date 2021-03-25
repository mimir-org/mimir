import { ProductIcon, FunctionIcon, LocationIcon } from "../../../../assets/";
import textResources from "../../../../textResources";
import {
  TextWrapper,
  IconWrapper,
  ContentWrapper,
} from "../../../modules/libraryModule/styled";

const Sidebar = () => {
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <>
      <ContentWrapper
        className="dndnode function"
        onDragStart={(event) => onDragStart(event, "function")}
        draggable
      >
        <TextWrapper>{textResources.Library_Function}</TextWrapper>
        <IconWrapper>
          <img src={FunctionIcon} width="30px" height="30px" alt="func-icon" />
        </IconWrapper>
      </ContentWrapper>

      <ContentWrapper
        className="dndnode product"
        onDragStart={(event) => onDragStart(event, "product")}
        draggable
      >
        <TextWrapper>{textResources.Library_Product}</TextWrapper>
        <IconWrapper>
          <img src={ProductIcon} width="30px" height="30px" alt="func-icon" />
        </IconWrapper>
      </ContentWrapper>

      <ContentWrapper
        className="dndnode location"
        onDragStart={(event) => onDragStart(event, "location")}
        draggable
      >
        <TextWrapper>{textResources.Library_Location}</TextWrapper>
        <IconWrapper>
          <img src={LocationIcon} width="30px" height="30px" alt="func-icon" />
        </IconWrapper>
      </ContentWrapper>
    </>
  );
};

export default Sidebar;
