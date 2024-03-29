import styled from "styled-components";
import { Color } from "../../assets/color/Color";

interface AppBoxProps {
  fetching: boolean;
}

export const AppBox = styled.div<AppBoxProps>`
  width: 100%;
  height: 100%;
  background: ${(props) => props.fetching && Color.GAINSBORO};
  opacity: ${(props) => props.fetching && 0.2};
`;

export const LoginBox = styled.div`
  width: 100px;
  height: 40px;
  display: none;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin: auto;
  position: absolute;
  top: 25%;
  bottom: 25%;
  left: 25%;
  right: 25%;
`;
