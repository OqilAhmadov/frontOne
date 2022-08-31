import requireContext from "require-context.macro";
import { all, fork } from "redux-saga/effects";
import { importAll } from "store/utils";
import modulesSaga  from '../../modules/entity/sagas'

let sagas = importAll(requireContext(".", true, /^\.\/(?!index)\w+$/), ".js");
sagas = Object.keys(sagas).reduce((prev, curr) => [...prev, fork(sagas[curr])], []);

export default function* rootSaga() {
	yield all([...sagas, ...modulesSaga()]);
}
