import styled from "styled-components";
import { Color } from "../../../colors";
import ParameterInputsWrapper from "../../../../modules/inspector/tabs/parameters/styled/parameter/ParameterInputsWrapper";

interface Props {
  disabled: boolean;
  fontSize?: string;
}

const DropdownBox = styled.div<Props>`
  display: flex;
  flex-direction: column;
  position: relative;
  width: 100%;
  margin-bottom: 10px;
  background-color: ${Color.White};
  opacity: ${(props) => (props.disabled ? 0.4 : 1)};
  font-size: ${(props) => props.fontSize};
  color: ${Color.Black};

  ${ParameterInputsWrapper} & {
    flex: 1;
  }
`;

export default DropdownBox;
