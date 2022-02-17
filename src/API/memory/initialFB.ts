import { initializeApp } from "firebase/app";
import * as FBdatabase from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyAOR5jK5Bl_N1L3m367rIXRhCwrzTa6Wkg",
  authDomain: "semiotic-joy-340915.firebaseapp.com",
  databaseURL: "https://semiotic-joy-340915-default-rtdb.firebaseio.com",
  projectId: "semiotic-joy-340915",
  storageBucket: "semiotic-joy-340915.appspot.com",
  messagingSenderId: "421555283725",
  appId: "1:421555283725:web:1659dfa120303018e9f244",
};

const app = initializeApp(firebaseConfig);

export const database = {
  db: FBdatabase.getDatabase(app),
  get: FBdatabase.get,
  child: FBdatabase.child,
  ref: FBdatabase.ref,
  set: FBdatabase.set,
  remove: FBdatabase.remove,
  update: FBdatabase.update,
};
