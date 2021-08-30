import styled from "styled-components";
import { Color, FontSize, FontType } from "./../../../..//compLibrary";

const Login = styled.div`
  width: 80px;
  height: 15px;
  display: flex;
  flex-direction: row;
  align-items: center;
  background: ${Color.LightGrey};
  border: 1px solid ${Color.BlueMagenta};
  border-radius: 2px;
  padding: 15px 25px;
  white-space: nowrap;
  cursor: pointer;
  font-family: ${FontType.Standard};
  font-size: ${FontSize.Standard};
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
    padding: 0px 5px;
  }

  &:hover {
    border: 2px solid ${Color.BlueMagenta};
  }
`;

export default Login;
