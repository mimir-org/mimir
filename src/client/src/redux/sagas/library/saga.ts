import { call, put } from "redux-saga/effects";
import { saveAs } from "file-saver";
import { NodeLibCm, QuantityDatumCm, QuantityDatumType } from "@mimirorg/typelibrary-types";
import { GetApiErrorForBadRequest, GetApiErrorForException, get, post, HeadersInitDefault } from "../../../models/webclient";
import { PayloadAction } from "@reduxjs/toolkit";
import Config from "../../../models/Config";
import {
  exportLibrarySuccessOrError,
  fetchLibrary,
  fetchLibraryAttributeTypesSuccessOrError,
  fetchLibrarySuccessOrError,
  fetchLibraryTerminalsSuccessOrError,
  fetchQuantityDatumsSuccessOrError,
  fetchSubProjectsSuccessOrError,
  importLibrarySuccessOrError,
} from "../../store/library/librarySlice";

export function* searchLibrary() {
  const emptyPayload = { libNodes: [] as NodeLibCm[] };

  try {
    const url = `${Config.API_BASE_URL}library/node`;
    const response = yield call(get, url);

    if (response.status === 400) {
      const apiError = GetApiErrorForBadRequest(response, fetchLibrarySuccessOrError.type);
      yield put(fetchLibrarySuccessOrError({ ...emptyPayload, apiError }));
      return;
    }

    const payload = { libNodes: response.data };

    yield put(fetchLibrarySuccessOrError({ ...payload, apiError: null }));
  } catch (error) {
    const apiError = GetApiErrorForException(error, fetchLibrarySuccessOrError.type);
    yield put(fetchLibrarySuccessOrError({ ...emptyPayload, apiError }));
  }
}

export function* exportLibrary(action: PayloadAction<string>) {
  try {
    const url = `${Config.API_BASE_URL}librarytypefile/export`;
    const response = yield call(get, url);

    if (response.status === 400) {
      const apiError = GetApiErrorForBadRequest(response, exportLibrarySuccessOrError.type);
      yield put(exportLibrarySuccessOrError(apiError));
      return;
    }

    const blob = new Blob([JSON.stringify(response.data, null, 2)], { type: "application/json" });
    saveAs(blob, action.payload + ".json");

    yield put(exportLibrarySuccessOrError(null));
  } catch (error) {
    const apiError = GetApiErrorForException(error, exportLibrarySuccessOrError.type);
    yield put(exportLibrarySuccessOrError(apiError));
  }
}

export function* importLibrary(action: PayloadAction<File>) {
  try {
    const url = `${Config.API_BASE_URL}librarytypefile/import`;

    const formData = new FormData();
    formData.append("file", action.payload);
    const { ["Content-Type"]: _, ...formPostHeaders } = HeadersInitDefault;
    const response = yield call(post, url, formData, { method: "post", body: formData, headers: { ...formPostHeaders } });

    if (response.status === 400) {
      const apiError = GetApiErrorForBadRequest(response, importLibrarySuccessOrError.type);
      yield put(importLibrarySuccessOrError(apiError));
      return;
    }

    yield put(importLibrarySuccessOrError(null));
    yield put(fetchLibrary());
  } catch (error) {
    const apiError = GetApiErrorForException(error, importLibrarySuccessOrError.type);
    yield put(importLibrarySuccessOrError(apiError));
  }
}

export function* getTerminals() {
  try {
    const url = `${Config.API_BASE_URL}library/terminal`;
    const response = yield call(get, url);

    if (response.status === 400) {
      const apiError = GetApiErrorForBadRequest(response, fetchLibraryTerminalsSuccessOrError.type);
      yield put(fetchLibraryTerminalsSuccessOrError({ terminals: [], apiError }));
      return;
    }

    yield put(fetchLibraryTerminalsSuccessOrError({ terminals: response.data, apiError: null }));
  } catch (error) {
    const apiError = GetApiErrorForException(error, fetchLibraryTerminalsSuccessOrError.type);
    yield put(fetchLibraryTerminalsSuccessOrError({ terminals: [], apiError }));
  }
}

export function* getAttributes() {
  try {
    const url = `${Config.API_BASE_URL}library/attribute`;
    const response = yield call(get, url);

    if (response.status === 400) {
      const apiError = GetApiErrorForBadRequest(response, fetchLibraryAttributeTypesSuccessOrError.type);
      yield put(fetchLibraryAttributeTypesSuccessOrError({ attributeTypes: [], apiError }));
      return;
    }

    yield put(fetchLibraryAttributeTypesSuccessOrError({ attributeTypes: response.data, apiError: null }));
  } catch (error) {
    const apiError = GetApiErrorForException(error, fetchLibraryAttributeTypesSuccessOrError.type);
    yield put(fetchLibraryAttributeTypesSuccessOrError({ attributeTypes: [], apiError }));
  }
}

export function* getQuantityDatums() {
  try {
    const url = `${Config.API_BASE_URL}library/quantity-datums`;
    const response = yield call(get, url);

    if (response.status === 400) {
      const apiError = GetApiErrorForBadRequest(response, fetchQuantityDatumsSuccessOrError.type);
      yield put(fetchQuantityDatumsSuccessOrError({ quantityDatums: [], apiError }));
      return;
    }

    const createNoneQuantityDatum = (quantityDatumType: QuantityDatumType): QuantityDatumCm => {
      const noneQuantityDatum: QuantityDatumCm = {
        name: "None",
        source: null,
        iri: null,
        description: null,
        quantityDatumType: quantityDatumType,
      };
      return noneQuantityDatum;
    };

    const datums = (response.data != null && [...response.data]) || [];
    Object.keys(QuantityDatumType).map((key) => datums.unshift(createNoneQuantityDatum(QuantityDatumType[key])));

    yield put(fetchQuantityDatumsSuccessOrError({ quantityDatums: datums, apiError: null }));
  } catch (error) {
    const apiError = GetApiErrorForException(error, fetchQuantityDatumsSuccessOrError.type);
    yield put(fetchQuantityDatumsSuccessOrError({ quantityDatums: [], apiError }));
  }
}

export function* getSubProjects() {
  try {
    const url = `${Config.API_BASE_URL}library/subProject`;
    const response = yield call(get, url);

    if (response.status === 400) {
      const apiError = GetApiErrorForBadRequest(response, fetchSubProjectsSuccessOrError.type);
      yield put(fetchSubProjectsSuccessOrError({ subProjects: [], apiError }));
      return;
    }

    const subProjects = (response.data != null && [...response.data]) || [];
    yield put(fetchSubProjectsSuccessOrError({ subProjects: subProjects, apiError: null }));
  } catch (error) {
    const apiError = GetApiErrorForException(error, fetchQuantityDatumsSuccessOrError.type);
    yield put(fetchSubProjectsSuccessOrError({ subProjects: [], apiError }));
  }
}
