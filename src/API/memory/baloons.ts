export interface regularItem {
  color: string;
  status: string;
  tags: string[];
}
export interface regularItemWithDate extends regularItem {
  date: number;
}

export interface Baloons extends regularItemWithDate {
  id: number;
}

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
