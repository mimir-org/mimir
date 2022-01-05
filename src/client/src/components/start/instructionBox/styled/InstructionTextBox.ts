import styled from "styled-components";
import { Color } from "../../../../compLibrary/colors";
import { FontSize, FontType } from "../../../../compLibrary/font";

const InstructionBox = styled.div`
  position: absolute;
  top: 183px;
  right: 200px;
  width: 236px;
  height: 95px;
  background-color: ${Color.BlueDark};
  display: flex;
  align-items: center;
  border: ${Color.White} solid 1px;
  border-radius: 5px;

  p {
    color: ${Color.White};
    font-family: ${FontType.Standard};
    font-size: ${FontSize.Header};
    padding: 18px;
  }

}
`;

export default InstructionBox;
