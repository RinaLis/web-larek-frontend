import { IModal } from '../../types';
import { Component } from '../base/Component';

interface ISuccess {
	price: number;
	modal: IModal;
}

export class Success extends Component<ISuccess> {
	protected container: HTMLElement;
	protected _price: HTMLElement;
	protected _button: HTMLButtonElement;

	constructor(template: HTMLElement) {
		super(template);
		this._price = this.container.querySelector('.order-success__description');
		this._button = this.container.querySelector('.order-success__close');
	}

	set price(price: number) {
		this._price.textContent = `Списано ${price} синапсов`;
	}

	set modal(modal: IModal) {
		this._button.addEventListener('click', () => {
			modal.close();
		});
	}
}
