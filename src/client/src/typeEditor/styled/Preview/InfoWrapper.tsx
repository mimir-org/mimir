import styled from "styled-components";
import { FontSize } from "../../../compLibrary/font";

interface Props {
  namepadding?: boolean;
}

const InfoWrapper = styled.div<Props>`
  display: inline-flex;
  flex-direction: column;

  p {
    text-align: center;
    margin: 10px;
    font-size: ${FontSize.Medium};
  }

  .typeName {
    padding-bottom: ${(props) => props.namepadding && 15}px;
  }

  img {
    margin: auto;
    padding: 2px 0px;
    min-width: 13px;
    min-height: 13px;
  }
`;

export default InfoWrapper;
