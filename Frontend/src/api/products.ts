import { ProductType } from "../type/Product";
import instance from "./instance";


export const getAll = () => {
    const url = "/products"
    return instance.get(url)
}
export const getAllProByType = (type: String) => {
    const url = `/products/list-product-by-type/${type}`
    return instance.get(url)
}
export const listOnePro = (id: number) => {
    const url = `/products/detail/${id}`
    return instance.get(url);
}
export const remove = (id: number) => {
    const url = `/products/${id}`
    return instance.delete(url)
}
export const addPro = (data: ProductType) => {
    const url = "/products/add"
    return instance.post(url, data)
}
export const editPro = (data: ProductType) => {
    const url = `/products/update`
    return instance.put(url, data);
}
