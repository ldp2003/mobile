import { call, put, takeEvery } from 'redux-saga/effects';
import {
  FETCH_DATA,
  FETCH_DATA_REQUEST,
  FETCH_DATA_SUCCESS,
  FETCH_DATA_FAILURE,
} from './reduxActions';

function* fetchDataSaga() {
  try {
    yield put({ type: FETCH_DATA_REQUEST });
    const response = yield call(fetch, 'https://66fcbb5cc3a184a84d17ccd1.mockapi.io/api/job');
    const data = yield response.json();
    yield put({ type: FETCH_DATA_SUCCESS, payload: data });
  } catch (error) {
    yield put({ type: FETCH_DATA_FAILURE, payload: error.message });
  }
}

export function* watchFetchData() {
  yield takeEvery(FETCH_DATA, fetchDataSaga);
}

export default function* rootSaga() {
  yield watchFetchData();
}