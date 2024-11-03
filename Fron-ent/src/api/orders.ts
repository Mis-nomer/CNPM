import instance from "./instance";

export const getAll = () => {
  const url = "/orders/list-orders-admin"
  return instance.get(url)
}

export const listOneOrder = (id: number) => {
  const url = `/orders/list-detail-admin/${id}`
  return instance.get(url);
}

export const listAllOrderByUser = (id: number) => {
  const url = `/orders/list-orders-by-user/${id}`
  return instance.get(url);
}

export const addOrders = (data: Object) => {
  const url = "/orders/add"
  return instance.post(url, data)
}

export const updateStatusOrder = (data: any) => {
  const url = `/orders/update-status`
  return instance.put(url, data);
}


