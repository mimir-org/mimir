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
  right: 28px;
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

  .avatar {
    position: absolute;
    top: 10px;
  }

  .toggle-icon {
    position: absolute;
    top: 25px;
    left: 35px;
  }
`;

export default AvatarBox;
