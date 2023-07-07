import { createDomainId, lsReadValue } from "@mimirorg/component-library";

const CreateId = () => {
  const domain = lsReadValue<string>("domain");
  return createDomainId(domain);
};

export default CreateId;
