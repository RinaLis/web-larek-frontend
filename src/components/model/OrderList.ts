import { IOrderList, IProduct } from '../../types';
import { IEvents } from '../base/events';

export class OrderList implements IOrderList {
	protected _products: IProduct[] = [];
	protected _total: number;
	events: IEvents;

	constructor(events: IEvents) {
		this.events = events;
	}

	get total() {
		this._total = this._products.reduce((sum, prod) => {
			if (prod.price != null) {
				return sum + prod.price;
			}
			return sum;
		}, 0);
		return this._total;
	}

	get products() {
		return this._products;
	}

	addProduct(product: IProduct): void {
		this._products = [...this._products, product];
		this.events.emit('order:changed');
	}

	deleteProduct(prodId: string): void {
		this._products = this._products.filter((prod) => prod.id !== prodId);
		this.events.emit('order:changed');
	}

	productInOrder(prodId: string): boolean {
		const product = this._products.filter((prod) => prod.id === prodId);
		return product.length !== 0;
	}

	checkCorrectOrder(): boolean {
		return this.total !== 0;
	}

	cleanOrder() {
		this._products = [];
	}
}
