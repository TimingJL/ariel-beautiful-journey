import { database } from 'src/firebase';
import { toastShow } from 'src/components/toastShow';

export const firebaseRequest = ({
  getOnce: ({ path, onSuccess, onError }) => {
    database.ref(path).once('value', (response) => {
      if (onSuccess) onSuccess({ response: response.val() });
    }, (error) => {
      toastShow({
        type: 'error',
        message: error.message,
      });
      if (onError) onError({ error });
    });
  },
  getOn: ({ path, onSuccess, onError }) => {
    database.ref(path).on('value', (response) => {
      if (onSuccess) onSuccess({ response });
    }, (error) => {
      toastShow({
        type: 'error',
        message: error.message,
      });
      if (onError) onError({ error });
    });
  },
  set: ({
    path, data, onSuccess, onError,
  }) => {
    database.ref(path)
      .set(data)
      .then((response) => {
        if (onSuccess) onSuccess({ response });
      }, (error) => {
        toastShow({
          type: 'error',
          message: error.message,
        });
        if (onError) onError({ error });
      });
  },
  update: ({
    path, data, onSuccess, onError,
  }) => {
    database.ref(path)
      .update(data)
      .then((response) => {
        if (onSuccess) onSuccess({ response });
      }, (error) => {
        toastShow({
          type: 'error',
          message: error.message,
        });
        if (onError) onError({ error });
      });
  },
  push: {},
  remove: ({ path, onSuccess, onError }) => {
    database.ref(path).remove()
      .then((response) => {
        if (onSuccess) onSuccess({ response });
      })
      .catch((error) => {
        toastShow({
          type: 'error',
          message: error.message,
        });
        if (onError) onError({ error });
      });
  },
});
