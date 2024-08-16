import { IProduct, IProductList } from "../../types";
import { IEvents } from "../base/events";


export class ProductList implements IProductList {
    protected _products: IProduct[];
    protected events: IEvents;

    constructor(events: IEvents) {
        this.events = events;
    }

    set products(data:IProduct[]) {
        this._products = data;
        this.events.emit('products:changed')
    }

    get products () {
        return this._products;
    }

    getProduct(prodId: string): IProduct {
        return this._products.find((item) => item.id === prodId)
    }

}