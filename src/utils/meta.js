export const LOADED = 'isLoaded';
export const LOADING = 'isLoading';
export const ERROR = 'error';

export const updateMetaLoading = (meta) => meta
  .set(LOADING, true)
  .set(LOADED, false)
  .set(ERROR, null);

export const updateMetaDone = (meta) => meta
  .set(LOADING, false)
  .set(LOADED, true)
  .set(ERROR, null);

export const updateMetaError = (meta) => meta
  .set(LOADING, false)
  .set(LOADED, false)
  .set(ERROR, true);

export default {
  [LOADING]: false,
  [LOADED]: false,
  [ERROR]: null,
};
