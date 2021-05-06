import styled from "styled-components";

const LocationBlockWrapper = styled.div`
  width: ${(props: { width: number }) => props.width + "px"};
  height: ${(props: { height: number }) => props.height + "px"};
  line-height: 40px;
`;

export default LocationBlockWrapper;
