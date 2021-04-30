import styled from "styled-components";

const TransportColor = styled.div`
  width: 90px;
  height: 2px;
  background-color: ${(props: { color: String }) => "#" + props.color};
`;

export default TransportColor;
