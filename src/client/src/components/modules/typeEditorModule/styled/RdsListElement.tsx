import styled from "styled-components";
import { Color, FontWeight } from "../../../../compLibrary";

interface Props {
  isSelected: boolean;
}

const RdsListElement = styled.div<Props>`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 30px;
  padding-left: 7px;

  :hover {
    // not working
    background-color: ${Color.LightBlue};
  }

  label:hover {
    text-decoration: underline;
    cursor: pointer;
  }

  label {
    text-decoration: ${(props) => props.isSelected && "underline"};
    font-weight: ${(props) => props.isSelected && FontWeight.Bold};
  }
`;

export default RdsListElement;
