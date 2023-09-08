export interface ProjectListItem {
  id: string;
  name: string;
  creator: string;
  version: string;
  updated: Date | null;
  description: string;
  selected: boolean;
}
