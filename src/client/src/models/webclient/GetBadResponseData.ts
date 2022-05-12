import { BadRequestData, HttpResponse } from ".";
import { BadRequestDataItem } from "./Types";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const GetBadResponseData = (response: HttpResponse<any>): BadRequestData => {
  if (response.status !== 400) return null;

  const title = response?.data?.title ?? response?.statusText ?? "";
  const data = { title, items: [] } as BadRequestData;

  for (const [key, value] of Object.entries(response.data)) {
    const item = { key, value } as BadRequestDataItem;
    data.items.push(item);
  }

  return data;
};

export default GetBadResponseData;
