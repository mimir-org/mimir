import styled from "styled-components";
import { Color, FontSize, FontType } from "../../../../compLibrary";

const TypeNameInput = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  margin-right: 15px;
  color: ${Color.Black};
  font-size: ${FontSize.Standard};
  font-family: ${FontType.Standard};
  margin-top: -14px;
  opacity: ${(props: { disabled: boolean }) => (props.disabled ? 0.4 : 1)};

  p {
    margin-bottom: 4px;
  }

  input::placeholder {
    color: ${Color.Black};
    font-size: ${FontSize.Standard};
    font-family: ${FontType.Standard};
  }
`;

export default TypeNameInput;
