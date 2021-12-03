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
  top: 5px;
  margin-right: 27px;
  width: 50px;
  height: 45px;
  color: ${Color.White};
  font-weight: ${(props) => props.isOpen && FontWeight.Bold};
  cursor: pointer;

  .initials {
    position: relative;
    display: flex;
    z-index: 6;
    bottom: 2px;
    justify-content: center;
    color: ${Color.TextAvatar};
    font-size: calc(var(--avatar-size) / 2);
    font-weight: normal;
    line-height: 1;
  }

  .avatar {
    position: relative;
    display: flex;
    bottom: 45px;
  }

  .toggle-icon {
    position: relative;
    display: flex;
    align-self: flex-end;
    bottom: 64px;
    left: 12px;
  }
`;

export default AvatarBox;
