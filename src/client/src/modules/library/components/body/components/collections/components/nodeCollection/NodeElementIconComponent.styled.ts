import styled from "styled-components";
import { Color } from "../../../../../../../../compLibrary/colors/Color";

interface NodeElementIconContainerProps {
  color: string;
}

export const NodeElementIconContainer = styled.span<NodeElementIconContainerProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2px;
  height: 25px;
  width: 30px;
  background-color: ${Color.WHITE};
  box-shadow: inset 0 0 0 1px ${Color.BLACK};
  border: 3px solid ${(props: { color: string }) => props.color};
  border-radius: 5px;
`;
