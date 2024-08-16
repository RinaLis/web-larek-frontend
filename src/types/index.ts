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

export type TPayment = 'online' | 'offline'

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
    products: IProduct[];

    getProduct(prodId: string): IProduct;
}

export interface IOrderList {
    products: IProduct[];
    total: number;
    events: IEvents;

    addProduct(product: IProduct): void;
    deleteProduct(prodId: string): void;
    // checkProductInOrder(id: string): boolean;
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
    getDelivery(): TDeliveryInfo;
    getContacts(): TContactInfo;
    getInfo(): IOrder;
}

export type ApiPostMethods = 'POST' | 'PUT' | 'DELETE' | 'PATCH';

export interface IApi {
    baseUrl: string;
    get<T>(uri: string): Promise<T>;
    post<T>(uri: string, data: object, method?: ApiPostMethods): Promise<T>;
}