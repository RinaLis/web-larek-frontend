import { IModal } from '../../types';
import { ensureElement } from '../../utils/utils';
import { IEvents } from '../base/events';

export class Modal implements IModal {
	protected modal: HTMLElement;
	protected events: IEvents;
	protected _content: HTMLDivElement;

	constructor(container: HTMLElement, events: IEvents) {
		this.modal = container;
		this.events = events;
		this._content = ensureElement<HTMLDivElement>(
			'.modal__content',
			this.modal
		);
		const closeButtonElement = this.modal.querySelector('.modal__close');
		closeButtonElement.addEventListener('click', this.close.bind(this));
		this.modal.addEventListener('mousedown', (evt) => {
			if (evt.target === evt.currentTarget) {
				this.close();
			}
		});
		this.handleEscUp = this.handleEscUp.bind(this);
	}

	open() {
		this.modal.classList.add('modal_active');
		document.addEventListener('keyup', this.handleEscUp);
	}

	close() {
		this.modal.classList.remove('modal_active');
		this._content.replaceChildren('');
		document.removeEventListener('keyup', this.handleEscUp);
	}

	handleEscUp(evt: KeyboardEvent) {
		if (evt.key === 'Escape') {
			this.close();
		}
	}

	set content(item: HTMLElement) {
		this._content.replaceChildren(item);
	}
}
