import moment from "moment";
import { LibraryCategory } from "../../../../../../../../../../models/project";
import { TextResources } from "../../../../../../../../../../assets/text/TextResources";
import { AspectObjectLibCm } from "@mimirorg/typelibrary-types";

const GetRecentlyCreatedCategory = (items: AspectObjectLibCm[]): LibraryCategory => {
  const lastDay = moment.utc().subtract(1, "d");

  const recentlyCreatedLibItems = items
    .filter((i) => moment.utc(i.created).isSameOrAfter(lastDay))
    .sort((a, b) => moment.utc(b.created).valueOf() - moment.utc(a.created).valueOf());

  return { name: TextResources.CATEGORY_RECENT, nodes: recentlyCreatedLibItems };
};

export default GetRecentlyCreatedCategory;
