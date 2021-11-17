import styled from "styled-components";
import { Color } from "../../../../compLibrary/colors";

const AvatarBox = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  bottom: 0px;
  right: 19px;
  color: ${Color.White};

  .initials {
    position: relative;
    display: flex;
    top: 27px;
    z-index: 6;
    color: ${Color.TextAvatar};
    font-size: calc(var(--avatar-size) / 2);
    font-weight: normal;
    line-height: 1;
  }

  .profile {
    position: relative;
    display: flex;
    bottom: 16px;
  }
`;

export default AvatarBox;
