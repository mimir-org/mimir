import styled from "styled-components";
import { Color } from "../../../compLibrary/colors";
import { FontWeight } from "../../../compLibrary/font";

interface Props {
  isSelected: boolean;
}

const RdsListElement = styled.div<Props>`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 30px;
  padding-left: 7px;

  &:hover {
    background-color: ${Color.LightBlue} !important;
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
