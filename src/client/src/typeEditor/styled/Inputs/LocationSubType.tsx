import styled from "styled-components";
import { Color, FontSize } from "../../../compLibrary";

const LocationSubType = styled.div`
  display: flex;
  max-height: 31px;
  align-items: center;
  border-width: 1px 0px 0px 0px;
  border-style: solid;
  border-color: ${Color.Grey};
  font-size: ${FontSize.Standard};
  color: ${Color.Black};
  background-color: ${Color.White};
  cursor: pointer;
  z-index: 1;

  p {
    padding: 5px;
    margin-left: 10px;
  }

  :hover {
    background-color: ${Color.LightBlue};
    p {
      text-decoration: underline;
    }
  }
`;

export default LocationSubType;
