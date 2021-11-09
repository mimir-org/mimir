import styled from "styled-components";
import { Color } from "../../../compLibrary";

const LocationBox = styled.div`
  position: absolute;
  display: flex;
  bottom: -1px;
  left: 0px;
  height: 41px;
  width: 60px;
  border-right: 1px solid ${Color.Grey};

  &:hover {
    cursor: pointer;
    background-color: ${Color.LightBlue};
  }

  .logo {
    position: relative;
    margin: auto;
  }
`;

export default LocationBox;
