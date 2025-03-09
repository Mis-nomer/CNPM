import { IAddCart } from "@/type/cart"
import instance from "./instance"

export const addCartService = (data: IAddCart) => {
    const url = "/cart"
    return instance.post(url, data)
}
export const getCartService = (idUser: string) => {
    const url = `/cart?filter[userId]=${idUser}&include=product`
    return instance.get(url)
}
export const updateCartService = (data: any) => {
    const url = `/cart`
    return instance.put(url, data)
}
export const deleteCartService = (id: number) => {
    const url = `/cart/${id}`
    return instance.delete(url)
}