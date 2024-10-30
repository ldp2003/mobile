export const FETCH_DATA = 'FETCH_DATA';
export const FETCH_DATA_REQUEST = 'FETCH_DATA_REQUEST';
export const FETCH_DATA_SUCCESS = 'FETCH_DATA_SUCCESS';
export const FETCH_DATA_FAILURE = 'FETCH_DATA_FAILURE';
export const DELETE_JOB = 'DELETE_JOB';
export const DELETE_JOB_REQUEST = 'DELETE_JOB_REQUEST';

export const deleteJob = (id) => ({ type: DELETE_JOB, payload: id });
export const fetchData = () => ({ type: FETCH_DATA });