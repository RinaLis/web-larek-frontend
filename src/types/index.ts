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

export interface IUser {
    payment: TPayment;
    email: string;
    phone: string;
    address: string;

    checkValidationContacts(data: Record<keyof TContactInfo, string>): boolean;
    checkValidationDelivery(data: Record<keyof TDeliveryInfo, string>): boolean;
    getUserInfo(): TUserInfo;
    setDeliveryInfo(data: TDeliveryInfo): void;
    setContactInfo(data: TContactInfo): void;
}