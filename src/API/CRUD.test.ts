import { Crud, CRUDType } from "./crud";

describe("CRUD", () => {
  const red = { "color": "Red", "date": "2022-02-14", "status": "sold", "tags": ["small", "painted"] };
  const black = { "color": "Black", "date": "2022-02-14", "status": "sold", "tags": ["small", "painted"] };
  let testCrud: CRUDType;
  beforeEach(() => {
    testCrud = new Crud();
  });
  it("should Get expected Item by color", async () => {
    expect(await testCrud.getData("Red")).toStrictEqual(red);
  });
  it("should create expected Item by color", async () => {
    expect(await testCrud.getData("Black")).toStrictEqual("truble");
    expect(await testCrud.createData("Black", "sold", ["small", "painted"], "2022-02-14")).toStrictEqual("ok");
    expect(await testCrud.getData("Black")).toStrictEqual(black);
  });
  it("should delete expected Item by color", async () => {
    expect(await testCrud.getData("Black")).toStrictEqual(black);
    expect(await testCrud.deleteData("Black")).toStrictEqual("deleted");
    expect(await testCrud.getData("Black")).toStrictEqual("truble");
  });
  it("should update expected Item by color", async () => {
    const updetedRed = { ...red, status: "unsold" }
    expect(await testCrud.updateData("Red", "unsold", ["small", "painted"], "2022-02-14")).toStrictEqual("updated");
    expect(await testCrud.getData("Red")).toStrictEqual(updetedRed);
    expect(await testCrud.updateData("Red", "sold", ["small", "painted"], "2022-02-14")).toStrictEqual("updated");
    expect(await testCrud.getData("Red")).toStrictEqual(red);
  });
});
