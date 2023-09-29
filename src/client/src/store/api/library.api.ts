import { client } from "store/webclient";
import { config, LibrarySubProject } from "lib";
import { AspectObjectLibCm, TerminalLibCm, AttributeLibCm, QuantityDatumLibCm } from "@mimirorg/typelibrary-types";

const _basePath = `${config.API_BASE_URL}library`;

export const libraryApi = {
  async getAspectObjects(): Promise<AspectObjectLibCm[]> {
    const r = await client.get<AspectObjectLibCm[]>(_basePath + "/blockObject");
    return r.data;
  },
  async getTerminals(): Promise<TerminalLibCm[]> {
    const r = await client.get<TerminalLibCm[]>(_basePath + "/connectorTerminal");
    return r.data;
  },
  async getAttributes(): Promise<AttributeLibCm[]> {
    const r = await client.get<AttributeLibCm[]>(_basePath + "/attribute");
    return r.data;
  },
  async getQuantityDatums(): Promise<QuantityDatumLibCm[]> {
    const r = await client.get<QuantityDatumLibCm[]>(_basePath + "/quantity-datums");
    return r.data;
  },
  async getSubProjects(): Promise<LibrarySubProject[]> {
    const r = await client.get<LibrarySubProject[]>(_basePath + "/subProject");
    return r.data;
  },
};
