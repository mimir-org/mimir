import { lsReadValue } from "@mimirorg/component-library";

const GetDomain = () => {
  return lsReadValue<string>("domain");
};

export default GetDomain;
