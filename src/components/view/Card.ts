import { IProduct } from "../../types";
import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";
import { IEvents } from "../base/events";

export class Card extends Component<IProduct> {
	protected events: IEvents;
	protected cardImage?: HTMLImageElement;
    protected cardCategory?: HTMLElement;
	protected cardTitle: HTMLElement;
    protected cardText?: HTMLElement;
    protected cardPrice: HTMLElement;
    protected _button: HTMLButtonElement;

	protected cardId: string;

	constructor(protected container: HTMLElement, events: IEvents) {
		super(container);
		this.events = events;

		this.cardTitle = ensureElement<HTMLElement>('.card__title', container);
        this.cardPrice = ensureElement<HTMLElement>('.card__price', container);


	}

	render(cardData: Partial<IProduct> | undefined) {
		if (!cardData) return this.container;
		return super.render(cardData);
	}

    set title(title: string) {
        this.cardTitle.textContent = title;
    }

    set price(price: string) {
        if (price) {
            this.cardPrice.textContent = `${price} синапсов`;
        }
        else {
            this.cardPrice.textContent = `Бесценно `;
        }
    }

	set id(id) {
		this.cardId = id;
	}
	get id() {
		return this.cardId;
	}
}

export class CardGallery extends Card {

    constructor(container: HTMLElement, events: IEvents) {
        super(container, events)
        this.cardImage = ensureElement<HTMLImageElement>('.card__image', this.container);
		this.cardCategory = ensureElement<HTMLElement>('.card__category', this.container);
        this._button = this.container as HTMLButtonElement;

        this._button.addEventListener('click', () =>
			this.events.emit('card-preview:open', { id: this.id })
		);
    }

    set category(category: string) {
        this.cardCategory.textContent = category;
        const categoryColor: Record<string, string> = {
            "софт-скил": "card__category_soft",
            "хард-скил": "card__category_hard",
            "другое": "card__category_other",
            "дополнительное": "card__category_additional",
            "кнопка": "card__category_button",
        }
        this.cardCategory.classList.add(categoryColor[category])
    }

    set image(image: string) {
        this.cardImage.src = image;
    }
}

export class CardModal extends Card {
    protected inOrder: boolean;

    constructor(container: HTMLElement, events: IEvents, inOrder: boolean) {
        super(container, events)
        this.cardImage = ensureElement<HTMLImageElement>('.card__image', this.container);
		this.cardCategory = ensureElement<HTMLElement>('.card__category', this.container);
        this.cardText = ensureElement<HTMLElement>('.card__text', this.container)
        this._button = ensureElement<HTMLButtonElement>('.card__button', this.container);
        this.isValid(inOrder);

        this._button.addEventListener('click', () => {
            if (this.button == 'В корзину') {
                this.events.emit('order:add', { id: this.id })
                this.isValid(true);
            } else {
			    this.events.emit('basket:open', { id: this.id })
                this.isValid(false);
            }
        });
    }

    set category(category: string) {
        this.cardCategory.textContent = category;
        const categoryColor: Record<string, string> = {
            "софт-скил": "card__category_soft",
            "хард-скил": "card__category_hard",
            "другое": "card__category_other",
            "дополнительное": "card__category_additional",
            "кнопка": "card__category_button",
        }
        this.cardCategory.classList.add(categoryColor[category])
    }

    isValid(inOrder: boolean) {
        if (inOrder) {
            this.button = 'Перейти в корзину'
        } else {
            this.button = 'В корзину'
        }
    }

    set button(text: string) {
        this._button.textContent = text
    }

    get button(): string {
        return this._button.textContent
    }
    set image(image: string) {
        this.cardImage.src = image;
    }

    set description(description: string) {
        this.cardText.textContent = description;
    }
}

export class CardBasket extends Card {
    protected cardNumber: HTMLElement

    constructor(container: HTMLElement, events: IEvents, number: number) {
        super(container, events)
        this.cardNumber = ensureElement<HTMLElement>('.basket__item-index', this.container)
        this.cardNumber.textContent = number.toString()
        this._button = ensureElement<HTMLButtonElement>('.card__button', this.container)

        this._button.addEventListener('click', () => {
            this.events.emit('order:delete', { id: this.id })
        })
    }
}