import styled from "styled-components";
import { Color } from "../../../compLibrary/colors";

interface Props {
  active: boolean;
}

const LocationBox = styled.div<Props>`
  position: absolute;
  display: flex;
  bottom: -1px;
  left: 0px;
  height: 41px;
  width: 60px;
  border-right: 1px solid ${Color.Grey};
  background-color: ${(props) => props.active && Color.LocationHeader};

  &:hover {
    cursor: pointer;
    background-color: ${Color.BlueLight};
  }

  .logo {
    position: relative;
    margin: auto;
  }
`;

export default LocationBox;
