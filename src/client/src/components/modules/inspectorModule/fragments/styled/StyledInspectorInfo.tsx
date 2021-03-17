import styled from "styled-components";

const InspectorInfo = styled.div`
  background-color: ${(props: { color: string }) => props.color};
  color: ${(props: { text: string }) => (props.text ? "#fff" : "#000")};
  width: 25%;
  height: 150px;
  position: absolute;
  margin-top: 0px;
  border: 1px solid grey;
  padding: 10px 20px 10px 20px;
  font-family: roboto;
`;

export default InspectorInfo;
