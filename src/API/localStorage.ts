import { Baloons, regularItem } from "./memory/baloons";
import { CRUDType } from "./CRUD";

export interface LocalStorageType extends CRUDType {
  loadLocalStorage(): Baloons[];
  saveLocalStorage(storageArray: Baloons[]): void;
}

export class LocalStorage implements LocalStorageType {
  async create(newEl: regularItem): Promise<Baloons> {
    const storageList = this.loadLocalStorage();
    const date = new Date().valueOf();
    const id = storageList.length + 1;
    const nextEl = { id, date, ...newEl };

    storageList.push(nextEl);
    this.saveLocalStorage(storageList);
    return nextEl;
  }

  async getItemById(id: number): Promise<Baloons | null> {
    const storageList = this.loadLocalStorage();
    return storageList.find((listEl) => listEl.id === id) || null;
  }

  async getItemByColor(color: string): Promise<Baloons[]> {
    const storageList = this.loadLocalStorage();
    return storageList.filter((name) => name.color === color);
  }

  async getItemByDate(date: number): Promise<Baloons | null> {
    const storageList = this.loadLocalStorage();
    return storageList.find((listEl) => listEl.date === date) || null;
  }

  async getItemByStatus(Status: string): Promise<Baloons[]> {
    const storageList = this.loadLocalStorage();
    return storageList.filter((listEl) => listEl.status === Status);
  }

  async getItemByTags(Tags: string[]): Promise<Baloons[]> {
    const storageList = this.loadLocalStorage();
    return storageList.filter((listEl) =>
      listEl.tags.some((tag) => Tags.includes(tag))
    );
  }

  async update(id: number, elForUpdate: regularItem): Promise<Baloons | null> {
    const check = await this.getItemById(id);
    if (!check) {
      return null;
    }
    await this.delete(id);
    const storageList = this.loadLocalStorage();
    const date = new Date().valueOf();
    const updatedEl = { id, date, ...elForUpdate };

    storageList.push(updatedEl);
    this.saveLocalStorage(storageList);
    return updatedEl;
  }

  async delete(id: number): Promise<void | null> {
    const check = await this.getItemById(id);
    if (!check) {
      return null;
    }
    const storageList = this.loadLocalStorage();
    // const newStorageArray = storageList.splice(storageList.indexOf(check), 1);
    const newStorageArray = storageList.filter((task) => task.id !== id);
    this.saveLocalStorage(newStorageArray);
    return Promise.resolve();
  }

  // eslint-disable-next-line class-methods-use-this
  loadLocalStorage(): Baloons[] {
    const jsonStorage = window.localStorage.getItem("baloons") || "[]";
    return JSON.parse(jsonStorage);
  }

  // eslint-disable-next-line class-methods-use-this
  saveLocalStorage(storageList: Baloons[]): void {
    window.localStorage.setItem("baloons", JSON.stringify(storageList));
  }
}
