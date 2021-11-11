import styled from "styled-components";
import { Color } from "../../../compLibrary";

interface Props {
  isOpen: boolean;
}

const UserBox = styled.div<Props>`
  position: absolute;
  top: 20px;
  right: 0px;
  color: ${Color.White};
  font-weight: ${(props) => props.isOpen && "bold"};
  cursor: pointer;
`;

export default UserBox;
