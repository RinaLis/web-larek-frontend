import { AppApi } from './components/AppApi';
import { Api } from './components/base/api';
import { EventEmitter } from './components/base/events';
import { ContactInfo } from './components/model/ContactInfo';
import { DeliveryInfo } from './components/model/DeliveryInfo';
import { OrderInfo } from './components/model/OrderInfo';
import { OrderList } from './components/model/OrderList';
import { ProductList } from './components/model/ProductList';
import { Basket } from './components/view/BasketView';
import { Card, CardBasket, CardGallery, CardModal} from './components/view/Card';
import { CardsContainer } from './components/view/CardsContainer';
import { Form, FormWithButton } from './components/view/Form';
import { Modal } from './components/view/Modal';
import './scss/styles.scss';
import { IApi, TContactInfo, TDeliveryInfo } from './types';
import { API_URL, CDN_URL, settings } from './utils/constants';
import { cloneTemplate } from './utils/utils';

const events = new EventEmitter();

const baseApi: IApi = new Api(API_URL, settings);

const api = new AppApi(baseApi, CDN_URL);

const contacts = new ContactInfo(events);
const delivery = new DeliveryInfo(events);
const basket = new OrderList(events)
const order = new OrderInfo(delivery, contacts, basket)
const products = new ProductList(events)

const modal = new Modal(document.querySelector('.modal'), events)

const cardTemplate: HTMLTemplateElement = document.querySelector('#card-catalog');
const cardsContainer = new CardsContainer(document.querySelector('.gallery'));
const cardModalTemplate: HTMLTemplateElement = document.querySelector('#card-preview');

const basketElement: HTMLTemplateElement = cloneTemplate(document.querySelector('#basket') as HTMLTemplateElement)
const basketContainer = new CardsContainer(basketElement.querySelector('.basket__list'));
const basketView = new Basket(basketElement, basketContainer, events)
const basketCardTemplate: HTMLTemplateElement = document.querySelector('#card-basket')

const headerBasket: HTMLButtonElement = document.querySelector('.header__basket')
const headerBasketCounter: HTMLElement = headerBasket.querySelector('.header__basket-counter')

const deliveryFormTemplate: HTMLTemplateElement = document.querySelector('#order');
const deliveryForm = new FormWithButton(cloneTemplate<HTMLFormElement>(deliveryFormTemplate), events);
const contactsFormTemplate: HTMLTemplateElement = document.querySelector('#contacts');
const contactsForm = new Form(cloneTemplate<HTMLFormElement>(contactsFormTemplate), events)

const successTemplate: HTMLTemplateElement = document.querySelector('#success');

headerBasket.addEventListener('click', () => {
    events.emit('basket:open')
})

api.getProduct()
	.then((initialProducts) => {
		products.products = initialProducts;
		events.emit('initialData:loaded');
	})
	.catch((err) => {
		console.error(err);
	});

events.on('initialData:loaded', () => {
    const cardsArray = products.products.map((product) => {
		const cardInstant = new CardGallery(cloneTemplate(cardTemplate), events);	
        return cardInstant.render(product);
	});

	cardsContainer.render({ catalog: cardsArray });
	events.emit('order:changed')
});

events.on('order:changed', () => {
	headerBasketCounter.textContent = basket.products.length.toString();
    const cardsArray = basket.products.map((product, number) => {
		const cardInstant = new CardBasket(cloneTemplate(basketCardTemplate), events, number+1);	
        return cardInstant.render(product);
	});
    basketView.setItems(cardsArray, basket.checkCorrectOrder(), basket.total)

});

events.on('card-preview:open', (card: {id: string}) => {
	const cardModal = new CardModal(cloneTemplate(cardModalTemplate), events, basket.productInOrder(card.id));
    modal.content = cardModal.render(products.getProduct(card.id));
    modal.open();
});

events.on('order:add', (card: {id: string}) => {
    basket.addProduct(products.getProduct(card.id));
})

events.on('order:delete', (card: {id: string}) => {
    basket.deleteProduct(card.id)
})

events.on('basket:open', () => {
    modal.content = basketView.render()
    modal.open();
})

events.on('order:open', () => {
    modal.content = deliveryForm.form
    modal.open();
})

events.on('order:input', () => {
	const status = delivery.checkValidation(deliveryForm.getInputValues())
	deliveryForm.valid = status;
})

events.on('order:submit', (info: TDeliveryInfo) => {
	deliveryForm.reset();
	delivery.setInfo(info)
	events.emit('contacts:open')
})

events.on('contacts:open', () => {
    modal.content = contactsForm.form
    modal.open();
})

events.on('contacts:input', () => {
	const status = contacts.checkValidation(contactsForm.getInputValues())
	contactsForm.valid = status;
})

events.on('contacts:submit', (info: TContactInfo) => {
	contactsForm.reset();
	contacts.setInfo(info)
	events.emit('success:open')
})

events.on('success:open', () => {
	const orderReady = order.getInfo()
	api.addOrder(orderReady)
	const success = cloneTemplate(successTemplate);
	success.querySelector('.order-success__description').textContent = `Списано ${orderReady.total} синапсов`;
	success.querySelector('.order-success__close').addEventListener('click', (evt) => {
		modal.close();
	})
	basket.cleanOrder();
	events.emit('order:changed')
	modal.content = success;
    modal.open();
})