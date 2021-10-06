import styled from "styled-components";

const DropdownMenuList = styled.div`
  display: flex;
  flex-direction: column;
  border-width: 1px;
  border-style: solid;
  border-color: ${(props: { borderColor: string }) => props.borderColor};
  border-radius: ${(props: { borderRadius: number }) => props.borderRadius};
  background-color: inherit;
  position: absolute;
  top: 25px;
  left: 0;
  z-index: 1;
  width: 100%;
  max-height: 250px;
  overflow-y: auto;
`;

export default DropdownMenuList;
