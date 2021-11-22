import styled from "styled-components";
import { Color } from "../../colors";
import { FontSize } from "../../font";

interface Props {
  disabled: boolean;
}

const DropdownMenuWrapper = styled.div<Props>`
  display: flex;
  flex-direction: column;
  flex: 1;
  margin-right: 15px;
  background-color: ${Color.White};
  opacity: ${(props) => (props.disabled ? 0.4 : 1)};
  font-size: ${FontSize.Standard};
  color: ${Color.Black};
  position: relative;

  .label {
    margin-bottom: 4px;
  }
`;

export default DropdownMenuWrapper;
