import { takeLatest, put, all, call } from "redux-saga/effects";

import { storage } from "services";
import systemActions from "../actions/system";
import { api, queryBuilder } from "services";
import { get } from "lodash";

function* ChangeLanguage(action) {
	storage.set("language", action.payload);
	yield put(systemActions.ChangeLanguage.success());
}

function* DeleteFile(action) {
	const { id, cb } = action.payload;

	try {
		yield put(systemActions.DeleteFile.request());
		const { data } = yield call(api.request.delete, queryBuilder(`/filemanager/${id}`));
		yield put(systemActions.DeleteFile.success({ files: data }));
		yield call(cb.success, data);
	} catch (e) {
		yield put(systemActions.DeleteFile.failure(e));
		yield call(cb.failure, e);
	} finally {
		yield put(systemActions.DeleteFile.fulfill());
		yield call(cb.finally);
	}
}

function* UploadFile(action) {
	const { files, cb } = action.payload;

	try {
		const { data } = yield call(api.request.post, queryBuilder("/filemanager/uploads"), files);

		yield put(systemActions.UploadFile.success({ files: data }));
		yield call(cb.success, data);
	} catch (e) {
		yield put(systemActions.UploadFile.failure(e));
		yield call(cb.failure, e);
	} finally {
		yield put(systemActions.UploadFile.fulfill());
		yield call(cb.finally);
	}
}

function* GetSettings() {
	try {
		const { data } = yield call(
			api.request.get,
			queryBuilder("/settings", {
				limit: 50,
				include: "file",
				filter: { status: 1 }
			})
		);
		yield put(
			systemActions.GetSettings.success({
				data: data.data
			})
		);
	} catch (error) {
		yield put(
			systemActions.GetSettings.failure({
				error
			})
		);
	}
}

function* GetMenu() {
	try {
		const { data } = yield call(
			api.request.get,
			queryBuilder("/menus", {
				include: "menuItems"
			})
		);
		yield put(systemActions.GetMenu.success(get(data, "data", [])));
	} catch (e) {
		yield put(systemActions.GetMenu.failure(e));
	} finally {
		yield put(systemActions.GetMenu.fulfill());
	}
}

export default function* root() {
	yield all([
		takeLatest(systemActions.ChangeLanguage.TRIGGER, ChangeLanguage),
		takeLatest(systemActions.UploadFile.TRIGGER, UploadFile),
		takeLatest(systemActions.DeleteFile.TRIGGER, DeleteFile),
		takeLatest(systemActions.GetSettings.TRIGGER, GetSettings),
		takeLatest(systemActions.GetMenu.TRIGGER, GetMenu)
	]);
}
