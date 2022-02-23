/* eslint-disable class-methods-use-this */
import { basicList } from "./memory/basicList";
import { Baloons, regularItem, regularItemWithDate } from "./memory/baloons";

export interface CRUDType {
  create(newEl: regularItem): Promise<Baloons>;

  getItemById(id: number): Promise<Baloons | null>;

  getItemByColor(color: string): Promise<Baloons[]>;

  getItemByDate(date: number): Promise<Baloons | null>;

  getItemByStatus(Status: string): Promise<Baloons[]>;

  getItemByTags(Tags: string[]): Promise<Baloons[]>;

  update(id: number, elForUpdate: regularItem): Promise<Baloons | null>;

  delete(id: number): Promise<void | null>;
}

export class CRUD implements CRUDType {
  async create(newEl: regularItemWithDate): Promise<Baloons> {
    const id = new Date().valueOf();
    const nextEl = { id, ...newEl };
    basicList.push(nextEl);
    return nextEl;
  }

  async getItemById(id: number): Promise<Baloons | null> {
    return basicList.find((listEl) => listEl.id === id) || null;
  }

  async getItemByColor(color: string): Promise<Baloons[]> {
    return basicList.filter((name) => name.color === color);
  }

  async getItemByDate(date: number): Promise<Baloons | null> {
    return basicList.find((listEl) => listEl.date === date) || null;
  }

  async getItemByStatus(Status: string): Promise<Baloons[]> {
    return basicList.filter((listEl) => listEl.status === Status);
  }

  async getItemByTags(Tags: string[]): Promise<Baloons[]> {
    return basicList.filter((listEl) =>
      listEl.tags.some((tag) => Tags.includes(tag))
    );
  }

  async update(id: number, elForUpdate: regularItemWithDate): Promise<Baloons | null> {
    const check = await this.getItemById(id);
    if (!check) {
      return null;
    }
    await this.delete(id);

    const updatedEl = { id, ...elForUpdate };
    basicList.push(updatedEl);
    return updatedEl;
  }

  async delete(id: number): Promise<void | null> {
    const check = await this.getItemById(id);
    if (!check) {
      return null;
    }
    basicList.splice(basicList.indexOf(check), 1);
    return Promise.resolve();
  }
}
