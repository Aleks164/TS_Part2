/* eslint-disable class-methods-use-this */
// Import the functions you need from the SDKs you need
import { getDatabase, ref, child, get } from "firebase/database";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { basicList } from "./memory/basicList";
import { Baloons, regularItem, regularItemWithDate } from "./memory/baloons";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBfm-TgkZObP48jeEnOJDqGoCKpsXhANhQ",
  authDomain: "educational-project-ff104.firebaseapp.com",
  projectId: "educational-project-ff104",
  storageBucket: "educational-project-ff104.appspot.com",
  messagingSenderId: "366089910680",
  appId: "1:366089910680:web:3082b11328c098aba113ed",
  measurementId: "G-LD1J328CTM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const database = getDatabase();


const dbRef = ref(getDatabase());
get(child(dbRef, `users/${userId}`)).then((snapshot) => {
  if (snapshot.exists()) {
    console.log(snapshot.val());
  } else {
    console.log("No data available");
  }
}).catch((error) => {
  console.error(error);
});



// export interface CRUDType {
//   create(newEl: regularItem): Promise<Baloons>;

//   getItemById(id: number): Promise<Baloons | null>;

//   getItemByColor(color: string): Promise<Baloons[]>;

//   getItemByDate(date: number): Promise<Baloons | null>;

//   getItemByStatus(Status: string): Promise<Baloons[]>;

//   getItemByTags(Tags: string[]): Promise<Baloons[]>;

//   update(id: number, elForUpdate: regularItem): Promise<Baloons | null>;

//   delete(id: number): Promise<void | null>;
// }

// export class CRUD implements CRUDType {

//   async create(newEl: regularItemWithDate): Promise<Baloons> {
//     const id = new Date().valueOf();
//     const nextEl = { id, ...newEl };
//     basicList.push(nextEl);
//     return nextEl;
//   }

//   async getItemById(id: number): Promise<Baloons | null> {
//     return basicList.find((listEl) => listEl.id === id) || null;
//   }

//   async getItemByColor(color: string): Promise<Baloons[]> {
//     return basicList.filter((name) => name.color === color);
//   }

//   async getItemByDate(date: number): Promise<Baloons | null> {
//     return basicList.find((listEl) => listEl.date === date) || null;
//   }

//   async getItemByStatus(Status: string): Promise<Baloons[]> {
//     return basicList.filter((listEl) => listEl.status === Status);
//   }

//   async getItemByTags(Tags: string[]): Promise<Baloons[]> {
//     return basicList.filter((listEl) =>
//       listEl.tags.some((tag) => Tags.includes(tag))
//     );
//   }

//   async update(id: number, elForUpdate: regularItemWithDate): Promise<Baloons | null> {
//     const check = await this.getItemById(id);
//     if (!check) {
//       return null;
//     }
//     await this.delete(id);

//     const updatedEl = { id, ...elForUpdate };
//     basicList.push(updatedEl);
//     return updatedEl;
//   }

//   async delete(id: number): Promise<void | null> {
//     const check = await this.getItemById(id);
//     if (!check) {
//       return null;
//     }
//     basicList.splice(basicList.indexOf(check), 1);
//     return Promise.resolve();
//   }
// }
