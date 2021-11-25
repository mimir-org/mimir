import styled from "@emotion/styled";
import { Color } from "../../../compLibrary/colors";
import { FontSize } from "../../../compLibrary/font";

const ValidationMessage = styled.span`
  margin-top: 5px;
  color: ${Color.WarningRed};
  font-size: ${FontSize.Standard};

  :empty:before {
    content: "\\200b";
  }
}
`;

export default ValidationMessage;
