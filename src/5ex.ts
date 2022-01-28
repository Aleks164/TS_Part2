const orderStates = [
  "initial",
  "inWork",
  "buyingSupplies",
  "producing",
  "fullfilled"
] as const;

type OrderState = typeof orderStates[number];

type FIXME = Exclude<OrderState, "buyingSupplies" | "producing">;

export const getUserOrderStates = (orderStates: OrderState[]): FIXME[] =>
  orderStates.filter(
    (state): state is FIXME =>
      state !== "buyingSupplies" && state !== "producing"
  );
