import styled from "styled-components";
import { Color } from "../../../../../../../../assets/color/Color";
import { FontSize } from "../../../../../../../../assets/font";

interface Props {
  disabled: boolean;
}

export const AttributesDropdownBox = styled.div<Props>`
  display: flex;
  flex-direction: column;
  flex: 1;
  position: relative;
  width: auto;
  margin-bottom: 10px;
  background-color: ${Color.TEA_GREEN};
  opacity: ${(props) => (props.disabled ? 0.4 : 1)};
  font-size: ${FontSize.SMALL};
  color: ${Color.BLACK};
`;
