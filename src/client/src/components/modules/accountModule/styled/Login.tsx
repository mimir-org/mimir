import styled from "styled-components";
import { Color, FontSize, FontType } from "./../../../..//compLibrary";

const Login = styled.div`
  width: 200px;
  height: 40px;
  display: flex;
  flex-direction: row;
  align-items: center;
  background: ${Color.LightGrey};
  border: 1px solid ${Color.DeepCyan};
  border-radius: 2px;
  padding: 15px 25px;
  white-space: nowrap;
  cursor: pointer;
  font-family: ${FontType.Standard};
  font-size: ${FontSize.Header};
  color: ${Color.Black};
  margin: auto;
  margin-top: 12px;
  position: absolute;
  top: 25%;
  bottom: 25%;
  left: 25%;
  right: 25%;

  .icon {
    position: relative;
    padding: 0px 15px;
  }

  &:hover {
    border: 2px solid ${Color.DeepCyan};
  }
`;

export default Login;
