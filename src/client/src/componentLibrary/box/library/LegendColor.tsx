import styled from "styled-components";

const TransportColor = styled.div`
  margin: 25px 0px 0px 45px;
  width: 90px;
  position: absolute;
  right: 30px;
  height: 2px;
  background-color: ${(props: { color: String }) => props.color};
`;

export default TransportColor;
