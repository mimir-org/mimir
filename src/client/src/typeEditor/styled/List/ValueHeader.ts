import styled from "styled-components";
import { Color } from "../../../compLibrary/colors";
import { FontSize } from "../../../compLibrary/font";

interface Props {
  multiSelect: boolean;
}

const ValueHeader = styled.div<Props>`
  display: flex;
  flex-direction: row;
  align-items: center;
  flex: 1;
  width: 307px;
  min-height: 20px;
  border: 1px solid ${Color.Black};
  border-radius: 5px;
  margin: 5px 0 5px 30px;
  padding: 2px 5px;
  background-color: ${Color.White};

  .selectedValues {
    max-height: 20px;
    max-width: 300px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    text-transform: ${(props) => props.multiSelect && "capitalize"};

    //margin: 2px 13px 2px 13px;
    font-size: ${FontSize.Medium};
    color: ${Color.Black};
  }

  .selectedValues::first-letter {
    text-transform: capitalize;
  }

  img {
    margin-left: auto;
    width: 10px;
    height: 6px;
  }
`;

export default ValueHeader;
