import styled from "styled-components";
import { FontSize } from "../../../compLibrary";

const InfoWrapper = styled.div`
  display: inline-flex;
  flex-direction: column;

  p {
    text-align: center;
    margin: 10px;
    font-size: ${FontSize.Medium};
  }

  img {
    margin: auto;
    padding: 2px 0px;
    min-width: 13px;
    min-height: 13px;
  }
`;

export default InfoWrapper;
