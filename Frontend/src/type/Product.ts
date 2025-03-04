export type ProductType = {
  id?: number,
  name: string,
  type: string,
  brand: string,
  description: string,
  battery: string,
  cpu: string,
  operatingSystem: string,
  ram: string,
  screenReslution: string,
  screenSize: string,
  storage: string,
  thumbnail: string,
  image: string,
  weight: string,
  price: number,
  salePrice: number,
  quantity: number,
  status: number,
  productView: number
}
export interface Product {
  id: string;
  name: string;
  thumbnail: string;
  price: number;
  salePrice: number;
  type: string;
}
