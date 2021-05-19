import styled from "styled-components";

const LocationBox = styled.div`
  display: inline-block;
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
  top: 60px;
  left: 466px;
  position: absolute;
`;

export default LocationBox;
