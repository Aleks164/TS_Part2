/* eslint-disable class-methods-use-this */
import { Baloons, regularItem, CRUDType } from "./memory/baloons";

export const storageName = "baloons";

export interface LocalStorageType extends CRUDType {
  loadLocalStorage(): Baloons[];
  saveLocalStorage(storageArray: Baloons[]): void;
}

export class LocalStorage implements LocalStorageType {
  curentStorage: Baloons[];

  someStorageName: string;

  constructor(someStorageName: string) {
    this.someStorageName = someStorageName;

    this.curentStorage = this.loadLocalStorage();
  }

  async create(newEl: regularItem): Promise<Baloons> {
    const date = Date.now();
    const id = this.curentStorage.length + 1;
    const nextEl = { id, date, ...newEl };

    this.curentStorage.push(nextEl);
    this.saveLocalStorage(this.curentStorage);
    return nextEl;
  }

  async getItemById(id: number): Promise<Baloons | null> {
    return this.curentStorage.find((listEl) => listEl.id === id) || null;
  }

  async getItemByColor(color: string): Promise<Baloons[]> {
    return this.curentStorage.filter((name) => name.color === color);
  }

  async getItemByDate(date: number): Promise<Baloons | null> {
    return this.curentStorage.find((listEl) => listEl.date === date) || null;
  }

  async getItemByStatus(Status: string): Promise<Baloons[]> {
    return this.curentStorage.filter((listEl) => listEl.status === Status);
  }

  async getItemByTags(Tags: string[]): Promise<Baloons[]> {
    return this.curentStorage.filter((listEl) =>
      listEl.tags.some((tag) => Tags.includes(tag))
    );
  }

  async update(id: number, elForUpdate: regularItem): Promise<Baloons | null> {
    const check = await this.getItemById(id);
    if (!check) {
      return null;
    }
    this.curentStorage = this.curentStorage.filter((task) => task.id !== id);
    const date = Date.now();
    const updatedEl = { id, date, ...elForUpdate };

    this.curentStorage.push(updatedEl);
    this.saveLocalStorage(this.curentStorage);
    return updatedEl;
  }

  async delete(id: number): Promise<void | null> {
    const check = await this.getItemById(id);
    if (!check) {
      return null;
    }
    this.curentStorage = this.curentStorage.filter((task) => task.id !== id);
    this.saveLocalStorage(this.curentStorage);
    return Promise.resolve();
  }

  loadLocalStorage(): Baloons[] {
    const jsonStorage =
      window.localStorage.getItem(this.someStorageName) || "[]";
    return JSON.parse(jsonStorage);
  }

  saveLocalStorage(storageList: Baloons[]): void {
    this.curentStorage = storageList;
    window.localStorage.setItem(
      this.someStorageName,
      JSON.stringify(storageList)
    );
  }
}
