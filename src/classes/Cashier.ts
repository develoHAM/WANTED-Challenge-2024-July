import IItems from '../interfaces/IItems';
import IPaymentMethod from '../interfaces/IPaymentMethod';
import POS from './POS';

export default class Cashier {
	#pos: POS;
	constructor(pos: POS) {
		this.#pos = pos;
	}

	get pos() {
		return this.#pos;
	}

	getTotal = (items: IItems) => {
		return Object.keys(items).reduce((acc, currItemName) => {
			return (acc += items[currItemName].price * items[currItemName].quantity);
		}, 0);
	};

	processCheckout = (items: IItems, paymentMethod: IPaymentMethod) => {
		const total = this.getTotal(items);
		return this.#pos.processPayment(items, paymentMethod);
	};
}
