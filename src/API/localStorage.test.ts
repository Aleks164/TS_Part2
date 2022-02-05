import { LocalStorage, LocalStorageType } from "./localStorage";
import { Baloons } from "./memory/baloons";

describe("LocalStorage", () => {
  let testLocalStorage: LocalStorageType; let storageDate: Baloons[];

  beforeEach(() => {
    testLocalStorage = new LocalStorage();
    storageDate = [
      {
        id: 1,
        color: "red",
        date: 1643699395933,
        status: "sold",
        tags: ["large", "painted"]
      },
      {
        id: 2,
        color: "green",
        date: 1643700032155,
        status: "sold",
        tags: ["small", "painted"]
      },
      {
        id: 3,
        color: "white",
        date: 1643700037219,
        status: "unsold",
        tags: ["large", "unpainted"]
      }
    ];
    testLocalStorage.saveLocalStorage(storageDate);
  });

  it("should find expected Item by id", async () => {
    expect(await testLocalStorage.getItemById(1)).toStrictEqual(storageDate[0]);
    expect(await testLocalStorage.getItemById(3)).toStrictEqual(storageDate[2]);
  });

  it("should find expected Items by Color", async () => {
    expect(await testLocalStorage.getItemByColor("red")).toStrictEqual([
      storageDate[0]
    ]);
    expect(await testLocalStorage.getItemByColor("green")).toStrictEqual([
      storageDate[1]
    ]);
  });

  it("should find expected Items by date", async () => {
    expect(await testLocalStorage.getItemByDate(1643699395933)).toStrictEqual(
      storageDate[0]
    );
  });

  it("should find expected Items by status", async () => {
    expect(await testLocalStorage.getItemByStatus("sold")).toStrictEqual([
      storageDate[0],
      storageDate[1]
    ]);
  });

  it("should find expected Items by tags", async () => {
    expect(await testLocalStorage.getItemByTags(["large"])).toStrictEqual([
      storageDate[0],
      storageDate[2]
    ]);
    expect(await testLocalStorage.getItemByTags(["painted"])).toStrictEqual([
      storageDate[0],
      storageDate[1]
    ]);
  });

  it("should create expected Item", async () => {
    const newItem = {
      color: "grey",
      status: "unsold",
      tags: ["small", "unpainted"]
    };

    const created = await testLocalStorage.create(newItem);
    expect(created.id).not.toBeNull();

    const currentStorageArray = testLocalStorage.loadLocalStorage();
    expect(currentStorageArray.length).toStrictEqual(4);

    expect(await testLocalStorage.getItemByTags(["small"])).toStrictEqual([
      storageDate[1],
      created
    ]);
  });

  it("should update expected Item", async () => {
    const itemForUpdate = {
      color: "red",
      status: "unsold",
      tags: ["small", "unpainted"]
    };
    const mockDate = new Date(2022, 2, 3, 0, 0, 0);
    jest.spyOn(global, "Date").mockImplementation(() => mockDate);
    const date = mockDate.valueOf();

    const updated = await testLocalStorage.update(1, itemForUpdate);

    expect(updated).toStrictEqual({ id: 1, date, ...itemForUpdate });

    const currentStorageArray = testLocalStorage.loadLocalStorage();
    expect(currentStorageArray[currentStorageArray.length - 1]).toStrictEqual(
      updated
    );
  });

  it("should delete expected Item", async () => {
    await testLocalStorage.delete(1);

    expect(await testLocalStorage.getItemById(1)).toBeNull();

    const currentStorageArray = testLocalStorage.loadLocalStorage();
    expect(currentStorageArray).toHaveLength(2);
  });
});
