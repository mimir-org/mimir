import styled from "styled-components";
import { ProductIcon, FunctionIcon, LocationIcon } from "../../../../assets/";

const StyledBendik = styled.div`
  width: 294px;
  height: 41px;
  border: 1px solid #444;
  background-color: #fff;
  margin-bottom: 5px;
`;

const IconWrapper = styled.div`
  float: right;
  margin-right: 5px;
  margin-top: 5px;
`;

const TextWrapper = styled.div`
  font-family: roboto;
  display: inline;
  padding: 10px;
  position: absolute;
  size: 18px;
`;

const Sidebar = () => {
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <>
      <StyledBendik
        className="dndnode function"
        onDragStart={(event) => onDragStart(event, "function")}
        draggable
      >
        <TextWrapper>Function</TextWrapper>
        <IconWrapper>
          <img src={FunctionIcon} width="30px" height="30px" alt="func-icon" />
        </IconWrapper>
      </StyledBendik>

      <StyledBendik
        className="dndnode product"
        onDragStart={(event) => onDragStart(event, "product")}
        draggable
      >
        <TextWrapper>Product</TextWrapper>
        <IconWrapper>
          <img src={ProductIcon} width="30px" height="30px" alt="func-icon" />
        </IconWrapper>
      </StyledBendik>

      <StyledBendik
        className="dndnode location"
        onDragStart={(event) => onDragStart(event, "location")}
        draggable
      >
        <TextWrapper>Location</TextWrapper>
        <IconWrapper>
          <img src={LocationIcon} width="30px" height="30px" alt="func-icon" />
        </IconWrapper>
      </StyledBendik>
    </>
  );
};

export default Sidebar;
