import styled from "styled-components";
import { Color } from "../../../";

interface Props {
  disabled: boolean;
  fontSize?: string;
}

const DropdownMenuWrapper = styled.div<Props>`
  display: flex;
  flex-direction: column;
  flex: 1;
  margin-bottom: 10px;
  background-color: ${Color.White};
  opacity: ${(props) => (props.disabled ? 0.4 : 1)};
  font-size: ${(props) => props.fontSize};
  color: ${Color.Black};
  position: relative;

  .label {
    margin-bottom: 4px;
  }
`;

export default DropdownMenuWrapper;
