import styled from "styled-components";

const TabColumn = styled.div`
  width: 100%;
  height: 100%;
  padding: 10px;
  font-size: 14px;
  font-size: ${(props: { fontSize: string }) =>
    props.fontSize + "px" ?? "14px"};
  min-width: 190px;
  display: flex;
  flex-direction: column;
`;

export default TabColumn;
