import { IDeliveryInfo, TDeliveryInfo, TPayment } from '../../types';
import { IEvents } from '../base/events';

export class DeliveryInfo implements IDeliveryInfo {
	protected _payment: TPayment;
	protected _address: string;
	protected events: IEvents;

	constructor(events: IEvents) {
		this.events = events;
	}

	get payment() {
		return this._payment;
	}

	get address() {
		return this._address;
	}

	checkValidation(data: Record<keyof TDeliveryInfo, string>): boolean {
		if (
			(data.payment === 'card' || data.payment === 'cash') &&
			data.address !== ''
		) {
			return true;
		}
		this.events.emit('order:validation');
		return false;
	}

	setInfo(data: TDeliveryInfo): void {
		this._address = data.address;
		this._payment = data.payment;
	}
}
