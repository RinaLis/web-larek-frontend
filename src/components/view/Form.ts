import { IEvents } from '../base/events';

export class Form {
	protected inputs: NodeListOf<HTMLInputElement>;
	protected _form: HTMLFormElement;
	protected formName: string;
	protected errorPlace: HTMLElement;
	protected submitButton: HTMLButtonElement;
	protected valuesObject: Record<string, string>;

	protected events: IEvents;

	constructor(form: HTMLFormElement, events: IEvents) {
		this.events = events;
		this._form = form;

		this.inputs = this._form.querySelectorAll<HTMLInputElement>('.form__input');
		this.formName = this._form.getAttribute('name');
		this.submitButton = this._form.querySelector('.submit__button');
		this.submitButton.disabled = true;
		this.errorPlace = this._form.querySelector('.form__errors');
		this.valuesObject = {};

		this._form.addEventListener('submit', (evt) => {
			evt.preventDefault();
			this.events.emit(`${this.formName}:submit`, this.getInputValues());
		});
		this._form.addEventListener('input', () => {
			this.events.emit(`${this.formName}:input`);
		});
	}

	getInputValues() {
		this.inputs.forEach((element) => {
			this.valuesObject[element.name] = element.value;
		});
		return this.valuesObject;
	}

	set inputValues(data: Record<string, string>) {
		this.inputs.forEach((element) => {
			element.value = data[element.name];
		});
	}

	protected showInputError(errorMessage: string) {
		this.errorPlace.textContent = errorMessage;
	}

	protected hideInputError() {
		this.errorPlace.textContent = '';
	}

	set valid(isValid: boolean) {
		this.submitButton.disabled = !isValid;
		if (isValid) {
			this.hideInputError();
		} else {
			this.showInputError('Необходимо заполнить все поля');
		}
	}

	get form() {
		return this._form;
	}

	reset() {
		this._form.reset();
	}
}

export class FormWithButton extends Form {
	protected buttons: NodeListOf<HTMLButtonElement>;

	constructor(form: HTMLFormElement, events: IEvents) {
		super(form, events);
		this.buttons =
			this._form.querySelectorAll<HTMLButtonElement>('.button_alt');

		this.buttons.forEach((button) => {
			button.addEventListener('click', (evt) => {
				const target = evt.target as HTMLButtonElement;
				const value = target.name;
				if (!target.classList.contains('button_alt-active')) {
					this.buttons.forEach((button) => {
						if (button !== target) {
							button.classList.remove('button_alt-active');
						}
					});
				}
				target.classList.toggle('button_alt-active');
				this.valuesObject['payment'] = value;
				this.events.emit(`${this.formName}:input`);
			});
		});
	}

	reset() {
		super.reset();
		this.buttons.forEach((button) => {
			button.classList.remove('button_alt-active');
		});
	}
}
