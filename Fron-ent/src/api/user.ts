import instance from "./instance";
import { UserType } from '../type/user';

export const listUser = () => {
    const url = '/users'
    return instance.get(url);
}
export const listOneUser = (id: number) => {
    const url = `/users/detail/${id}`
    return instance.get(url);
}
export const deleteUser = (id: number) => {
    const url = `/users/${id}`
    return instance.delete(url)
}
export const addUser = (use: UserType) => {
    const url = '/users/add'
    return instance.post(url, use);
}
export const updateUser = (use: UserType) => {
    const url = `/users/update`
    return instance.put(url, use);
}

export const signup = (user: {}) => {
    const url = `/signup`;
    return instance.post(url, user);
}
export const signin = (user: {}) => {
    const url = `/signin`;
    return instance.post(url, user);
}