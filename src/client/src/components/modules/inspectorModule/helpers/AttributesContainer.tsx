import {
  InnerListElement,
  ListContainer,
  ListElement,
  Wrapper,
} from "../styled";

const AttributesContainer = ({ attributes, title }) => (
  <Wrapper>
    <span>{title}</span>
    <ListContainer>
      {attributes?.map((a) => (
        <ListElement key={a.id}>
          <InnerListElement index={1}>
            <u>{a.name}</u>
          </InnerListElement>
          {a.attributes?.map((innerAttr, i) => (
            <InnerListElement index={i} key={innerAttr.id}>
              {innerAttr.key}
            </InnerListElement>
          ))}
        </ListElement>
      ))}
    </ListContainer>
  </Wrapper>
);

export default AttributesContainer;
