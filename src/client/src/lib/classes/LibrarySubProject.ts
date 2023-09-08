export class LibrarySubProjectVersion {
  id: string;
  name: string;
  version: string;
}

export class LibrarySubProject {
  id: string;
  name: string;
  version: string;
  description: string;
  versions: LibrarySubProjectVersion[];
}
