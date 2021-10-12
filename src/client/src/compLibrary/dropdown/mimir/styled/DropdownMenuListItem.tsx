import styled from "styled-components";
import { Color } from "../../../";

interface Props {
  height: number;
  borderColor: string;
  borderRadius: number;
  fontSize: string;
  hasCategory?: boolean;
}

const DropdownMenuListItem = styled.div<Props>`
  display: flex;
  height: ${(props) => props.height}px;
  align-items: center;
  border-width: 1px 0px 0px 0px;
  border-style: solid;
  border-color: ${(props) => props.borderColor};
  font-size: ${(props) => props.fontSize};
  color: ${Color.Black};
  background-color: ${Color.White};
  cursor: pointer;
  z-index: 1;

  p {
    padding: 5px;
    margin-left: ${(props) => props.hasCategory && "10px"};
  }

  img {
    margin-left: 5px;
    margin-right: 10px;
    height: 14px;
  }

  :hover {
    background-color: ${Color.LightBlue};

    p {
      text-decoration: underline;
    }
  }
`;

export default DropdownMenuListItem;
