import styled from "styled-components";
import { Color } from "../../../compLibrary/colors";

interface Props {
  isOpen: boolean;
}

const UserBox = styled.div<Props>`
  position: absolute;
  top: 14px;
  right: 12px;
  color: ${Color.White};
  font-weight: ${(props) => props.isOpen && "bold"};
  cursor: pointer;

  .icon {
    position: relative;
    right: 20px;
    bottom: 5px;
  }

  .toggle-icon {
    position: relative;
    right: 7px;
    bottom: 20px;
  }

  .initials {
    position: absolute;
    right: 35px;
    bottom: 5px;
    color: #272838;
    font-size: 14px;
    font-weight: normal;
  }
`;

export default UserBox;
