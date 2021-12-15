import styled from "styled-components";
import { Color } from "../../../colors";
import { FontWeight } from "../../../font";

interface Props {
  height: number;
  borderRadius: number;
  fontSize: string;
  hasCategory?: boolean;
}

const DropdownListItem = styled.div<Props>`
  display: flex;
  height: ${(props) => props.height}px;
  align-items: center;
  border-width: 0px 0px 1px 0px;
  border-style: solid;
  border-color: ${Color.GreyDark};
  font-size: ${(props) => props.fontSize};
  color: ${Color.Black};
  background-color: ${Color.White};
  cursor: pointer;
  z-index: 1;

  p {
    padding: 5px 10px;
    margin-left: ${(props) => props.hasCategory && "10px"};
    font-weight: ${FontWeight.Normal};
  }

  img {
    margin-left: 5px;
    margin-right: 10px;
    height: 14px;
  }

  :hover {
    background-color: ${Color.BlueLight};

    p {
      text-decoration: underline;
    }
  }

  :last-child {
    border-width: 0px;
  }
`;

export default DropdownListItem;
