import styled from "styled-components";

const IconTextWrapper = styled.div`
  position: absolute;
  float: right;
  font-family: roboto;
  font-size: 16px;
  font-weight: ${(props: { isOpen: boolean }) =>
    props.isOpen ? "bold" : "normal"};
  text-decoration: ${(props: { isOpen: boolean }) =>
    props.isOpen ? "underline" : "none"};
  right: 3px;
  color: ${(props: { isOpen: boolean }) => (props.isOpen ? "#007079" : "#fff")};
  background-color: ${(props: { isOpen: boolean }) =>
    props.isOpen ? "#fff" : "#007079"};
  top: 2px;
  z-index: 1103;
  width: 155px;
  height: ${(props: { isOpen: boolean }) => (props.isOpen ? "45" : "32")}px;
  text-align: right;
  padding-right: 15px;
  padding-top: 11px;
`;

export default IconTextWrapper;
