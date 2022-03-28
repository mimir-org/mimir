import styled from "styled-components";
import { Color } from "../../../compLibrary/colors/Color";
import { FontSize, FontWeight } from "../../../compLibrary/font";

interface AvatarBoxProps {
  isOpen: boolean;
}

export const AvatarComponentContainer = styled.div`
  flex-shrink: 0;
  position: relative;
  height: 100%;
  padding-right: 15px;
`;

export const AvatarButton = styled.button<AvatarBoxProps>`
  display: flex;
  align-items: center;
  gap: 10px;
  height: 100%;
  padding: 0;
  border: 0;
  color: ${Color.WHITE};
  font-weight: ${(props) => props.isOpen && FontWeight.BOLD};
  cursor: pointer;
  background: transparent;
`;

export const AvatarCircle = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const AvatarInitials = styled.p`
  position: absolute;
  margin: 0;
  color: ${Color.BLACK_ROCK};
  font-size: ${FontSize.STANDARD};
  font-weight: ${FontWeight.NORMAL};
`;
