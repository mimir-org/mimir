import styled from "styled-components";
import { TrashIcon } from "../../../../assets/icons/common";
import { TextResources } from "../../../../assets/textResources";
import { Color, FontSize } from "../../../../compLibrary";

const ButtonContainer = styled.div`
  border: solid 1px ${Color.DeepCyan};
  border-radius: 2px;
  font-size: ${FontSize.Standard};
  width: 79px;
  height: 34px;
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
      <img src={TrashIcon} alt="delete" />
    </ButtonContainer>
  </OuterButtonContainer>
);

export default DeleteNodeButton;
