/* eslint-disable class-methods-use-this */
import { database } from "./memory/initialFB";
import { regularItemWithDate } from "./memory/baloons";

export interface CRUDType {
  getData(colorInput: string): Promise<regularItemWithDate | string>;

  createData(
    colorInput: string,
    statusEl: string,
    tagArray: string[],
    dateInput: string
  ): Promise<string>;

  deleteData(colorInput: string): Promise<string>;

  updateData(
    colorInput: string,
    statusEl?: string,
    tagArray?: string[],
    dateInput?: string
  ): Promise<string>;
}

export class Crud implements CRUDType {
  async getData(colorInput: string): Promise<regularItemWithDate | string> {
    const dbref = database.ref(database.db);
    return database
      .get(database.child(dbref, `baloons/${colorInput}`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          return snapshot.val();
        }
        return "truble";
      })
      .catch((error) => {
        return error;
      });
  }

  async createData(
    colorInput: string,
    statusEl: string,
    tagArray: string[],
    dateInput: string
  ): Promise<string> {
    return database
      .set(database.ref(database.db, `baloons/${colorInput}`), {
        color: colorInput,
        status: statusEl,
        tags: tagArray,
        date: dateInput,
      })
      .then(() => {
        return "ok";
      })
      .catch((error) => {
        return error;
      });
  }

  async deleteData(colorInput: string): Promise<string> {
    return database
      .set(database.ref(database.db, `baloons/${colorInput}`), null)
      .then(() => {
        return "deleted";
      })
      .catch((error) => {
        return error;
      });
  }

  async updateData(
    colorInput: string,
    statusEl: string,
    tagArray: string[],
    dateInput: string
  ): Promise<string> {
    return database
      .update(database.ref(database.db, `baloons/${colorInput}`), {
        color: colorInput,
        status: statusEl,
        tags: tagArray,
        date: dateInput,
      })
      .then(() => {
        return `updated`;
      })
      .catch((error) => {
        return error;
      });
  }
}
