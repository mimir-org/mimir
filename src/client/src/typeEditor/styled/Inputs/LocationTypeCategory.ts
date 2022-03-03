import styled from "styled-components";
import { Color } from "../../../compLibrary/colors";
import { FontSize } from "../../../compLibrary/font";

const LocationTypeCategory = styled.div`
  display: flex;
  height: 31px;
  align-items: center;
  border-width: 1px 0px 1px 0px;
  border-style: solid;
  border-color: ${Color.GREY};
  font-size: ${FontSize.STANDARD};
  font-weight: bold;
  color: ${Color.BLACK};
  background-color: ${Color.WHITE};
  z-index: 1;

  p {
    text-align: left;
    padding: 5px;
  }
`;

export default LocationTypeCategory;
