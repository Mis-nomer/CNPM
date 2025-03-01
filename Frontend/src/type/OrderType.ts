import { OrderDetailType } from "./OderDetail"

export type OrderTypeData = {
  id?: number,
  userId: String,
  orderDate: String,
  orderCode: String,
  name: String,
  phone: String,
  address: String,
  totalAmount: Number,
  orderStatus: String,
  deliveryDate: String,
  notes: String,
  orderDetails: OrderDetailType[]
}