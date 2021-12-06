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
  min-width: 94px;
  height: 34px;
  background: ${Color.GreyLight};
  border: 1px solid ${Color.BlueMagenta};
  border-radius: 2px;
  margin: 10px 0px;
  padding-left: 5px;
  cursor: pointer;
  font-size: ${FontSize.Standard};
  color: ${Color.Black};

  .button-text {
    max-width: 260px;
    padding: 0px 5px;
    margin-right: ${(props) => (props.icon ? 14 : 0)}px;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    line-height: 1.5;
    overflow: hidden;
  }

  :active {
    border-width: 2px;
  }

  :hover {
    text-decoration: underline;
  }
`;

export default ButtonContainer;
