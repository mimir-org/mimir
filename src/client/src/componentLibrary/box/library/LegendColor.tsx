import styled from "styled-components";

const TransportColor = styled.div`
  display: flex;
  margin: 20px 5px 0px 0px;
  width: 90px;
  height: 2px;
  background-color: ${(props: { color: string }) => props.color};
`;

export default TransportColor;
