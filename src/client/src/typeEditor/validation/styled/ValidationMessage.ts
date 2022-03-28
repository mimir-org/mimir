import { Color } from "../../../compLibrary/colors/Color";
import { FontSize } from "../../../compLibrary/font";
import styled from "styled-components";

const ValidationMessage = styled.span`
  margin-top: 5px;
  color: ${Color.ULTRA_RED};
  font-size: ${FontSize.STANDARD};

  :empty:before {
    content: "\\200b";
  }
}
`;

export default ValidationMessage;
