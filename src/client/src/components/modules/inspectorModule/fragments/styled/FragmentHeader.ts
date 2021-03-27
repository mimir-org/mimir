import styled from "styled-components";

const FragmentHeader = styled.div`
  display: inline-block;
  height: 35.4px;
  box-sizing: border-box;
  border-right: ${(props: { active: string }) =>
    props.active ? "2px solid #000" : "1px solid #000"};
  border-left: 1px solid #000;
  border-bottom: ${(props: { active: string }) =>
    props.active ? "3px solid #f2f2f2" : "0px"};
  border-top-right-radius: 8px;
  font-family: roboto;
  color: #000;
  text-decoration: ${(props: { active: string }) =>
    props.active ? "underline" : "none"};
  font-weight: ${(props: { active: string }) =>
    props.active ? "bold" : "none"};
  background-color: ${(props: { active: string }) =>
    props.active ? "#f2f2f2" : "#c4c4c4"};
  padding: ${(props: { active: string }) =>
    props.active ? "8px 20px 27px 20px;" : "8px 20px 0px 20px"};
  box-shadow: ${(props: { active: string }) =>
    props.active ? "" : "inset -2px -4px 4px rgba(0, 0, 0, 0.25)"};
  &: hover {
    cursor: pointer;
  }
`;

export default FragmentHeader;