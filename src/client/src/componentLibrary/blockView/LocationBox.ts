import styled from "styled-components";

const LocationBox = styled.div`
  display: inline-block;
  margin-top: 60px;
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  max-width: 560px;
  max-height: 585px;
  margin-left: -135px;
  position: absolute;
`;

export default LocationBox;
