import { Crud, CRUDType } from "./CRUD";
import { database } from "./memory/initialFB";

type db = {
  offline: () => void;
}

describe("CRUD", () => {
  const red = {
    id: 1,
    color: "Red",
    date: 1643700032155,
    status: "sold",
    tags: ["small", "painted"],
  };
  const black = {
    id: 2,
    color: "Black",
    date: 1643700032155,
    status: "sold",
    tags: ["small", "painted"],
  };
  let testCrud: CRUDType;
  beforeEach(() => {
    testCrud = new Crud();
  });
  afterAll(() => {
    (database as unknown as db).offline();
  });
  it("should Get expected Item by color", async () => {
    expect(await testCrud.createData(red)).toBe(red); // dell
    expect(await testCrud.getData(1)).toStrictEqual(red);
  });
  it("should create expected Item by color", async () => {
    expect(await testCrud.getData(2)).toBe("object with id=2 not found");
    expect(await testCrud.createData(black)).toBe(black);
    expect(await testCrud.getData(2)).toStrictEqual(black);
  });
  it("should delete expected Item by color", async () => {
    expect(await testCrud.getData(2)).toStrictEqual(black);
    expect(await testCrud.deleteData(2)).toBe(null);
    expect(await testCrud.getData(2)).toBe("object with id=2 not found");
  });
  it("should update expected Item by color", async () => {
    const updetedRed = { ...red, status: "unsold" };
    expect(await testCrud.updateData(updetedRed)).toBe(updetedRed);
    expect(await testCrud.getData(1)).toStrictEqual(updetedRed);
    expect(await testCrud.updateData(red)).toBe(red);
    expect(await testCrud.getData(1)).toStrictEqual(red);
  });
});
