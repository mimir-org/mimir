import { BadRequestData, HttpResponse, BadRequestDataItem } from "../../types/ApiTypes";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getBadResponseData = (response: HttpResponse<any>): BadRequestData => {
  if (response.status !== 400) return null;

  const title = response?.data?.title ?? response?.statusText ?? "";
  const data = { title, items: [] } as BadRequestData;

  for (const [key, value] of Object.entries(response.data)) {
    const item = { key, value } as BadRequestDataItem;
    data.items.push(item);
  }

  return data;
};

export default getBadResponseData;
