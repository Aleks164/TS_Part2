import { basicList } from "./memory/basicList";
import { CRUD, CRUDType } from "./crudOOP";

describe("CRUD", () => {
  let crudForTest: CRUDType;

  beforeEach(() => {
    crudForTest = new CRUD();
  });

  it("should Get expected Item by id", async () => {
    expect(await crudForTest.getItemById(1)).toStrictEqual(basicList[0]);
    expect(await crudForTest.getItemById(3)).toStrictEqual(basicList[2]);
  });

  it("should Get expected Items by Color", async () => {
    expect(await crudForTest.getItemByColor("red")).toStrictEqual([
      basicList[0]
    ]);
    expect(await crudForTest.getItemByColor("green")).toStrictEqual([
      basicList[1]
    ]);
  });

  it("should find expected Items by date", async () => {
    expect(await crudForTest.getItemByDate(1643699395933)).toStrictEqual(
      basicList[0]
    );
  });

  it("should find expected Items by status", async () => {
    expect(await crudForTest.getItemByStatus("sold")).toStrictEqual([
      basicList[0],
      basicList[1]
    ]);
  });

  it("should find expected Items by tags", async () => {
    expect(await crudForTest.getItemByTags(["small"])).toStrictEqual([
      basicList[1]
    ]);
    expect(await crudForTest.getItemByTags(["painted"])).toStrictEqual([
      basicList[0],
      basicList[1]
    ]);
  });

  it("should create expected Item", async () => {
    const newItem = {
      color: "grey",
      date: 1643716788101,
      status: "unsold",
      tags: ["small", "unpainted"]
    };

    const created = await crudForTest.create(newItem);
    expect(created.id).not.toBeNull();
    expect(await crudForTest.getItemByTags(["small"])).toStrictEqual([
      basicList[1],
      created
    ]);
  });

  it("should update expected Item", async () => {
    const ItemForUpdate = {
      color: "red",
      date: 1643717589148,
      status: "unsold",
      tags: ["small", "unpainted"]
    };

    const updatedItem = await crudForTest.update(1, ItemForUpdate);
    expect(updatedItem).toStrictEqual({ id: 1, ...ItemForUpdate });
  });

  it("should delete expected Item", async () => {
    await crudForTest.delete(1);
    expect(await crudForTest.getItemById(1)).toBeNull();
  });
});
