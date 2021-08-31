import styled from "styled-components";
import { DeleteIcon } from "../../../../assets/icons/common";
import { TextResources } from "../../../../assets/text";
import { Color, FontSize } from "../../../../compLibrary";

const ButtonContainer = styled.div`
  border: solid 1px ${Color.BlueMagenta};
  border-radius: 4px;
  font-size: ${FontSize.Standard};
  background-color: ${Color.White};
  width: 79px;
  height: 33px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  cursor: pointer;

  :hover {
    background-color: #e6e6e6;
  }
`;

const OuterButtonContainer = styled.div`
  padding-top: 10px;
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const DeleteNodeButton = ({ handleClick }) => (
  <OuterButtonContainer>
    <ButtonContainer onClick={() => handleClick()}>
      {TextResources.Inspector_Delete_Node}
      <img src={DeleteIcon} alt="delete" />
    </ButtonContainer>
  </OuterButtonContainer>
);

export default DeleteNodeButton;
