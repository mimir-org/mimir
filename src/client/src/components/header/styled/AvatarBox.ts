import styled from "styled-components";
import { Color } from "../../../compLibrary/colors";

interface Props {
  isOpen: boolean;
}

const AvatarBox = styled.div<Props>`
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  top: 0px;
  right: 20px;
  color: ${Color.White};
  font-weight: ${(props) => props.isOpen && "bold"};
  cursor: pointer;

  .initials {
    position: relative;
    display: flex;
    z-index: 6;
    top: 5px;
    color: ${Color.TextAvatar};
    font-size: calc(var(--avatar-size) / 2);
    font-weight: normal;
    line-height: 1;
  }

  .profile {
    position: relative;
    display: flex;
    bottom: 38px;
  }

  .toggle-icon {
    position: relative;
    left: 28px;
    bottom: 56px;
  }
`;

export default AvatarBox;