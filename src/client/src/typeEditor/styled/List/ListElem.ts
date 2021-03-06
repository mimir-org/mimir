import styled from "styled-components";
import { FontWeight } from "../../../compLibrary/font";

interface Props {
  isSelected: boolean;
}

const ListElem = styled.div<Props>`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 30px;
  padding: 2px 5px;

  label {
    text-decoration: ${(props) => props.isSelected && "underline"};
    font-weight: ${(props) => props.isSelected && FontWeight.BOLD};
  }
`;

export default ListElem;
