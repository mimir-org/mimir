import styled from "styled-components";
import { Color } from "../../../compLibrary/colors/Color";
import { FontWeight } from "../../../compLibrary/font";

interface Props {
  isSelected: boolean;
}

const RdsListElement = styled.div<Props>`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 15px;
  height: 30px;
  padding: 2px 5px;

  &:hover {
    background-color: ${Color.LAVANDER_WEB_HOVER} !important;
  }

  label {
    text-decoration: ${(props) => props.isSelected && "underline"};
    font-weight: ${(props) => props.isSelected && FontWeight.BOLD};
  }
`;

export default RdsListElement;
