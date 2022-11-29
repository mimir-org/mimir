import { call, put } from "redux-saga/effects";
import { saveAs } from "file-saver";
import { NodeLibCm, QuantityDatumCm, QuantityDatumType } from "@mimirorg/typelibrary-types";
import { GetApiErrorForBadRequest, GetApiErrorForException, get, del, post, HeadersInitDefault } from "../../../models/webclient";
import { PayloadAction } from "@reduxjs/toolkit";
import Config from "../../../models/Config";
import {
  deleteLibraryItemSuccessOrError,
  exportLibrarySuccessOrError,
  fetchLibrary,
  fetchLibraryAttributeTypes,
  fetchLibraryAttributeTypesSuccessOrError,
  fetchLibraryInterfaceTypesSuccessOrError,
  fetchLibrarySuccessOrError,
  fetchLibraryTerminalsSuccessOrError,
  fetchLibraryTransportTypesSuccessOrError,
  fetchQuantityDatumsSuccessOrError,
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

export function* getTransportTypes() {
  try {
    const url = `${Config.API_BASE_URL}library/transport`;
    const response = yield call(get, url);

    if (response.status === 400) {
      const apiError = GetApiErrorForBadRequest(response, fetchLibraryTransportTypesSuccessOrError.type);
      yield put(fetchLibraryTransportTypesSuccessOrError({ transportTypes: [], apiError }));
      return;
    }

    yield put(fetchLibraryTransportTypesSuccessOrError({ transportTypes: response.data, apiError: null }));
  } catch (error) {
    const apiError = GetApiErrorForException(error, fetchLibraryTransportTypesSuccessOrError.type);
    yield put(fetchLibraryTransportTypesSuccessOrError({ transportTypes: [], apiError }));
  }
}

export function* getInterfaceTypes() {
  try {
    const url = `${Config.API_BASE_URL}library/interface`;
    const response = yield call(get, url);

    if (response.status === 400) {
      const apiError = GetApiErrorForBadRequest(response, fetchLibraryInterfaceTypesSuccessOrError.type);
      yield put(fetchLibraryInterfaceTypesSuccessOrError({ interfaceTypes: [], apiError }));
      return;
    }

    yield put(fetchLibraryInterfaceTypesSuccessOrError({ interfaceTypes: response.data, apiError: null }));
  } catch (error) {
    const apiError = GetApiErrorForException(error, fetchLibraryInterfaceTypesSuccessOrError.type);
    yield put(fetchLibraryInterfaceTypesSuccessOrError({ interfaceTypes: [], apiError }));
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

export function* deleteLibraryItem(action: PayloadAction<string>) {
  try {
    const url = `${Config.API_BASE_URL}librarytype/${action.payload}`;
    const response = yield call(del, url);

    if (response.status === 400) {
      const apiError = GetApiErrorForBadRequest(response, deleteLibraryItemSuccessOrError.type);
      yield put(deleteLibraryItemSuccessOrError({ id: action.payload, apiError }));
      return;
    }
    yield put(deleteLibraryItemSuccessOrError({ id: action.payload, apiError: null }));
  } catch (error) {
    const apiError = GetApiErrorForException(error, deleteLibraryItemSuccessOrError.type);
    yield put(deleteLibraryItemSuccessOrError({ id: action.payload, apiError }));
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
