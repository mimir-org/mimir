import styled from "styled-components";
import { Color } from "../../../compLibrary/colors/Color";

interface Props {
  isSelected: boolean;
}

const SelectValue = styled.div<Props>`
  display: flex;
  flex-direction: column;
  position: relative;
  border-top: ${(props) => (props.isSelected ? "dashed 1px" + Color.LIGHT_SILVER : 0)};
`;

export default SelectValue;
