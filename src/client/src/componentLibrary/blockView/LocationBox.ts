import styled from "styled-components";

const LocationBox = styled.div`
  position: absolute;
  top: 60px;
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  left: 546px;
`;

export default LocationBox;
