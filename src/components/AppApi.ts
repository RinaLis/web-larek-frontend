import { IApi, IOrder, IProduct } from '../types';

interface IProductApi {
	total: number;
	items: IProduct[];
}

export class AppApi {
	private _baseApi: IApi;
	private _cdn: string;

	constructor(baseApi: IApi, cdn: string) {
		this._baseApi = baseApi;
		this._cdn = cdn;
	}

	getProduct(): Promise<IProduct[]> {
		return this._baseApi
			.get<IProductApi>(`/product/`)
			.then((data: IProductApi) =>
				data.items.map((item) => ({
					...item,
					image: this._cdn + item.image,
				}))
			);
	}

	addOrder(data: IOrder): Promise<IOrder> {
		return this._baseApi
			.post<IOrder>(`/order`, data)
			.then((order: IOrder) => order);
	}
}
