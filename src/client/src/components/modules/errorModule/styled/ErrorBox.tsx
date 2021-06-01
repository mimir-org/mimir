import styled from "styled-components";
import { Color, FontSize } from "./../../../..//componentLibrary";

const ErrorBox = styled.div`
  width: 400px;
  height: 200px;
  margin: auto;
  border: 2px solid ${Color.Red};
  background-color: ${Color.White};
  box-shadow: 0px 5px 6px rgba(0, 0, 0, 0.15);
  border-radius: 5px;
  font-weight: bold;
  font-size: ${FontSize.Header};
  position: absolute;
  top: 25%;
  bottom: 25%;
  left: 25%;
  right: 25%;
  padding: 20px;
  visibility: ${(props) => !props.visible && "hidden"};
  z-index: 5000;
`;

export default ErrorBox;
