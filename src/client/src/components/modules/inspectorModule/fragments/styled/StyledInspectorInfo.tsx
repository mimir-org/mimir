import styled from "styled-components";

const InspectorInfo = styled.div`
  background-color: ${(props: { color: string }) => props.color};
  width: 20%;
  height: 100px;
  position: absolute;
  margin-top: 50px;
  border: 1px solid grey;
  padding: 10px 20px 10px 20px;
  font-family: roboto;
`;

export default InspectorInfo;
