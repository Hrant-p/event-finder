import firebase from 'firebase/app';

import 'firebase/analytics';
import 'firebase/firestore';
import 'firebase/auth';

// const app = firebase.initializeApp({
//   apiKey: process.env.FIREBASE_KEY,
//   authDomain: process.env.FIREBASE_DOMAIN,
//   databaseURL: process.env.FIREBASE_DATABASE,
//   projectId: process.env.FIREBASE_PROJECT_ID,
//   storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
//   appId: process.env.FIREBASE_APP_ID,
//   measurementId: process.env.FIREBASE_MEASUREMENT_ID,
// });

export const app = firebase.initializeApp({
  apiKey: 'AIzaSyD0FtWn8nz4mCTCZigHfP3_y1V_So6x_o8',
  authDomain: 'event-finder-89e7f.firebaseapp.com',
  databaseURL: 'https://event-finder-89e7f.firebaseio.com',
  projectId: 'event-finder-89e7f',
  storageBucket: 'event-finder-89e7f.appspot.com',
  messagingSenderId: '156418968384',
  appId: '1:156418968384:web:14864b37f9c7188fff48a5',
  measurementId: 'G-G51P8B6DEH',
});
firebase.analytics();

console.log(app);

