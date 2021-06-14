import firebaseApp from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/database';

import firebaseConfig from './config';

firebaseApp.initializeApp(firebaseConfig);

export const auth = firebaseApp.auth();
export const firestore = firebaseApp.firestore();
export const database = firebaseApp.database();
