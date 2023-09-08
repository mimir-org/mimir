import { client } from "store/webclient";
import { config, ModuleDescription, User } from "lib";
import { MimirorgCompanyCm } from "@mimirorg/typelibrary-types";

const _basePath = `${config.API_BASE_URL}`;

export const commonApi = {
  async getCompany(): Promise<MimirorgCompanyCm> {
    const r = await client.get<MimirorgCompanyCm>(_basePath + "common/company/current");
    return r.data;
  },
  async getCompanies(): Promise<MimirorgCompanyCm[]> {
    const r = await client.get<MimirorgCompanyCm[]>(_basePath + "common/company");
    return r.data;
  },
  async getParsers(): Promise<ModuleDescription[]> {
    const r = await client.get<ModuleDescription[]>(_basePath + "common/parser");
    return r.data;
  },
  async getUser(): Promise<User> {
    const r = await client.get<User>(_basePath + "user");
    return r.data;
  },
};
