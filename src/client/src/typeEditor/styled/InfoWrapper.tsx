import styled from "styled-components";
import { FontSize } from "../../compLibrary";

interface Props {
  blockPaddingTop?: number;
}

const InfoWrapper = styled.div<Props>`
  display: inline-flex;
  flex-direction: column;

  p {
    text-align: center;
    margin: 10px;
    font-size: ${FontSize.Medium};
  }

  img {
    margin: auto;
    padding: 3px 0px;
    min-width: 12px;
    min-height: 12px;
    max-width: 20px;
    max-height: 20px;
  }
`;

export default InfoWrapper;
