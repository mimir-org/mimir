import styled from "styled-components";
import { Color } from "../../../../../../../../../../../assets/color/Color";

interface EntityProps {
  width: number;
}

export const Entity = styled.div<EntityProps>`
  width: ${(props) => props.width}px;
  border-right: 1px solid ${Color.LIGHT_SILVER};
`;
