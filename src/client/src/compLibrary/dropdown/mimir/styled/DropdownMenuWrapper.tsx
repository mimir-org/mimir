import styled from "styled-components";
import { Color } from "../../../";

const DropdownMenuWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  margin-bottom: 10px;
  background-color: ${Color.White};
  opacity: ${(props: { disabled: boolean }) => (props.disabled ? 0.4 : 1)};
  font-size: ${(props: { fontSize: string }) => props.fontSize};
  color: ${Color.Black};
  position: relative;

  .label {
    margin-bottom: 4px;
  }
`;

export default DropdownMenuWrapper;
