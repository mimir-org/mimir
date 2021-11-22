import styled from "styled-components";
import { Color } from "../../../colors";
import { FontSize } from "../../../font";

const DropdownMenuWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 15%;
  margin-right: 25px;
  background-color: ${Color.White};
  opacity: ${(props: { disabled: boolean }) => (props.disabled ? 0.4 : 1)};
  font-size: ${FontSize.Tiny};
  color: ${Color.Black};
  position: relative;

  .dropdown-label {
    margin-bottom: 7px;
  }
`;

export default DropdownMenuWrapper;
