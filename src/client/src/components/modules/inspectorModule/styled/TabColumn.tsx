import styled from "styled-components";

const TabColumn = styled.div`
  width: 100%;
  height: 100%;
  padding: 10px;
  font-size: 14px;
  font-size: ${(props: { fontSize: string }) =>
    props.fontSize + "px" ?? "14px"};

  min-width: 190px;
  display: inline;
  background-color: blanchedalmond;
  border: 1px solid #000;
`;

export default TabColumn;
