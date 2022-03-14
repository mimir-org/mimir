import { TextResources } from "../../../../../../assets/text/TextResources";
import { TemplatesText, TemplatesWrapper } from "./TemplatesComponent.styled";

export const TemplatesComponent = () => (
  <TemplatesWrapper>
    <TemplatesText>{TextResources.LIBRARY_TEMPLATES_NONE}</TemplatesText>
  </TemplatesWrapper>
);
