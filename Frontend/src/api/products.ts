import { ProductType } from "../type/Product";
import instance from "./instance";


export const getAll = () => {
    const url = "/product"
    return instance.get(url)
}
export const getAllProByType = (type: String) => {
    const url = `/product?filter[type]=${type}`
    return instance.get(url)
}
export const listOnePro = (id: number) => {
    const url = `/product/${id}`
    return instance.get(url);
}
export const remove = (id: number) => {
    const url = `/product/${id}`
    return instance.delete(url)
}
export const addPro = (data: ProductType) => {
    const url = "/product"
    return instance.post(url, data)
}
export const editPro = (data: ProductType) => {
    const url = `/product/`
    return instance.put(url, data);
}
