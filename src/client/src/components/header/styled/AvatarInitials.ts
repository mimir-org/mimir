import styled from "styled-components";
import { Color } from "../../../compLibrary/colors";
import { FontWeight } from "../../../compLibrary/font";

const AvatarInitials = styled.p`
  position: relative;
  display: flex;
  z-index: 6;
  bottom: 42px;
  color: ${Color.TextAvatar};
  font-size: calc(var(--avatar-size) / 2);
  font-weight: ${FontWeight.Normal};
  line-height: 1;
`;

export default AvatarInitials;
