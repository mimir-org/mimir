import styled from "styled-components";
import { FontSize } from "../../../../compLibrary";

interface Props {
  blockPaddingTop?: number;
}

const InfoWrapper = styled.div<Props>`
  display: inline-flex;
  flex-direction: column;
  padding-top: ${(props) => props.blockPaddingTop + `px`};

  p {
    padding: 0px 10px;
    text-align: center;
    margin: 10px 0px;
    font-size: ${FontSize.Medium};
  }

  img {
    margin: 2% 5%;
    max-height: 10%;
  }
`;

export default InfoWrapper;
