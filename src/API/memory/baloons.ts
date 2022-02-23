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
