import styled from "styled-components";

const IconTextWrapper = styled.div`
  position: absolute;
  float: right;
  font-family: roboto;
  font-size: 18px;
  right: 2px;
  color: ${(props: { isOpen: boolean }) => (props.isOpen ? "#007079" : "#fff")};
  background-color: ${(props: { isOpen: boolean }) =>
    props.isOpen ? "#fff" : "#007079"};
  top: 1px;
  z-index: 1102;
  width: 200px;
  height: ${(props: { isOpen: boolean }) => (props.isOpen ? "42" : "32")}px;
  text-align: right;
  padding-right: 15px;
  padding-top: 11px;
`;

export default IconTextWrapper;
