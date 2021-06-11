import { of, from } from 'rxjs';
import firebase from 'firebase';
import firebaseConfig from 'src/config.js';

export const fetchErrorEpic = (err, ...actions) => of(err.action, ...actions);

export const request = (action) => firebaseRequest(action);

export const firebaseRequest = ({ method, path, data, options }) => {
	const firebaseApp = firebase.apps.length
		? firebase.app()
		: firebase.initializeApp(firebaseConfig);
	const database = firebaseApp.database();

	const requestStrategies = {
		'get': ({database, path, resolve, reject}) => {
			database.ref(path).once('value', e => {
				resolve(e.val());
			}, (error) => reject(error));
		},
		'push': ({database, path, data, resolve, reject}) => {
			database.ref(path).push(data).then((res) => {
				resolve(res);
			}, (error) => reject(error));
		},
		'delete': ({database, path, resolve, reject}) => {
			database.ref(path).remove(data).then((res) => {
				resolve(res);
			}, (error) => reject(error));
		},
	};

	const fetchData = new Promise((resolve, reject) => {
		if (!requestStrategies[method.toLowerCase()]) {
			return resolve(null);
		}
		return requestStrategies[method.toLowerCase()]({database, path, data, resolve, reject});
	});

	return from(fetchData.then((value) => value));
};