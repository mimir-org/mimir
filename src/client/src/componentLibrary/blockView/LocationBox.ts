import styled from "styled-components";

const LocationBox = styled.div`
  display: inline-flex;
  margin-top: 60px;

  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
  /* top: 60px;
  left: 750px; */
  /* position: absolute; */
`;

export default LocationBox;
