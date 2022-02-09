import styled from "styled-components";
import { Color } from "../../../compLibrary/colors";
import { FontSize } from "../../../compLibrary/font";

interface Props {
  disabled: boolean;
  bottomLine: boolean;
}

const ProjectMenuElementBox = styled.button<Props>`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
  width: 100%;
  background: transparent;
  padding: 10px 20px;
  cursor: pointer;
  border-width: 0;
  color: ${Color.BlueMagenta};
  border-bottom: ${(props) => (props.bottomLine ? 1 : 0)}px solid ${Color.Grey};
  text-align: left;

  :disabled {
    cursor: not-allowed;
  }

  :hover:not(:disabled) {
    background-color: ${Color.BlueLight};
    text-decoration: underline;
  }

  > span {
    font-size: ${FontSize.Standard};
  }

  :last-child {
    border-radius: 0 0 10px 10px;
  }
`;

export default ProjectMenuElementBox;
