import styled from "styled-components";
import { Color } from "../../../compLibrary/colors";
import { FontSize } from "../../../compLibrary/font";

const LocationSubType = styled.div`
  display: flex;
  max-height: 31px;
  align-items: center;
  border-width: 1px 0px 0px 0px;
  border-style: solid;
  border-color: ${Color.GREY};
  font-size: ${FontSize.STANDARD};
  color: ${Color.BLACK};
  background-color: ${Color.WHITE};
  cursor: pointer;
  z-index: 1;

  p {
    padding: 5px;
    margin-left: 10px;
  }

  :hover {
    background-color: ${Color.BLUE_LIGHT};
    p {
      text-decoration: underline;
    }
  }
`;

export default LocationSubType;
