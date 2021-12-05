import styled from "styled-components";
import { Color } from "../../../compLibrary/colors";
import { FontWeight } from "../../../compLibrary/font";

interface Props {
  isOpen: boolean;
}

const AvatarBox = styled.div<Props>`
  position: relative;
  display: flex;
  flex-direction: column;
  margin-right: 25px;
  width: 50px;
  height: 54px;
  color: ${Color.White};
  font-weight: ${(props) => props.isOpen && FontWeight.Bold};
  cursor: pointer;

  .toggle-icon {
    position: relative;
    display: flex;
    align-self: flex-end;
    left: 10px;
  }
`;

export default AvatarBox;
