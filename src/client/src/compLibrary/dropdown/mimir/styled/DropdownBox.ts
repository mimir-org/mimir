import styled from "styled-components";
import { Color } from "../../../colors";

interface Props {
  disabled: boolean;
  fontSize?: string;
}

const DropdownBox = styled.div<Props>`
  display: flex;
  flex-direction: column;
  flex: 1;
  position: relative;
  width: 100%;
  margin-bottom: 10px;
  background-color: ${Color.White};
  opacity: ${(props) => (props.disabled ? 0.4 : 1)};
  font-size: ${(props) => props.fontSize};
  color: ${Color.Black};

  .label {
    margin-bottom: 4px;
  }
`;

export default DropdownBox;
