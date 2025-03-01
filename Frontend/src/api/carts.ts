import { IAddCart } from "@/type/cart"
import instance from "./instance"

export const addCartService = (data: IAddCart) => {
    const url = "/carts/add"
    return instance.post(url, data)
}
export const getCartService = (idUser: string) => {
    const url = `/carts/users/${idUser}`
    return instance.get(url)
}
export const updateCartService = (data: any) => {
    const url = `/carts/update`
    return instance.put(url,data)
}
export const deleteCartService = (id: number) => {
    const url = `/carts/delete/${id}`
    return instance.delete(url)
}