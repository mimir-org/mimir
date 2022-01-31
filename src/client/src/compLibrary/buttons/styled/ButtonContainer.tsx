import styled from "styled-components";
import { Color } from "../../colors";
import { FontSize } from "../../font";

interface Props {
  icon: boolean;
}

const ButtonContainer = styled.button<Props>`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 10px;
  height: 35px;
  background: ${Color.GreyLight};
  border: 1px solid ${Color.BlueMagenta};
  border-radius: 2px;
  padding: 10px 20px;
  cursor: pointer;
  font-size: ${FontSize.Standard};
  color: ${Color.Black};

  > span {
    max-width: 260px;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    line-height: 1.5;
    overflow: hidden;
  }

  :disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  :active {
    border-width: 2px;
  }

  :hover:not(:disabled) {
    text-decoration: underline;
  }
`;

export default ButtonContainer;
