import styled from "styled-components";
import { Color } from "../../../../../../../../../../../compLibrary/colors";

interface EntityProps {
  width: number;
}

export const Entity = styled.div<EntityProps>`
  width: ${(props) => props.width}px;
  border-right: 1px solid ${Color.GreyDark};
`;
