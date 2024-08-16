import { IContactInfo, IDeliveryInfo, IOrder, IOrderInfo, IOrderList, TContactInfo, TDeliveryInfo } from "../../types";

export class OrderInfo implements IOrderInfo {
    protected _delivery: IDeliveryInfo;
    protected _contacts: IContactInfo;
    protected _order: IOrderList;

    constructor(delivery: IDeliveryInfo, contacts: IContactInfo, order: IOrderList) {
		this._delivery = delivery;
        this._contacts = contacts;
        this._order = order;
	}

    getDelivery(): TDeliveryInfo {
        return {
            "address": this._delivery.address,
            "payment": this._delivery.payment
        }
    }

    getContacts(): TContactInfo {
        return {
            "email": this._contacts.email,
            "phone": this._contacts.phone
        }
    }

    getInfo(): IOrder {
        const items_id = this._order.products.map((item) => item.id);

        return {
            "email": this._contacts.email,
            "phone": this._contacts.phone,
            "address": this._delivery.address,
            "payment": this._delivery.payment,
            "total": this._order.total,
            "items": items_id
        }
    }
}