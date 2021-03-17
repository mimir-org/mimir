import styled from "styled-components";

const StyledHeader = styled.div`
  display: inline-block;
  margin-right: 0;
  margin-top: 0px;
  border: 1px solid grey;
  width: auto;
  height: 20px;
  font-family: roboto;
  text-decoration: ${(props: { active: string }) =>
    props.active ? "underline" : "none"};
  font-weight: ${(props: { active: string }) =>
    props.active ? "bold" : "none"};
  background-color: ${(props: { color: string }) => props.color};
  padding: 10px 35px 10px 35px;
  &: hover {
    cursor: pointer;
  }
`;

export default StyledHeader;
