import { LibItem } from "../../../../../../../../../models";
import { LibraryCategory } from "../../../../../../../../../models/project";
import moment from "moment";
import { TextResources } from "../../../../../../../../../assets/text/TextResources";

export const getRecentlyCreatedCategory = (items: LibItem[]): LibraryCategory => {
  const lastDay = moment.utc().subtract(1, "d");
  const recentlyCreatedLibItems = items
    .filter((i) => moment.utc(i.created).isSameOrAfter(lastDay))
    .sort((a, b) => moment.utc(b.created).valueOf() - moment.utc(a.created).valueOf());

  return { name: TextResources.CATEGORY_RECENT, nodes: recentlyCreatedLibItems };
};
