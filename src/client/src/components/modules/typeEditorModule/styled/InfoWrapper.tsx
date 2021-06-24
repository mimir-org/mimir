import styled from "styled-components";
import { FontSize } from "../../../../compLibrary";

const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: ${(props: { blockPaddingTop: number }) =>
    props.blockPaddingTop + `px`};

  p {
    padding: 0px 10px;
    text-align: center;
    margin: 10px 0px;
    font-size: ${FontSize.Medium};
  }
`;

export default InfoWrapper;
