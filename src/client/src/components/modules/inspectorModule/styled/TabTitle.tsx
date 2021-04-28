import styled from "styled-components";

const TabTitle = styled.p`
  font-weight: ${(props: { active: boolean }) =>
    props.active ? "bold" : "normal"};
  display: inline;
  text-decoration: ${(props: { active: boolean }) =>
    props.active ? "underline" : "none"};
`;

export default TabTitle;
