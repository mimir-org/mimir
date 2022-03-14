import styled from "styled-components";
import { Color } from "../../../compLibrary/colors/Color";
import { FontSize, FontType } from "../../../compLibrary/font";

interface Props {
  disabled?: boolean;
}

const TypeNameInput = styled.div<Props>`
  display: flex;
  flex-direction: column;
  min-width: 15%;
  margin-right: 25px;
  color: ${Color.BLACK};
  font-size: ${FontSize.TINY};
  font-family: ${FontType.STANDARD};
  opacity: ${(props) => (props.disabled ? 0.4 : 1)};

  p {
    margin: 0;
  }

  .label {
    margin-bottom: 7px;
  }

  input::placeholder {
    color: ${Color.BLACK};
    font-size: ${FontSize.STANDARD};
    font-family: ${FontType.STANDARD};
  }

  input {
    max-height: 27px;
    padding: 5px 10px;
  }
`;

export default TypeNameInput;
