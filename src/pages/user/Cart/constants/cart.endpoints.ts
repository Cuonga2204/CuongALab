export enum CartEndpointsEnum {
  GET_USER_CART = "/cart/:userId",
  ADD_TO_CART = "/cart/add",
  REMOVE_FROM_CART = "/cart/remove",
  CLEAR_CART = "/cart/clear/:userId",
  PAYMENT_CART = "/payment/create",
}
