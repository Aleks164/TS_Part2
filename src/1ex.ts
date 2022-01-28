const orderStates = [
  "initial",
  "inWork",
  "buyingSupplies",
  "producing",
  "fullfilled"
] as const;

type OrderState = typeof orderStates[number];

type FIXME = Exclude<OrderState, "buyingSupplies" | "producing">[];

export const getUserOrderStates = (orderStates: OrderState[]): FIXME => {
  const filteredStates = [] as FIXME;
  orderStates.forEach((element) => {
    if (element !== "buyingSupplies" && element !== "producing") {
      filteredStates.push(element);
    }
  });
  return filteredStates;
};
