import styled from "styled-components";
import { Color, FontSize, FontType } from "../../compLibrary";

const TypeNameInput = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 15%;
  margin-right: 25px;
  color: ${Color.Black};
  font-size: ${FontSize.Tiny};
  font-family: ${FontType.Standard};
  opacity: ${(props: { disabled: boolean }) => (props.disabled ? 0.4 : 1)};

  p {
    margin: 0px;
  }

  .label {
    margin-bottom: 7px;
  }

  input::placeholder {
    color: ${Color.Black};
    font-size: ${FontSize.Standard};
    font-family: ${FontType.Standard};
  }

  input {
    max-height: 27px;
    padding: 5px 0px 5px 9px;
  }
`;

export default TypeNameInput;
