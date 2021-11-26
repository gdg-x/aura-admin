import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/storage';
import 'firebase/firestore';
import 'firebase/messaging';
import 'firebase/functions';
import firebaseConfigData from '../config/firebase-config';

const firebaseConfig = firebaseConfigData;

firebase.initializeApp(firebaseConfig);
firebase.firestore().enablePersistence({
  synchronizeTabs: !0
}).catch(() => {
  console.warn("DB offline support not available");
});
export default {
  notificationSupported: firebase.messaging.isSupported(),
  messaging: (firebase.messaging.isSupported()) ? firebase.messaging() : null,
  firestore: firebase.firestore(),
  auth: firebase.auth(),
  authw: firebase.auth,
  storage: firebase.storage(),
  functions: firebase.functions()
};