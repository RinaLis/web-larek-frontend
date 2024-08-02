import { IEvents } from "../components/base/events";

export interface IProduct {
    id: string;
    description: string;
    image: string;
    title: string;
    category: string;
    price: number;
}

export type TProductCard = Pick<IProduct, 'image' | 'title' | 'price' | 'category' | 'id'>

export type TOrderItem = Pick<IProduct, 'title' | 'price' | 'id'>

type TPayment = 'online' | 'offline'

export interface IOrder {
    payment: TPayment;
    email: string;
    phone: string;
    address: string;
    total: number;
    items: string[];
}

export type TDeliveryInfo = Pick<IOrder, 'payment' | 'address'>

export type TContactInfo = Pick<IOrder, 'phone' | 'email'>

export type TUserInfo = TDeliveryInfo | TContactInfo

export interface IProductList {
    _products: IProduct[];

    setProducts(data: IProduct[]): void;
    getProduct(id: string): IProduct;
}

export interface IOrderList {
    _products: IProduct[];
    _total: number;
    events: IEvents;

    addProduct(product: IProduct): void;
    deleteProduct(product: IProduct): void;
    checkProductInOrder(id: string): boolean;
    checkCorrectOrder(): boolean;
}

export interface IContactInfo {
    email: string;
    phone: string;

    checkValidation(data: Record<keyof TContactInfo, string>): boolean;
    setInfo(data: TContactInfo): void;
}

export interface IDeliveryInfo {
    payment: TPayment;
    address: string;

    checkValidation(data: Record<keyof TDeliveryInfo, string>): boolean;
    setInfo(data: TDeliveryInfo): void;
}

export interface IOrderInfo {
    _delivery: IDeliveryInfo;
    _contacts: IContactInfo;
    _order: IOrderList;

    getInfo(): IOrder;
}