/* eslint-disable class-methods-use-this */
import { database } from "./memory/initialFB";
import { Baloons } from "./memory/baloons";

export interface CRUDType {
  getData(id: number): Promise<Baloons | string>;

  createData(creatingObject: Baloons): Promise<string>;

  deleteData(id: number): Promise<string>;

  updateData(updatingObject: Baloons): Promise<string>;
}

export class Crud implements CRUDType {
  async getData(id: number): Promise<Baloons | string> {
    const dbref = database.ref(database.db);
    return database
      .get(database.child(dbref, `baloons/${id}`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          return snapshot.val();
        }
        return `object with id=${id} not found`;
      })
      .catch((error) => {
        return error;
      });
  }

  async createData(creatingObject: Baloons): Promise<string> {
    return database
      .set(
        database.ref(database.db, `baloons/${creatingObject.id}`),
        creatingObject
      )
      .then(() => {
        return creatingObject;
      })
      .catch((error) => {
        return error;
      });
  }

  async deleteData(id: number): Promise<string> {
    return database
      .set(database.ref(database.db, `baloons/${id}`), null)
      .then(() => {
        return null;
      })
      .catch((error) => {
        return error;
      });
  }

  async updateData(updatingObject: Baloons): Promise<string> {
    return database
      .update(
        database.ref(database.db, `baloons/${updatingObject.id}`),
        updatingObject
      )
      .then(() => {
        return updatingObject;
      })
      .catch((error) => {
        return error;
      });
  }
}
