const orderStates = [
  "initial",
  "inWork",
  "buyingSupplies",
  "producing",
  "fullfilled",
] as const;

type OrderState = typeof orderStates[number];

type FIXME = Exclude<OrderState, "buyingSupplies" | "producing">;

// eslint-disable-next-line no-shadow
export const getUserOrderStates = (orderStates: OrderState[]): FIXME[] =>
  orderStates.filter(
    (state): state is FIXME =>
      state !== "buyingSupplies" && state !== "producing"
  );
