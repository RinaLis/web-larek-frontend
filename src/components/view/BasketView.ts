import { ensureElement } from '../../utils/utils';
import { IEvents } from '../base/events';
import { ICardsContainer } from './CardsContainer';

export interface IBasketData {
	items: HTMLElement[];
	button: boolean;
}

export class Basket {
	protected container: HTMLElement;
	protected orderList: ICardsContainer;
	protected events: IEvents;
	protected priceBasket: HTMLElement;
	protected _button: HTMLButtonElement;

	constructor(
		container: HTMLElement,
		ordercontainer: ICardsContainer,
		events: IEvents
	) {
		this.container = container;
		this.orderList = ordercontainer;
		this.events = events;
		this.priceBasket = ensureElement<HTMLElement>(
			'.basket__price',
			this.container
		);
		this._button = ensureElement<HTMLButtonElement>(
			'.basket__button',
			this.container
		);

		this._button.addEventListener('click', () => {
			this.events.emit('order:open');
		});
	}

	setItems(items: HTMLElement[], isOrderCorrect: boolean, price: number) {
		if (!isOrderCorrect) {
			this._button.setAttribute('disabled', '');
		} else {
			this._button.removeAttribute('disabled');
		}
		this.orderList.catalog = items;
		this.priceBasket.textContent = `${price} синапсов`;
	}

	render() {
		return this.container;
	}
}
