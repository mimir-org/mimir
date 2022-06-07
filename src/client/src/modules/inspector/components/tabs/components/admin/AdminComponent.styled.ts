import styled from "styled-components";
import { Color } from "../../../../../../assets/color/Color";

export const AdminLogo = styled.img`
  padding: 20px;
  pointer-events: none;
`;

export const AdminContentWrapper = styled.div`
  display: flex;
  gap: 32px;
  width: 100%;
  height: 100%;
  min-width: 1400px;
  padding: 10px 20px;
  overflow-y: hidden;
  border-top: 1px solid ${Color.GAINSBORO};
`;
